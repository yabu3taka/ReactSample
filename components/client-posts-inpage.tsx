/**
 * ページ移動なしで追加・編集・削除する
 * 追加・編集フォームもページ移動なしで表示
 */

'use client'

import { use, useState, createContext, ReactNode } from 'react';

import { deletetPostOnServer } from '@/components/server-posts';

/**
 * フォーム情報
 * 新規作成フォーム(mode=create)と編集フォーム(mode=update)がある。
 */
type PostFormInfo = { mode: "create" } | { mode: "update", id: number };

/**
 * フォーム情報を維持するContext
 */
const PostFormInfoContext = createContext<PostFormInfo | null>(null);
const PostFormInfoDispatchContext = createContext((_val: PostFormInfo) => { });

/**
 * フォームを表示するリンク
 * @param props.target - 表示するフォームの情報
 * @param props.children - リンク名
 * @returns リンク JSX
 */
export function PostInPageFormLink({ target, children }: { target: PostFormInfo, children: ReactNode }) {
	const setupPostForm = use(PostFormInfoDispatchContext);
	return (<a onClick={() => setupPostForm(target)}>{children}</a>);
}

/**
 * データを削除するリンク
 * @param props.id - 削除するId
 * @param props.children - リンク名
 * @returns リンク JSX
 */
export function PostInPageFormDeleteLink({ id, children }: { id: number, children: ReactNode }) {
	return (<a onClick={() => deletetPostOnServer(id)}>{children}</a>);
}

/**
 * フォーム情報 ContextProvider
 * @param props.children
 * @returns JSX
 */
export function PostInPageFormProvider({ children }: { children: ReactNode }) {
	const [postForm, setupPostForm] = useState<PostFormInfo | null>(null);
	return (
		<PostFormInfoContext value={postForm}>
			<PostFormInfoDispatchContext value={setupPostForm}>
				{children}
			</PostFormInfoDispatchContext>
		</PostFormInfoContext>
	);
}


/**
 * フォーム情報を得るHook
 * @returns フォーム情報
 */
export function usePostInPageFormInfoContext() {
	const postForm = use(PostFormInfoContext);
	return postForm;
}

/**
 * フォームを表示する必要があるか無いか判断する
 * 必要なければ何も表示しない。
 * @param props.children - フォーム JSX
 * @returns JSX | null
 */
export function PostInPageFormIfDisplay({ children }: { children: ReactNode }) {
	const postForm = use(PostFormInfoContext);
	if (postForm == null) {
		return null;
	}
	return (<>{children}</>);
}
