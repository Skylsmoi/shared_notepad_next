'use client';

import {createContext, ReactNode, useState} from "react"

export interface loginInterface {
  login: string;
  id: number;
  isLoggedIn: boolean;
}

interface loginContextInterface {
  login: loginInterface;
  setLogin: (login: loginInterface) => void;
}

export const defaultLogin:loginInterface = {
  login: '',
  id: 0,
  isLoggedIn: false
}

const defaultLoginContext = {
  login: defaultLogin,
  setLogin: () => {}
}

export const LoginContext = createContext<loginContextInterface>(defaultLoginContext)

// context providers cannot be use in server components, so create a provider component
export function LoginProvider(props:{children: ReactNode}) {
  'use client'

  const [login, setLogin] = useState<loginInterface>(defaultLogin)

  return (
    <LoginContext.Provider value={{ login: login, setLogin: setLogin }} >
      {props.children}
    </LoginContext.Provider>
  )
}
