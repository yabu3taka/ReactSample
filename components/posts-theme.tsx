/**
 * エリアの色設定
 */

'use client'

import { use, createContext, ReactNode } from 'react';

/**
 * エリアの色を維持するContext
 */
const ThemeContext = createContext({ list: "", form: "" });

/**
 * エリアの色の ContextProvider
 * @param props.list - 一覧の色
 * @param props.form - 入力フォームの色
 * @param props.children
 * @returns JSX
 */
export function PostThemeProvider({ list, form, children }: { list: string, form: string, children: ReactNode }) {
    return (
        <ThemeContext value={{ list: list, form: form }}>
            {children}
        </ThemeContext>
    );
}

/**
 * 一覧部分の表示エリア
 * @param props.children - 一覧 JSX
 * @returns JSX
 */
export function PostListArea({ children }: { children: ReactNode }) {
    const themeContext = use(ThemeContext);
    const styleList = { color: themeContext.list };
    return (
        <>
            <hr />
            <section style={styleList}>
                {children}
            </section>
        </>
    );
}

/**
 * フォーム部分の表示エリア
 * @param props.children - フォーム JSX
 * @returns JSX
 */
export function PostFormArea({ children }: { children: ReactNode }) {
    const themeContext = use(ThemeContext);
    const styleForm = { color: themeContext.form };
    return (
        <>
            <hr />
            <section style={styleForm}>
                {children}
            </section>
        </>
    );
}
