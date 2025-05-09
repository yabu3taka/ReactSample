import { getPostData, deletePostData, updatePostData, PostBody } from '@/lib/db-posts';

/**
 * 指定Idのデータを取得
 * @param request 
 * @param params.id - 取得するId
 * @returns PostデータのJSON
 */
export async function GET(request: Request,
	{ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await getPostData(id);
	return Response.json(data ?? {});
}

/**
 * データを更新
 * @param request - 更新データ({@link PostBody})のJSONを持つ Request
 * @param params.id - 更新するId
 * @returns 結果JSON ({ result: bool })
 */
export async function POST(request: Request,
	{ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const newData = await request.json();
	const data = await getPostData(id);
	let result = false;
	if (data) {
		data.name = newData.name;
		await updatePostData(data, id);
		result = true;
	}
	return Response.json({ result });
}

/**
 * データを削除
 * @param request 
 * @param params.id - 削除するId
 * @returns 結果JSON ({ result: bool })
 */
export async function DELETE(request: Request,
	{ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	await deletePostData(id);
	return Response.json({ result: true });
}
