'use client'

import { useSearchParams } from "next/navigation"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const StateHandler = () => {
    const state = useSearchParams().get("state")
    if (state === 'login') return <LoginForm />
    if (state === 'register') return <RegisterForm />
    return <LoginForm />

}

export default StateHandler