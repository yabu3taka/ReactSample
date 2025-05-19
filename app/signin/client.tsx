"use client"

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInHandler } from './server';

export function SignInForm() {
    // 毎回入力するのが面倒なのでデフォルトで設定。
    const defaultValues = { email: "user1@example.com", password: "passwd1" };
    const methods = useForm({ defaultValues });
    const { handleSubmit, register, formState: { errors } } = methods;

    const [error, setError] = useState("");

    const internalOnCommit: SubmitHandler<typeof defaultValues> = async (formData) => {
        const result = await signInHandler(formData);
        if (result === false) {
            setError("ログイン失敗");
        }
    }

    return (
        <form onSubmit={handleSubmit(internalOnCommit)}>
            {error}<br />
            <input type="text" placeholder="Email" defaultValue={defaultValues.email} {...register("email", { required: true })} />
            {errors.email?.type === 'required' && <span>入力必要</span>}
            <br />
            <input type="text" defaultValue={defaultValues.password} {...register("password", { required: true })} />
            {errors.password?.type === 'required' && <span>入力必要</span>}
            <br />
            <button type="submit">ログイン</button>
        </form>
    )
}
