import type { NextRequest } from 'next/server'

import { countPost } from '@/lib/db-posts';

/**
 * 検索結果の数を得る。
 * @param query.word - 検索文字
 * @returns データ数JSON ({ num: number })
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const word = searchParams.get('word') ?? "";
	const num = await countPost({ word });
	return Response.json({ num });
}
