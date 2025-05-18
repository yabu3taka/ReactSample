/**
 * /api/secret/ REST API を呼ぶ関数
 */

const MY_API_PATH = process.env.NEXT_PUBLIC_API_PATH + '/secret';

/**
 * ログイン中か確認
 * @returns ログイン中=true
 */
export async function fetchLogined() {
	const ret = await fetch(MY_API_PATH).then((res) => res.json());
	return ret.logined;
}
