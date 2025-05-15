
import { signOut } from "@/auth";

export async function GET(request: Request) {
    console.log("SignOut")
    await signOut({ redirect: true, redirectTo: "/" });
}
