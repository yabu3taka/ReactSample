/**
 * パーミッション付き処理のサーバAPI
 */

'use server'

import { auth } from "@/auth"

import { revalidatePostList } from '@/api/posts/interface-server'

import { getPostList, deletePostData } from '@/lib/db-posts';

/**
 * 全データ削除
 */
export async function deleteAllPostsOnServer() {
	const session = await auth();
	if (session?.user == null) {
		 throw new Error("No Permission");
	}

	const list = await getPostList();
	list.forEach((d) => deletePostData(d.id));
	revalidatePostList();
}
