/**
 * ログインしないと使えない機能
 */

"use client"

import { ReactNode } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { deleteAllPostsOnServer } from './server-posts-auth';
import { useErrorMessageDispatcher } from './event-error';
import { QueryKey } from './posts-query';

/**
 * データを全て削除するリンク
 * @param props.children - リンク名
 * @returns リンク JSX
 */
export function PostPermDeleteAllLink({ children }: { children: ReactNode }) {
    const setupErrorMessage = useErrorMessageDispatcher();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => { await deleteAllPostsOnServer() },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueryKey.all })
        },
        onError: () => {
            setupErrorMessage("権限がありません");
        },
    })

    return (<a onClick={() => mutation.mutate()}>{children}</a>);
}
