"use server"

import { signIn } from "@/auth";

import { redirect } from "next/navigation";

/**
 * サインインを実行する。
 * @param formData - ログイン情報
 * @param callbackUrl - 戻り先URL
 * @returns false=エラー
 */
export async function signInHandler(formData: { email: string, password: string }, callbackUrl: string | null) {
    const url = callbackUrl == null ? "/" : callbackUrl;
    try {
        await signIn("credentials", { ...formData, redirect: false })
    } catch (e) {
        return false;
    }
    redirect(url);
}
