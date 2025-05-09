
import { createPostData, updatePostData } from '@/lib/db-posts';
import { revalidatePostList, revalidatePostOne } from '@/api/posts/interface-server'

import { PostBody } from '@/lib/db-posts'

import { redirect } from "next/navigation";

export async function POST(request: Request) {
	const text = await request.text();
	const param = new URLSearchParams(text);
	const editId = param.get("id") ?? "";
	const formData: PostBody = { name: param.get("name") ?? "" };
	if (editId != "") {
		await updatePostData(formData, editId);
		revalidatePostOne();
	} else {
		await createPostData(formData);
	}
	revalidatePostList();
	redirect("/posts-link");
}
