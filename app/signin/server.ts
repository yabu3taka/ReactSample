"use server"

import { signIn } from "@/auth";

export async function signInHandler(formData: { email: string, password: string }) {
    console.log("SignInHandler")
    await signIn("credentials", { ...formData, redirect: true, redirectTo: "/" })
}
