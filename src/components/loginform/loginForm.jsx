"use client"
import { useActionState } from "react"
import { loginUser } from "./action"

const initialState = {
    values: {
        username: "",
        password: ""
    },
    errors: undefined
}

export default function LoginForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState)
    console.log(state)
    return ( 
        <form action={formAction} noValidate>
            <div>
                <label htmlFor="username">username:</label>
                <input type="username" name="username" defaultValue={state.values.username} />
                {state.errors?.username && <p>{state.errors.username}</p> }
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" defaultValue={state.values.password} />
                { state.errors?.password && <p>{state.errors.password}</p> }
            </div>
            { state.errors?.form && <p>{state.errors.form}</p>}
            <button type="submit" disabled={isPending} className="bg-green-400 disabled:bg-gray-400">{ isPending ? "Logger ind..." : "Log ind"}</button>
        </form>
    )
}
