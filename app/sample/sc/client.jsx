'use client'

import { use, createContext } from 'react';

export const TestContext = createContext(0);

export function TestContextProvider({ children }) {
    return (<TestContext value={10}>{children}</TestContext>);
}

export function UseContextTagClient() {
    const value = use(TestContext);
    return (<>{value}</>);
}


export function fetchData() {
    const ret = fetch('http://127.0.0.1:3000/sc/api/').then((res) => res.json());
    return ret;
}

export async function fetchDataAsync() {
    const ret = await fetch('http://127.0.0.1:3000/sc/api/').then((res) => res.json());
    return ret;
}

export function ShowData() {
    const fetcher = fetchData();
    const data = use(fetcher);
    return (<>{data.now}</>)
}
