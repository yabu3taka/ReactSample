import { PostSearchedList, PostForm } from './client';
import { PostThemeProvider, PostFormArea, PostListArea } from '@/components/posts-theme';
import { PostSearchTextProvider, PostSearchTextInput, PostSearchTextDisplay } from '@/components/posts';
import { PostInPageFormProvider, PostInPageFormLink, PostInPageFormIfDisplay } from '@/components/posts-inpage';

import { ReactNode, Suspense } from 'react';

import { fetchPostList } from '@/api/posts/interface';

import type { Metadata } from 'next'

const ThisPageTitle = 'Posts[ページ移動なし]';
export const metadata: Metadata = {
	title: ThisPageTitle
}

export default function Page() {
	const postsPromise = fetchPostList();
	return (
		<div>
			<h1>{ThisPageTitle}</h1>
			<ThisPageContext>
				<Suspense fallback="Loading...">
					<PostListArea>
						<PostSearchTextInput />
						検索文字：<PostSearchTextDisplay /><br />
						<PostSearchedList postsPromise={postsPromise} />
						<PostInPageFormLink target={{ mode: "create" }}>追加</PostInPageFormLink>
					</PostListArea>
				</Suspense>
				<PostInPageFormIfDisplay>
					<PostFormArea>
						<PostForm />
					</PostFormArea>
				</PostInPageFormIfDisplay>
			</ThisPageContext>
		</div>
	);
}

function ThisPageContext({ children }: { children: ReactNode }) {
	return (
		<PostThemeProvider list="gray" form="green">
			<PostSearchTextProvider>
				<PostInPageFormProvider>
					{children}
				</PostInPageFormProvider>
			</PostSearchTextProvider>
		</PostThemeProvider>
	);
}
