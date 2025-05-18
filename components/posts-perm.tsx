/**
 * ログインしないと使えない機能
 */

"use client"

import { ReactNode } from 'react';

import { deleteAllPostsOnServer } from './server-posts-auth';
import { useErrorMessageDispatcher } from './event-error';

/**
 * データを全て削除するリンク
 * @param props.children - リンク名
 * @returns リンク JSX
 */
export function PostPermDeleteAllLink({ children }: { children: ReactNode }) {
    const setupErrorMessage = useErrorMessageDispatcher();
    return (<a onClick={async () => {
        try {
            await deleteAllPostsOnServer()
        } catch (e) {
            setupErrorMessage("権限がありません。");
        }
    }}>{children}</a>);
}
