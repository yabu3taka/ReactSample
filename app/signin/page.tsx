"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { signInHandler } from './server';

export function SignInForm() {
    // 毎回入力するのが面倒なのでデフォルトで設定。
    const defaultValues = { email: "user1@example.com", password: "passwd1" };
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    const internalOnCommit: SubmitHandler<typeof defaultValues> = async (formData) => {
        await signInHandler(formData);
    }

    return (
        <form onSubmit={handleSubmit(internalOnCommit)}>
            <input type="text" name="email" placeholder="Email" defaultValue={defaultValues.email} />
            <input type="text" name="password" defaultValue={defaultValues.password} />
            <button type="submit">Signin</button>
        </form>
    )
}

export default function Home() {
  return (<SignInForm />);
}
