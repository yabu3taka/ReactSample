import { PostSearchedList, PostForm } from './client';
import { PostThemeProvider, PostFormArea, PostListArea } from '@/components/client-theme';
import { PostSearchTextProvider, PostSearchTextInput, PostSearchTextDisplay } from '@/components/client-posts';
import { PostInPageFormProvider, PostInPageFormLink, PostInPageFormIfDisplay } from '@/components/client-posts-inpage';
import { PostOffsetInput, PostLimitInput, PostOffsetLimitProvider, PostQueryProvider } from '@/components/client-posts-query';

import { ReactNode, Suspense } from 'react';

import type { Metadata } from 'next'

const ThisPageTitle = 'Posts[UseQuery]';
export const metadata: Metadata = {
	title: ThisPageTitle
}

export default function Page() {
	return (
		<div>
			<h1>{ThisPageTitle}</h1>
			<ThisPageContext>
				<PostListArea>
					<PostSearchTextInput />
					検索文字：<PostSearchTextDisplay /><br />
					Offset：<PostOffsetInput /> Limit：<PostLimitInput /><br />
					<Suspense fallback={<>Loading...<br /></>}>
						<PostSearchedList />
					</Suspense>
					<PostInPageFormLink target={{ mode: "create" }}>追加</PostInPageFormLink>
				</PostListArea>
				<PostInPageFormIfDisplay>
					<Suspense fallback={<>Loading...</>}>
						<PostFormArea>
							<PostForm />
						</PostFormArea>
					</Suspense>
				</PostInPageFormIfDisplay>
			</ThisPageContext>
		</div >
	);
}

function ThisPageContext({ children }: { children: ReactNode }) {
	return (
		<PostThemeProvider list="gray" form="green">
			<PostSearchTextProvider>
				<PostInPageFormProvider>
					<PostQueryProvider>
						<PostOffsetLimitProvider>
							{children}
						</PostOffsetLimitProvider>
					</PostQueryProvider>
				</PostInPageFormProvider>
			</PostSearchTextProvider>
		</PostThemeProvider>
	);
}
