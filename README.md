# Next.JS サンプルプログラム

APPルーティングで作成しています。

## CRUDプログラム(Posts)

次の様なサンプルがあります。

1. posts-link: 編集や削除などを画面移動で行う。
2. posts-inpage：編集や削除を画面移動無で行う。
3. posts-server：検索やページングをサーバに問い合わせる。
4. posts-api: 編集や削除をREST-APIで行う。

/app/_common 内に共通モジュールを作成しています。

1. client-posts.tsx: 一覧や編集フォームのモジュール
2. client-posts.inpage.tsx: ページ移動なしのPosts入力フォーム表示のモジュール
3. client-posts-link.tsx: ページ移動ありのPosts入力フォーム表示のモジュール
4. client-posts-query.tsx: useQueryを使用した一覧表示のモジュール
   検索にヒットしたデータのみサーバから送るようになっている。
5. client-posts-api.tsx: REST APIを使ってPostsを編集・削除するモジュール
6. server-posts.ts: Postsの編集・削除のためのサーバAPI(use server)

/api/posts/ に REST APIがあります。
interface.ts や interface-server.ts はREST APIにアクセスするためのライブラリです。

lib/にPostsのDB保存機能があります。

## その他

/app/sample/ は雑多なサンプルです。

## メモ

作成中に引っかかった部分の[メモ](MEMO.txt)
