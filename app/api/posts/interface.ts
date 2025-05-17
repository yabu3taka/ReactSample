/**
 * /api/posts/ REST API を呼ぶ関数
 */

import { PostBody } from '@/lib/db-posts-type';

const MY_API_PATH = process.env.NEXT_PUBLIC_API_PATH + '/posts';

/**
 * 全データの一覧を取得
 * @returns Postの一覧
 */
export async function fetchPostList() {
	const ret = await fetch(MY_API_PATH).then((res) => res.json());
	return ret;
}

/**
 * 検索した一覧を取得
 * @param props.word - 検索文字
 * @param props.offset - 取得開始位置
 * @param props.limit - 取得数
 * @returns Postの一覧
 */
export async function fetchSearchedPostList({ word, offset, limit }: { word?: string, offset?: number, limit?: number }) {
	const wordParam = word ?? "";
	const offsetParam = offset ?? 0;
	const limitParam = limit ?? 0;
	const params = new URLSearchParams({ word: wordParam, offset: offsetParam.toString(), limit: limitParam.toString() });
	const ret = await fetch(MY_API_PATH + "/search?" + params.toString()).then((res) => res.json());
	return ret;
}

/**
 * 検索した結果の数を取得
 * @param props.word - 検索文字
 * @returns 結果数
 */
export async function fetchSearchedCount({ word }: { word?: string }) {
	const wordParam = word ?? "";
	const params = new URLSearchParams({ word: wordParam });
	const ret: { num: number } = await fetch(MY_API_PATH + "/count?" + params.toString()).then((res) => res.json());
	return ret.num;
}

/**
 * 指定Idのデータを取得
 * @param id - 指定Id
 * @returns Post
 */
export async function fetchPostData(id: string | number) {
	return await fetch(MY_API_PATH + '/' + id).then((res) => res.json());
}

/**
 * データを作成する
 * @param data - 作成するデータ
 * @returns 成功=true | 失敗=false
 */
export async function createPost(data: PostBody) {
	const ret: { result: boolean } = await fetch(MY_API_PATH, {
		method: 'POST',
		body: JSON.stringify(data)
	}).then((res) => res.json());
	return ret.result;
}

/**
 * データを更新する
 * @param id - 更新するId
 * @param data - 更新データ
 * @returns 成功=true | 失敗=false
 */
export async function updatePost(id: string | number, data: PostBody) {
	const ret: { result: boolean } = await fetch(MY_API_PATH + '/' + id, {
		method: 'POST',
		body: JSON.stringify(data)
	}).then((res) => res.json());
	return ret.result;
}

/**
 * データを削除する
 * @param id - 削除するId
 * @returns 成功=true | 失敗=false
 */
export async function deletePost(id: string | number) {
	const ret: { result: boolean } = await fetch(MY_API_PATH + '/' + id, {
		method: 'DELETE'
	}).then((res) => res.json());
	return ret.result;
}
