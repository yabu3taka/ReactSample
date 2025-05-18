import type { Metadata } from "next";

import { BackButton } from "@/components/back";
import { PathNotEqual } from "@/components/path";
import { SignInButton } from "@/components/signin";
import Link from 'next/link'

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
