# sequelizeの使い方

## "Please install sqlite3 package manually" で new Sequelize に失敗する場合

dialectModule に直接モジュールを設定する。

```
const config = { "storage": "data/development.db", "dialect": "sqlite" }
const configDialect = { dialectModule: require('sqlite3'), ...config };
let sequelize = new Sequelize(config.database, config.username, config.password, configDialect);
```

webpackのexternals設定でも良いかも

```next.config.ts
const nextConfig: NextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (isServer) {
      config.externals = [
        ...config.externals,
        { 'sqlite3': 'commonjs sqlite3', }
      ];
    }
    return config
  },
};
```

Next.jsのserverExternalPackages設定も使えるかも

```next.config.ts
const nextConfig: NextConfig = {
  serverExternalPackages: ['sqlite3'],
};
```

## "npx sequelize-cli db:migrate" で作成された models/index.js はそのままでは使えない

dialectModule の設定が必要な場合がある。

```
const configDialect = { dialectModule: require('sqlite3'), ...config };
```

Next.js では、__filename は使えないので、直接値を与える必要がある。
webpackにより別名のファイルにひとまとめにされるので。

```
const basename = "index.js";
fs.readdirSync("./models")
require("@/models/" + path.basename(file, path.extname(file)))
```

# Auth.js の使い方

## サーバサイド関数の例外はサーバサイドで処理する

ログイン失敗時に例外が発生する場合はサーバサイド内でcatchし通常のreturnで返す。
https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-expected-errors-from-server-components

```
"use server"
try {
    url = await signIn("credentials", { ...formData, redirect: false, redirectTo: "/" })
} catch (e) {
    return false;
}
```
## リダイレクト(redirect関数)は例外を発生させる

redirect関数を呼ぶとそこで例外を発生させてリダイレクトを実現している。そのためtry-catchでキャッチしてしてしまう。

次の様にredirect:falseにして、try-catch外でredirectする。

```
url = await signIn("credentials", { ...formData, redirect: false, redirectTo: "/" })
```

# node-gyp バイナリコンパイルに失敗するとき

ビルドに失敗してインストールできない場合は VisualStudioBuildTools に次をインストールすること
 - Spectre 軽減ライブラリ
