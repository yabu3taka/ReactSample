/**
 * エラーメッセージを保持する。
 */

'use client'

import { use, useState, useEffect, createContext, ReactNode } from 'react';

/**
 * エラーを維持するContext
 */
const ErrorMessageContext = createContext<string | null>("");
const ErrorMessageDispatchContext = createContext((_val: string | null) => { });

/**
 * エラー情報 ContextProvider
 * @param props.children
 * @returns JSX
 */
export function ErrorMessageProvider({ children }: { children: ReactNode }) {
    const [errorMessage, setupErrorMessage] = useState<string | null>(null);
    return (
        <ErrorMessageContext value={errorMessage}>
            <ErrorMessageDispatchContext value={setupErrorMessage}>
                {children}
            </ErrorMessageDispatchContext>
        </ErrorMessageContext>
    );
}

/**
 * エラーメッセージ
 * @returns JSX
 */
export function ErrorMessageShow() {
    const mess = use(ErrorMessageContext);
    return (<>{mess}</>)
}

/**
 * エラーメッセージHook
 * @returns エラーメッセージ
 */
export function useErrorMessage() {
    const mess = use(ErrorMessageContext);
    return mess;
}

/**
 * エラーメッセージを設定する関数を得るHook
 * @returns エラーメッセージを設定する関数
 */
export function useErrorMessageDispatcher() {
    const func = use(ErrorMessageDispatchContext);
    return func;
}
