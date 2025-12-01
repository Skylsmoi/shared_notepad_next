'use client'

import {
  useActionState, useContext,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import {LoginContext} from "@/app/lib/loginContext";

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, setLogin } = useContext(LoginContext)

  const handleLogin = async (prevState: number | null, formData: FormData):Promise<number> => {
    const login = formData.get('login')
    const password = formData.get('password')

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })

    if (response.ok) {
      const user = await response.json()
      setLogin({
        id: user.id,
        login: user.login,
        isLoggedIn: true
      })

      return 1
    }

    return 0
  }

  const [message, formAction, isPending] = useActionState(handleLogin, null)

  useEffect(() => {
    if (message === 1) {
      const destination = searchParams.get('from') ?? '/pad'
      router.push(destination)
    }
  }, [message, router, searchParams])

  return (
    <form
      action={formAction}
      className="flex flex-col"
    >
      <label>
        Login:
        <input type='text' name='login' />
      </label>

      <label>
        Password:
        <input type='text' name='password' />
      </label>

      <button type="submit">Login</button>

      <div>
        {isPending ? "Loading..." : message}
      </div>

    </form>
  )
}
