import type { NextRequest } from 'next/server'

import { searchPostList } from '@/lib/db-posts';

/**
 * 検索結果を得る。
 * @param query.word - 検索文字
 * @param query.offset - 取得開始位置
 * @param query.limit - 取得数
 * @returns PostのリストのJSON
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const word = searchParams.get('word') ?? "";
	const offset = searchParams.get('offset') ?? "0";
	const limit = searchParams.get('limit') ?? "0";
	const ret = await searchPostList({
		word,
		offset: Number.parseInt(offset, 10),
		limit: Number.parseInt(limit, 10)
	});
	return Response.json(ret);
}
