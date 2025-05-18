/**
 * Client API
 */

'use client'

import { createPostDefValues, PostFormNameInput, PostFormSubmitButton } from '@/components/posts';
import { PostInPageFormLink, usePostInPageFormInfoContext } from '@/components/posts-inpage';
import { usePostSearchedListByQueryWithContext, usePostTargetByQuery, PostFormProviderForQuery, PostFormDeleteLinkForQuery } from '@/components/posts-query';

import { Post } from '@/lib/db-posts-type'

import { fetchLogined } from '@/api/secret/interface';

import { useState, useEffect } from 'react';

/**
 * リストに表示
 * @param props.post - データ
 * @returns JSX
 */
function PostItem({ post }: { post: Post }) {
	return (
		<li key={post.id}>
			{post.name}
			<PostInPageFormLink target={{ mode: "update", id: post.id }}>編集</PostInPageFormLink>
			<PostFormDeleteLinkForQuery id={post.id}>削除</PostFormDeleteLinkForQuery>
		</li>
	);
}

/**
 * Postリストを表示
 * @returns JSX
 */
export function PostSearchedList() {
	const { data } = usePostSearchedListByQueryWithContext();
	const foundPosts = data as Post[];
	return (
		<ul className="posts">
			{foundPosts.map((post) => (<PostItem key={post.id} post={post} />))}
		</ul>
	);
}

/**
 * フォーム
 * @param props.editPost - 編集するデータ
 * @returns JSX
 */
function PostFormInternal({ editPost }: { editPost?: Post }) {
	const defaultValues = createPostDefValues(editPost);
	return (
		<PostFormProviderForQuery editId={editPost?.id} defaultValues={defaultValues}>
			名前：<PostFormNameInput />
			<PostFormSubmitButton>{editPost != null ? "更新" : "作成"}</PostFormSubmitButton><br />
			{editPost != null ? "元の値：" + editPost.name : ""}
		</PostFormProviderForQuery>
	);
}

/**
 * フォーム
 * @param props.editId - 編集するId 
 * @returns JSX
 */
function PostFormForId({ editId }: { editId: number }) {
	const { data } = usePostTargetByQuery(editId);
	const editPost = data as Post;
	return (<PostFormInternal editPost={editPost} />);
}

/**
 * フォーム
 * @returns JSX
 */
export function PostForm() {
	const postForm = usePostInPageFormInfoContext();
	if (postForm == null) {
		return null;
	}

	if (postForm.mode == "update") {
		const editId = postForm.id;
		return (<PostFormForId editId={editId} />);
	} else {
		return (<PostFormInternal />);
	}
}

/**
 * サーバに接続しデータを取得するHook
 * @param targetId - 取得するId
 * @returns データ | null(読込中)
 */
export function ShowLoginStatus() {
	const [logined, setLogined] = useState(false);

	useEffect(() => {
		async function startFetching() {
			setLogined(false);
			const result = await fetchLogined();
			if (!ignore) {
				setLogined(result);
			}
		}

		let ignore = false;
		startFetching();
		return () => { ignore = true; };
	}, []);

	return logined ? "Login中" : "未Login";
}
