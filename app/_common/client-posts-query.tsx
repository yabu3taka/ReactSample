/**
 * useQueryを使って検索する。
 * limit, offsetを指定できる。
 */

'use client'

import { use, useState, useCallback, createContext, ReactNode } from 'react';
import { useQuery, useSuspenseQuery, QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { SearchTextContext, SearchTextDispatchContext, PostSearchTextProvider } from './client-posts';
import { submitPostOnServer, deletetPostOnServer } from './server-posts';

import { fetchSearchedPostList, fetchPostData, fetchSearchedCount } from '@/api/posts/interface';

import { PostBody } from '@/lib/db-posts-type'

/**
 * useQueryで使用する QueryClient
 */
const queryClient = new QueryClient();

/**
 * 取得するデータの {offset, limit} を維持するContext
 */
const OffsetLimitContext = createContext({ offset: 0, limit: 0 });
const OffsetLimitDispatchContext = createContext({ setOffset: (_v: string) => { }, setLimit: (_v: string) => { } });

/**
 * useQueryで使用する queryKey
 */
export const QueryKey = {
    /**
     * 全て
     */
    all: ['posts'] as const,

    /**
     * 一覧
     */
    list: ['posts', 'list'] as const,

    /**
     * 詳細
     */
    detail: ['posts', 'detail'] as const,

    /**
     * データ数
     */
    count: ['posts', 'count'] as const,
}

/**
 * データの取得位置の入力欄
 * @returns Input JSX
 */
export function PostOffsetInput() {
    const { offset } = use(OffsetLimitContext);
    const { setOffset } = use(OffsetLimitDispatchContext);
    const count = usePostSearchedCountByQueryWithContext();
    const max = count > 0 ? count - 1 : 10;
    return (<input type="number" max={max} min="0" value={offset} onChange={e => setOffset(e.target.value)} />);
}

/**
 * データの取得数の入力欄
 * @returns Input JSX
 */
export function PostLimitInput() {
    const { limit, offset } = use(OffsetLimitContext);
    const { setLimit } = use(OffsetLimitDispatchContext);
    let count = usePostSearchedCountByQueryWithContext();
    count -= offset
    const max = count > 0 ? count : 10
    return (<input type="number" max={max} min="0" value={limit} onChange={e => setLimit(e.target.value)} />);
}

/**
 * データの取得位置、取得数のContextProvider
 * @param props.children
 * @returns JSX
 */
export function PostOffsetLimitProvider({ children }: { children: ReactNode }) {
    const [offsetLimit, setOffsetLimit] = useState({ offset: 0, limit: 0 });
    const setOffset = useCallback((v: string) => {
        setOffsetLimit((hash) => { return { offset: Number.parseInt(v, 10), limit: hash.limit }; });
    }, []);
    const setLimit = useCallback((v: string) => {
        setOffsetLimit((hash) => { return { limit: Number.parseInt(v, 10), offset: hash.offset }; });
    }, []);

    return (
        <OffsetLimitContext value={offsetLimit}>
            <OffsetLimitDispatchContext value={{ setOffset, setLimit }}>
                {children}
            </OffsetLimitDispatchContext>
        </OffsetLimitContext>
    );
}

/**
 * useQueryのためのContextProvider
 * @param props.children
 * @returns JSX
 */
export function PostQueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

/**
 * Postを検索するHook
 * @param props.word - 検索文字
 * @param props.offset - 開始位置
 * @param props.limit - 取得数
 * @returns useSuspenseQueryの返り値（data=Postのリスト）
 */
export function usePostSearchedListByQuery({ word, offset, limit }: { word?: string, offset?: number, limit?: number }) {
    const queryParam = { word, offset, limit };
    return useSuspenseQuery({
        queryKey: [...QueryKey.list, queryParam],
        queryFn: () => fetchSearchedPostList(queryParam),
    })
}

/**
 * Contextに維持されている値に基づき、Postを検索するHook
 * {@link PostOffsetLimitProvider}、 {@link PostSearchTextProvider} が必要
 * @returns useSuspenseQueryの返り値（data=Postのリスト）
 */
export function usePostSearchedListByQueryWithContext() {
    const word = use(SearchTextContext);
    const { offset, limit } = use(OffsetLimitContext);
    return usePostSearchedListByQuery({ word, offset, limit });
}

/**
 * Postの検索結果の数を得るHook
 * @param props.word - 検索文字
 * @returns 結果数。読込中=-1
 */
export function usePostSearchedCountByQuery({ word }: { word?: string }) {
    const queryParam = { word };
    const { data, isLoading } = useQuery({
        queryKey: [...QueryKey.count, queryParam],
        queryFn: () => fetchSearchedCount(queryParam),
    });
    if (isLoading) {
        return -1;
    }
    return data as number;
}

/**
 * Contextに維持されている値に基づき、Postの検索結果の数を得るHook
 * {@link PostSearchTextProvider} が必要
 * @returns 結果数。読込中=-1
 */
export function usePostSearchedCountByQueryWithContext() {
    const word = use(SearchTextContext);
    return usePostSearchedCountByQuery({ word });
}

/**
 * 指定IdのPostデータを取得するHook
 * @param id - Id
 * @returns useSuspenseQueryの返り値（data=Post）
 */
export function usePostTargetByQuery(id: number) {
    return useSuspenseQuery({
        queryKey: [...QueryKey.detail, id],
        queryFn: () => fetchPostData(id),
    })
}

/**
 * useMutationを使ってデータを更新するフォーム
 * @param props.editId - 更新するId。nullの場合は新規作成
 * @param props.defaultValues - フォームの初期値
 * @param props.children
 * @returns フォーム JSX
 */
export function PostFormProviderForQuery({ editId = null, defaultValues, children }: { editId?: number | null, defaultValues: PostBody, children: ReactNode }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    const setSearchText = use(SearchTextDispatchContext);

    const mutation = useMutation({
        mutationFn: async (formData: PostBody) => { await submitPostOnServer(formData, editId) },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueryKey.all })
        },
    })

    const internalOnCommit: SubmitHandler<PostBody> = (formData) => {
        setSearchText('');
        mutation.mutate(formData);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(internalOnCommit)}>
                {children}
            </form>
        </FormProvider>
    );
}

/**
 * useMutationを使ってデータを削除するリンク
 * @param props.id - 削除するId
 * @param props.children - リンク名
 * @returns リンク JSX
 */
export function PostFormDeleteLinkForQuery({ id, children }: { id: number, children: ReactNode }) {
    const mutation = useMutation({
        mutationFn: async (id: number) => { await deletetPostOnServer(id) },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueryKey.all })
        },
    })
    return (<a onClick={() => mutation.mutate(id)}>{children}</a>);
}
