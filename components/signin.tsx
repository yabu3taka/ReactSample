import Link from 'next/link'

import { auth, signOut } from "@/auth";

/**
 * サインイン/サインアウト ボタン
 * @returns JSX
 */
export async function SignInButton() {
	const session = await auth();
	if (session?.user != null) {
		return (<a onClick={signOutHandler} className="button">SignOut</a>);
	} else {
		return (<Link href="/signin" className="button">SignIn</Link>);
	}
}

/**
 * サインアウト処理
 */
async function signOutHandler() {
	"use server"
    await signOut({ redirect: true, redirectTo: "/" });
}
