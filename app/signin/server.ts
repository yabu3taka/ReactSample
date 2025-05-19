"use server"

import { signIn } from "@/auth";

import { redirect } from "next/navigation";

/**
 * サインインを実行する。
 * @param formData - ログイン情報
 * @returns false=エラー
 */
export async function signInHandler(formData: { email: string, password: string }) {
    let url;
    try {
        url = await signIn("credentials", { ...formData, redirect: false, redirectTo: "/" })
    } catch (e) {
        return false;
    }
    redirect(url);
}
