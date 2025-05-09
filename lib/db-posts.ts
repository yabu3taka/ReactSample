/**
 * Postモデル
 */

import { openDatabase } from '@/lib/db';

/**
 * Postモデル(Idなし)
 */
export interface PostBody {
	/**
	 * 名前
	 */
	name: string;
}

/**
 * Postモデル(Id付き)
 * @extends PostBody
 */
export interface Post extends PostBody {
	/**
	 * Id
	 */
	id: number;
}

/**
 * 全データのリストを得る
 * @returns Postのリスト
 */
export async function getPostList() {
	const db = await openDatabase();
	const list = await db.all('SELECT * FROM post');
	return (list ?? []) as Post[];
}

/**
 * 検索する。
 * @param props.word - 検索文字
 * @param props.offset - 取得開始位置
 * @param props.limit - 取得数
 * @returns Postのリスト
 */
export async function searchPostList({ word, offset, limit }: { word?: string, offset?: number, limit?: number }) {
	const db = await openDatabase();
	let sql = "";
	const params = [] as (string | number)[];

	if (word) {
		sql += ' where name like ?';
		params.push('%' + word + '%');
	}

	sql += ' limit ?';
	if (limit) {
		params.push(limit);
	} else {
		params.push(-1);
	}

	if (offset) {
		sql += ' offset ?';
		params.push(offset);
	}

	const list = await db.all('SELECT * FROM post ' + sql, ...params);
	return (list ?? []) as Post[];
}

/**
 * 検索した結果のデータ数を得る
 * @param props.word - 検索文字
 * @returns データ数 
 */
export async function countPost({ word }: { word?: string }) {
	const db = await openDatabase();
	let sql = "";
	const params = [] as (string | number)[];

	if (word) {
		sql += ' where name like ?';
		params.push('%' + word + '%');
	}

	const { num } = (await db.get('SELECT count(*) as num FROM post ' + sql, ...params)) as { num: number };
	return num;
}

/**
 * データを得る
 * @param id - 取得するId
 * @returns データ
 */
export async function getPostData(id: number | string) {
	const db = await openDatabase();
	const data = await db.get<Post>('SELECT * FROM post where id = ?', id);
	return data;
}

/**
 * データを作成する。
 * @param data - 作成するデータ
 */
export async function createPostData(data: PostBody) {
	const db = await openDatabase();
	await db.run('INSERT INTO post (name) values(?)', data.name);
}

/**
 * データを更新する。
 * @param data - 更新データ
 * @param id - Id
 */
export async function updatePostData(data: PostBody, id: number | string) {
	const db = await openDatabase();
	await db.run('UPDATE post SET name = ? WHERE id = ?', data.name, id);
}

/**
 * データを削除する。
 * @param id - 削除するId
 */
export async function deletePostData(id: number | string) {
	const db = await openDatabase();
	await db.run('DELETE FROM post where id = ?', id);
}
