import { getPostList, createPostData } from '@/lib/db-posts';

/**
 * 全てのデータを得る。
 * @returns PostのリストのJSON
 */
export async function GET() {
	const ret = await getPostList();
	return Response.json(ret);
}

/**
 * データを登録
 * @param request - 登録データ({@link PostBody})のJSONを持つ Request
 * @returns 結果JSON ({ result: bool })
 */
export async function POST(request: Request) {
	const newData = await request.json();
	const data = { name: newData.name };
	await createPostData(data);
	return Response.json({ result: true });
}
