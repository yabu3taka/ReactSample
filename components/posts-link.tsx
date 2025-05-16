/**
 * FormデータをPostで送る
 */

'use client'

import { ReactNode } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { PostBody } from '@/lib/db-posts-type'

/**
 * 標準のFormと同じようにPOSTで送り、登録・更新するフォーム
 * @param props.editId - 編集するId。nullであれば新規作成
 * @param props.action - フォームの送信先URL
 * @param props.defaultValues - フォームの初期値
 * @param props.children
 * @returns フォーム JSX
 */
export function PostFormProviderLink({ editId = null, action, defaultValues, children }: { editId?: number | null, action: string, defaultValues: PostBody, children: ReactNode }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    const internalOnCommit: SubmitHandler<PostBody> = (_formData, e) => {
        e?.target.submit();
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(internalOnCommit)} action={action} method="post">
                <input type="hidden" name="id" value={editId?.toString() ?? ""} />
                {children}
            </form>
        </FormProvider>
    );
}
