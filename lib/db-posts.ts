/**
 * Postモデル
 */
'use server'

import { Post, PostBody } from "@/lib/db-posts-type";

import db from '@/models/index';
const PostModel = db["Post"];

import { Op } from "sequelize";


/**
 * 全データのリストを得る
 * @returns Postのリスト
 */
export async function getPostList() {
	const list = await PostModel.findAll();
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
	const where = {};
	const param = {};

	if (word) {
		where["name"] = {[Op.like]: '%' + word + '%'};
		param["where"] = where;
	}
	if (limit) {
		param["limit"] = limit;
	}
	if (offset) {
		param["offset"] = offset;
	}

	const list = await PostModel.findAll(param);
	return (list ?? []) as Post[];
}

/**
 * 検索した結果のデータ数を得る
 * @param props.word - 検索文字
 * @returns データ数 
 */
export async function countPost({ word }: { word?: string }) {
	const where = {};
	const param = {};

	if (word) {
		where["name"] = {[Op.like]: '%' + word + '%'};
		param["where"] = where;
	}

	const num = await PostModel.count(param);
	return num;
}

/**
 * データを得る
 * @param id - 取得するId
 * @returns データ
 */
export async function getPostData(id: number | string) {
	const data = await PostModel.findOne({ where: { id } });
	return data;
}

/**
 * データを作成する。
 * @param data - 作成するデータ
 */
export async function createPostData(data: PostBody) {
	await PostModel.create(data);
}

/**
 * データを更新する。
 * @param data - 更新データ
 * @param id - Id
 */
export async function updatePostData(data: PostBody, id: number | string) {
	const m = await PostModel.findOne({ where: { id } });
	m.name = data.name;
	await m.save();
}

/**
 * データを削除する。
 * @param id - 削除するId
 */
export async function deletePostData(id: number | string) {
	const m = await PostModel.findOne({ where: { id } });
	if (m != null) {
		await m.destroy();
	}
}
