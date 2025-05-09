/**
 * Rest API を使って更新する。
 */

'use client'

import { use, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { SearchTextDispatchContext } from './client-posts';
import { QueryKey } from './client-posts-query';

import { createPost, updatePost, deletePost } from '@/api/posts/interface';

import { PostBody } from '@/lib/db-posts'

/**
 * REST API を使って登録・更新するフォーム
 * @param props.editId - 編集するId。nullであれば新規作成
 * @param props.defaultValues - フォームの初期値
 * @param props.children
 * @returns フォーム JSX
 */
export function PostFormProviderForQueryByAPI({ editId = null, defaultValues, children }: { editId?: number | null, defaultValues: PostBody, children: ReactNode }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    const setSearchText = use(SearchTextDispatchContext);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (formData: PostBody) => {
            if (editId != null) {
                await updatePost(editId, formData);
            } else {
                await createPost(formData);
            }
        },
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
 * REST API を使って削除するリンク
 * @param props.id - 削除するId
 * @param props.children - リンク名
 * @returns リンク JSX
 */
export function PostFormDeleteLinkForQuery({ id, children }: { id: number, children: ReactNode }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: number) => { await deletePost(id) },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueryKey.all })
        },
    })
    return (<a onClick={() => mutation.mutate(id)}>{children}</a>);
}
