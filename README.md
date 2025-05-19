# Next.JS サンプルプログラム

APPルーティングで作成しています。

## CRUDプログラム(Posts)

サンプルページ (/app内)

1. posts-link: 編集や削除などを画面移動で行う。
2. posts-inpage：編集や削除を画面移動無で行う。
3. posts-server：検索やページングをサーバに問い合わせる。
4. posts-api: 編集や削除をREST-APIで行う。

共通コンポーネント (/components内)

1. posts.tsx: 一覧や編集フォームのモジュール
2. posts.inpage.tsx: ページ移動なしのPosts入力フォーム表示のモジュール
3. posts-link.tsx: ページ移動ありのPosts入力フォーム表示のモジュール
4. posts-query.tsx: useQueryを使用した一覧表示のモジュール
   検索にヒットしたデータのみサーバから送るようになっている。
5. posts-api.tsx: REST APIを使ってPostsを編集・削除するモジュール
6. server-posts.ts: Postsの編集・削除のためのサーバAPI(use server)

REST API (/app/api/posts/ 内)
interface.ts や interface-server.ts はREST APIにアクセスするためのライブラリです。

DBアクセス機能など (/lib 内)

Sequelizeのフォルダ
 - /models/ : モデル
 - /seeders/ : 初期データ
 - /migrations/ : マイグレーション

## その他

/app/sample/ に雑多なサンプル

## メモ

作成中に引っかかった部分の[メモ](MEMO.md)
