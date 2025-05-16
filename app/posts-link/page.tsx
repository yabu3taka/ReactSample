import { PostSearchedList, PostFormCreateLink, PostForm } from './client';
import { PostThemeProvider, PostListArea, PostFormArea } from '@/components/posts-theme';
import { PostSearchTextProvider, PostSearchTextInput, PostSearchTextDisplay } from '@/components/posts';

import { fetchPostList } from '@/api/posts/interface';

import type { Metadata } from 'next'

const ThisPageTitle = 'Posts[ページ切替]';
export const metadata: Metadata = {
	title: ThisPageTitle
}

export default async function Page({ searchParams }: { searchParams: Promise<{ mode: string }> }) {
	const { mode } = await searchParams;
	const posts = await fetchPostList();

	return (
		<div>
			<h1>{ThisPageTitle}</h1>
			<PostSearchTextProvider>
				<PostThemeProvider list="gray" form="green">
					<PostListArea>
						<PostSearchTextInput />
						検索文字：<PostSearchTextDisplay /><br />
						<PostSearchedList posts={posts} />
						<PostFormCreateLink />
					</PostListArea>
					{mode == "create" && <PostFormArea><PostForm /></PostFormArea>}
				</PostThemeProvider>
			</PostSearchTextProvider>
		</div>
	);
}
