/**
 * Postの一覧やフォーム
 */

'use client'

import { use, useState, useMemo, createContext, useEffect, ReactNode } from 'react';
import { useFormStatus } from "react-dom";
import { useForm, FormProvider, useFormContext, SubmitHandler } from 'react-hook-form';

import { Post, PostBody } from '@/lib/db-posts-type'
import { submitPostOnServer } from './server-posts';

import { fetchPostData } from '@/api/posts/interface';

/**
 * 検索文字を維持するContext
 */
export const SearchTextContext = createContext("");
export const SearchTextDispatchContext = createContext((_text: string) => { });

/**
 * Post一覧から検索文字で検索した結果を得るHook
 * 検索文字はContextから得る。
 * @param posts - Post一覧
 * @returns 検索結果
 */
export function usePostSearchedList(posts: Post[]) {
    const searchText = use(SearchTextContext);
    const foundPosts = useMemo(() => {
        if (searchText.length > 0) {
            return posts.filter(item => item.name.indexOf(searchText) >= 0);
        } else {
            return posts;
        }
    }, [posts, searchText]);
    return foundPosts;
}

/**
 * 検索文字の入力欄
 * @returns Input JSX
 */
export function PostSearchTextInput() {
    const searchText = use(SearchTextContext);
    const setSearchText = use(SearchTextDispatchContext);
    return (<input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />);
}

/**
 * 検索文字
 * @returns JSX
 */
export function PostSearchTextDisplay() {
    const searchText = use(SearchTextContext);
    return (<>{searchText}</>);
}

/**
 * 検索文字 ContextProvider
 * @param props.children
 * @returns JSX
 */
export function PostSearchTextProvider({ children }: { children: ReactNode }) {
    const [searchText, setSearchText] = useState('');
    return (
        <SearchTextContext value={searchText}>
            <SearchTextDispatchContext value={setSearchText}>
                {children}
            </SearchTextDispatchContext>
        </SearchTextContext>
    );
}

/**
 * Submitボタン
 * @param props.children - ボタン名
 * @returns ボタン JSX
 */
export function PostFormSubmitButton({ children }: { children: ReactNode }) {
    const { pending } = useFormStatus();
    return (<button type="submit" disabled={pending}>{children}{pending ? "中" : ""}</button>);
}

/**
 * Postの名前の入力欄
 * @returns Input JSX
 */
export function PostFormNameInput() {
    const { register, formState: { errors, defaultValues } } = useFormContext();
    const { name: defName } = defaultValues as { name: string };
    return (
        <>
            <input type="text" defaultValue={defName} {...register("name", { required: true, maxLength: 100, minLength: 5 })} />
            {errors.name?.type === 'required' && <span>入力必要</span>}
            {errors.name?.type === 'maxLength' && <span>100文字以内</span>}
            {errors.name?.type === 'minLength' && <span>5文字以上</span>}
        </>
    );
}

/**
 * フォームの初期値を作成する
 * @param editPost - 編集データ
 * @returns フォームの初期値
 */
export function createPostDefValues(editPost: Post | undefined | null): PostBody {
    const defName = editPost?.name ?? "テスト";
    const defaultValues = { name: defName };
    return defaultValues;
}

/**
 * ServerAPIを使って登録・更新するフォーム
 * @param props.editId - 編集するId。nullであれば新規作成
 * @param props.defaultValues - フォームの初期値
 * @param props.children
 * @returns フォーム JSX
 */
export function PostFormProvider({ editId = null, defaultValues, children }: { editId?: number | null, defaultValues: PostBody, children: ReactNode }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    const setSearchText = use(SearchTextDispatchContext);

    const internalOnCommit: SubmitHandler<PostBody> = async (formData) => {
        setSearchText('');
        await submitPostOnServer(formData, editId);
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
 * サーバに接続しデータを取得するHook
 * @param targetId - 取得するId
 * @returns データ | null(読込中)
 */
export function usePostTargetByEffect(targetId: number) {
    const [targetPost, setEditPost] = useState<Post | null>(null);

    useEffect(() => {
        async function startFetching(id: number) {
            setEditPost(null);
            const result = await fetchPostData(id);
            if (!ignore) {
                setEditPost(result);
            }
        }

        let ignore = false;
        startFetching(targetId);
        return () => { ignore = true; };
    }, [targetId]);

    return targetPost;
}
