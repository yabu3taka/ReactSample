import type { Metadata } from "next";

import { BackButton } from "@/components/back";
import { PathNotEqual } from "@/components/path";
import Link from 'next/link'

import { auth } from "@/auth";

import "./globals.css";

export const metadata: Metadata = {
	title: 'サンプル',
	description: 'サンプル',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				{children}
				<hr />
				<Link href="/" className="button">Top</Link>
				<BackButton />
				<PathNotEqual path="/signin">
					<SignInButton />
				</PathNotEqual>
			</body>
		</html>
	);
}

export async function SignInButton() {
	const session = await auth();
	if (session?.user) {
		return (<Link href="/signout" className="button">SignOut</Link>);
	} else {
		return (<Link href="/signin" className="button">SignIn</Link>);
	}
}
