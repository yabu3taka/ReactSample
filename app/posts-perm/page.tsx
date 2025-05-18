import { PostSearchedList, PostForm, ShowLoginStatus } from './client';
import { PostThemeProvider, PostFormArea, PostListArea } from '@/components/posts-theme';
import { PostSearchTextProvider, PostSearchTextInput, PostSearchTextDisplay } from '@/components/posts';
import { PostInPageFormProvider, PostInPageFormLink, PostInPageFormIfDisplay } from '@/components/posts-inpage';
import { PostOffsetInput, PostLimitInput, PostOffsetLimitProvider, PostQueryProvider } from '@/components/posts-query';

import { ErrorMessageProvider, ErrorMessageShow } from '@/components/event-error';
import { PostPermDeleteAllLink } from '@/components/posts-perm';

import { fetchLogined } from '@/api/secret/interface';

import { auth } from "@/auth";

import { ReactNode, Suspense } from 'react';

import type { Metadata } from 'next'

const ThisPageTitle = 'Posts[Permission]';
export const metadata: Metadata = {
	title: ThisPageTitle
}

export default async function Page() {
	const session = await auth();
	const loginedSession = session?.user != null;

	const loginedFetch = await fetchLogined();

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
				<hr />
				セッション：{loginedSession ? "Login中" : "未Login"}<br />
				サーバ内Fetch：{loginedFetch ? "Login中" : "未Login"}<br />
				クライアント内Fetch：<ShowLoginStatus /><br />
				<ErrorMessageProvider>
					<PostPermDeleteAllLink>全て削除</PostPermDeleteAllLink>
					<ErrorMessageShow />
				</ErrorMessageProvider>
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
