import { TestContext, TestContextProvider, UseContextTagClient, ShowData } from "./client";

import { use } from 'react';

export default async function Page({ searchParams }) {
    const { mode } = await searchParams;
    return (
        <>
            <h1>エラーな使い方</h1>
            <a href="?mode=TestContext">serverでContextに値を与える</a><br />
            <a href="?mode=UseContextTag">serverでContextに値を取り出す</a><br />
            <a href="?mode=Fetch">クライアントでfetchしたものをuseで取り出す(無限ループ)</a><br />
            <hr />
            <h1>問題なしな使い方</h1>
            <a href="?mode=UseContextTagClient">clientでContextに値を取り出す</a><br />
            <hr />
            {mode == "TestContext" && <TestContext value={999}></TestContext>}
            {mode == "UseContextTag" && <TestContextProvider><UseContextTag /></TestContextProvider>}
            {mode == "UseContextTagClient" && <TestContextProvider><UseContextTagClient /></TestContextProvider>}
            {mode == "Fetch" && <><ShowData /></>}
        </>
    );
}

function UseContextTag() {
    const value = use(TestContext);
    return (<>{value}</>);
}
