/**
 * Postモデル(Idなし)
 */
export interface PostBody {
	/**
	 * 名前
	 */
	name: string;
}

/**
 * Postモデル(Id付き)
 * @extends PostBody
 */
export interface Post extends PostBody {
	/**
	 * Id
	 */
	id: number;
}
