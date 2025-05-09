import { PostSearchedList, PostFormCreateLink, PostForm } from '../../client';
import { PostThemeProvider, PostListArea, PostFormArea } from '@/app/_common/client-theme';
import { PostSearchTextProvider, PostSearchTextInput, PostSearchTextDisplay } from '@/app/_common/client-posts';

import { fetchPostList, fetchPostData } from '@/api/posts/interface';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	return {
		title: 'Posts[ページ切替] 編集:' + id
	};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const posts = await fetchPostList();
	const editPost = await fetchPostData(id);
	return (
		<div>
			<h1>Posts[ページ切替] 編集:{id}</h1>
			<PostSearchTextProvider>
				<PostThemeProvider list="gray" form="green">
					<PostListArea>
						<PostSearchTextInput />
						検索文字：<PostSearchTextDisplay /> <br />
						<PostSearchedList posts={posts} />
						<PostFormCreateLink />
					</PostListArea>
					<PostFormArea>
						<PostForm editPost={editPost} />
					</PostFormArea>
				</PostThemeProvider>
			</PostSearchTextProvider>
		</div>
	);
}
