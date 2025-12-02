'use client'

import {
  useActionState, useContext,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import {LoginContext} from "@/app/lib/loginContext";
import {InputText} from "@/app/lib/Input/InputText";
import {Button} from "@/app/lib/Button/Button";

interface loginResponseInterface {
  success: boolean;
  message: string;
}

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, setLogin } = useContext(LoginContext)

  const handleLogin = async (prevState: loginResponseInterface | null, formData: FormData):Promise<loginResponseInterface> => {
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

    const responseJson = await response.json()
    console.log('responseJson', responseJson)

    if (response.ok) {
      setLogin({
        id: responseJson.id,
        login: responseJson.login,
        isLoggedIn: true
      })

      return { success: true, message: 'success', }
    }

    if (response.status === 500) {
      return { success: false, message: 'Une erreur est survenue', }
    }

    switch (responseJson.code) {
      case 2001: return { success: false, message: 'Identifiant invalide' }
      default: return { success: false, message: 'Erreur inconnue', }
    }
  }

  const [response, formAction, isPending] = useActionState(handleLogin, null)

  useEffect(() => {
    if (response?.success === true) {
      const destination = searchParams.get('from') ?? '/pad'
      router.push(destination)
    }
  }, [response, router, searchParams])

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-1/4 m-auto"
    >
      <InputText
        name='login'
        label='Login'
        customClassLabel='flex flex-row justify-between items-center'
      />

      <InputText
        name='password'
        label='Password'
        customClassLabel='flex flex-row justify-between items-center'
      />

      <Button title='Login' type='submit'>Login</Button>

      <div>
        {isPending ? "Loading..." : ''}
      </div>
      <div>
        {response?.success === false && response?.message}
      </div>
    </form>
  )
}
