"use client"

import { useRouter } from 'next/navigation';

export function BackButton() {
    const router = useRouter();
    return (
        <button onClick={() => { router.back(); }}>戻る</button>
    );
}
