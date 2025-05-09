import { deletePost } from '@/api/posts/interface';

import { redirect } from "next/navigation";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	await deletePost(id);
	redirect("/posts-link");
}
