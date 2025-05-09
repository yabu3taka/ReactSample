/**
 * Postを更新するサーバAPI
 */

'use server'

import { revalidatePostList, revalidatePostOne } from '@/api/posts/interface-server'

import { createPostData, updatePostData, deletePostData } from '@/lib/db-posts';

import { PostBody } from '@/lib/db-posts'

/**
 * データを作成・更新する。
 * @param data - データ
 * @param editId - 更新するId。新規作成の場合はnull
 */
export async function submitPostOnServer(data: PostBody, editId: number | null) {
	if (editId != null) {
		await updatePostData(data, editId);
		revalidatePostOne();
	} else {
		await createPostData(data);
	}
	revalidatePostList();
}

/**
 * データを削除する。
 * @param id - 削除するId
 */
export async function deletetPostOnServer(id: number) {
	await deletePostData(id);
	revalidatePostList();
}
