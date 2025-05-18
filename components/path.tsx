/**
 * URLのパスと比較して表示・非表示を制御する。
 */

'use client'

import { ReactNode } from 'react';

import { usePathname } from 'next/navigation'

/**
 * パスが同じとき表示
 * @param props.path - パス
 * @returns JSX
 */
export function PathEqual({ path, children }: { path: string, children: ReactNode }) {
    const pathname = usePathname()
    if (path == pathname) {
        return children;
    } else {
        return null;
    }
}

/**
 * パスが同じでないとき表示
 * @param props.path - パス
 * @returns JSX
 */
export function PathNotEqual({ path, children }: { path: string, children: ReactNode }) {
    const pathname = usePathname()
    if (path != pathname) {
        return children;
    } else {
        return null;
    }
}
