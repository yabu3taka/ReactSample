import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const MY_API_PATH = process.env.NEXT_PUBLIC_API_PATH + '/passwd';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email", label: "Email", placeholder: "xxx@xxx.xxx"
                },
                password: {
                    type: "password", label: "Password", placeholder: "*****"
                },
            },
            authorize: async (credentials) => {
                const { user } = await fetch(MY_API_PATH, {
                    method: 'POST',
                    body: JSON.stringify({ email: credentials.email, password: credentials.password })
                }).then((res) => res.json());

                if (!user) {
                    throw new Error("Invalid credentials.");
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
})
