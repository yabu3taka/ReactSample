/**
 * Client API
 */

'use client'

import Link from 'next/link'

import { usePostSearchedList, createPostDefValues, PostFormNameInput, PostFormSubmitButton } from '@/components/posts';
import { PostFormProviderLink } from '@/components/posts-link';

import { Post } from '@/lib/db-posts-type'

/**
 * 追加フォームを表示するリンク
 * @returns JSX
 */
export function PostFormCreateLink() {
	return (<Link href={"/posts-link?mode=create"}>追加</Link>);
}

/**
 * リストに表示
 * @param props.post - データ
 * @returns JSX
 */
function PostItem({ post }: { post: Post }) {
	return (
		<li key={post.id}>
			{post.name}
			<Link href={"/posts-link/" + post.id + "/edit"}>編集</Link>
			<Link href={"/posts-link/" + post.id + "/delete"}>削除</Link>
		</li>
	);
}

/**
 * Postリストを表示
 * @returns JSX
 */
export function PostSearchedList({ posts }: { posts: Post[] }) {
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
export function PostForm({ editPost }: { editPost?: Post }) {
	const defaultValues = createPostDefValues(editPost);
	return (
		<PostFormProviderLink editId={editPost?.id} action="/posts-link/submit" defaultValues={defaultValues}>
			名前：<PostFormNameInput />
			<PostFormSubmitButton>{editPost != null ? "更新" : "作成"}</PostFormSubmitButton><br />
			{editPost != null ? "元の値：" + editPost.name : ""}
		</PostFormProviderLink>
	);
}
