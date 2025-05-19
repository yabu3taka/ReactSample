"use server"

import { signIn } from "@/auth";

import { redirect } from "next/navigation";

/**
 * サインインを実行する。
 * @param formData - ログイン情報
 * @returns false=エラー
 */
export async function signInHandler(formData: { email: string, password: string }, callbackUrl: string) {
    const url = callbackUrl == null ? "/" : callbackUrl;
    try {
        await signIn("credentials", { ...formData, redirect: false })
    } catch (e) {
        return false;
    }
    console.log(url);
    redirect(url);
}
