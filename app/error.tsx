'use client'

export default function Error({ error }: { error: Error }) {
    return (
        <div>
            <h2>Error</h2>
            {error.message}
        </div>
    )
}
