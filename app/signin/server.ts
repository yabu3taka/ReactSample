"use server"

import { signIn } from "@/auth";

export async function signInHandler(formData: { email: string, password: string }) {
    await signIn("credentials", { ...formData, redirect: true, redirectTo: "/" })
}
