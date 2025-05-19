/**
 * ログインしないと使えない機能
 */

"use client"

import { ReactNode } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { deleteAllPostsOnServer } from './server-posts-perm';
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
        mutationFn: async () => {
            const result = await deleteAllPostsOnServer();
            if (!result) {
                setupErrorMessage("権限がありません");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueryKey.all })
        },
    })

    return (<a onClick={() => mutation.mutate()}>{children}</a>);
}
