import Link from 'next/link'

import { auth, signOut } from "@/auth";

export async function SignInButton() {
	const session = await auth();
	console.log(session);
	console.log(session?.user);
	if (session?.user) {
		return (<a onClick={signOutHandler} className="button">SignOut</a>);
	} else {
		return (<Link href="/signin" className="button">SignIn</Link>);
	}
}

async function signOutHandler() {
	"use server"
    await signOut({ redirect: true, redirectTo: "/" });
}
