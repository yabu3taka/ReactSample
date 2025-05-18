import type { Metadata } from "next";

import { SignInForm } from './client';

export const metadata: Metadata = {
	title: 'ログイン',
	description: 'ログイン',
}

export default function SignInFormPage() {
    return (<SignInForm />);
}
