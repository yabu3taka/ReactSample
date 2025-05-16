/**
 * Client API
 */

'use client'

import { use } from 'react';

import { usePostSearchedList, usePostTargetByEffect, createPostDefValues, PostFormProvider, PostFormNameInput, PostFormSubmitButton } from '@/components/posts';
import { PostInPageFormLink, PostInPageFormDeleteLink, usePostInPageFormInfoContext } from '@/components/posts-inpage';

import { Post } from '@/lib/db-posts-type'

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
			<PostInPageFormDeleteLink id={post.id}>削除</PostInPageFormDeleteLink>
		</li>
	);
}

/**
 * Postリストを表示
 * @returns JSX
 */
export function PostSearchedList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
	const posts = use(postsPromise);
	const foundPosts = usePostSearchedList(posts);
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
		<PostFormProvider editId={editPost?.id} defaultValues={defaultValues}>
			名前：<PostFormNameInput />
			<PostFormSubmitButton>{editPost != null ? "更新" : "作成"}</PostFormSubmitButton><br />
			{editPost != null ? "元の値：" + editPost.name : ""}
		</PostFormProvider>
	);
}

/**
 * フォーム
 * @param props.editId - 編集するId 
 * @returns JSX
 */
function PostFormForId({ editId }: { editId: number }) {
	const editPost = usePostTargetByEffect(editId);
	if (editPost == null) {
		return "Loading....";
	}
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
