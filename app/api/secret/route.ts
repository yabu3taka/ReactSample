import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * ログインしたかを確認する
 * @returns 結果JSON { logined: boolean }
 */
export const GET = auth(function (request) {
    if (!request.auth) {
        return NextResponse.json({ logined: false });
    }
    return Response.json({ logined: true });
})
