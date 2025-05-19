"use client"

import { useRouter } from 'next/navigation';

/**
 * 戻るボタン
 * @returns JSX
 */
export function BackButton() {
    const router = useRouter();
    return (
        <button onClick={() => { router.back(); }}>戻る</button>
    );
}
