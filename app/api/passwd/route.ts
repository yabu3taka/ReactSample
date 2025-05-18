import db from '@/models/index';
const UserModel = db["User"];

/**
 * ログインチェック
 * @param request - ログイン情報JSONを持つ Request
 * @returns 結果JSON { user: User }
 */
export async function POST(request: Request) {
    const inputData = await request.json();
    const data = await UserModel.findOne({ where: { email: inputData.email, password: inputData.password } });
    if (data != null) {
        data.password = "";  // masking
    }
    return Response.json({ user: data });
}
