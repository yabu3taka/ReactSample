import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * データベースを開く
 * @returns データベース
 */
export async function openDatabase() {
	return open({
		filename: 'data/test.db',
		driver: sqlite3.Database,
	});
}
