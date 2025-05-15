'use client'

import { ReactNode } from 'react';

import { usePathname } from 'next/navigation'

export function PathEqual({ path, children }: { path: string, children: ReactNode }) {
    const pathname = usePathname()
    if (path == pathname) {
        return children;
    } else {
        return null;
    }
}

export function PathNotEqual({ path, children }: { path: string, children: ReactNode }) {
    const pathname = usePathname()
    if (path != pathname) {
        return children;
    } else {
        return null;
    }
}
