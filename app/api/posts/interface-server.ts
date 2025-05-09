/**
 * server側のみで呼ばれる関数
 */

import { revalidatePath } from 'next/cache'

/**
 * キャッシュを消す。
 */
export function revalidatePostList() {
	revalidatePath('/api/posts');
}

/**
 * 詳細画面用キャッシュを消す。
 */
export function revalidatePostOne() {
	revalidatePath('/api/posts/[id]', 'page');
}
