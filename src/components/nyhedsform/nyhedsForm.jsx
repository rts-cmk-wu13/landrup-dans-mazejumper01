"use client"

import { useActionState } from "react"
import { subscribeToNewsletter } from "@/components/nyhedsform/nyhedsAction";

const initialState = {
    values: { email: "" },
    errors: undefined,
    success: undefined
}

export default function NyhedsForm() {

    const [state, formAction, isPending] = useActionState(
        subscribeToNewsletter,
        initialState
    )

    return (
        <form action={formAction} className="flex flex-col gap-2">
            
            <input
                type="email"
                name="email"
                placeholder="Indtast din email"
                defaultValue={state.values.email}
                className="bg-white text-black p-2"
            />

            {state.errors?.email && <p>{state.errors.email}</p>}
            {state.errors?.form && <p>{state.errors.form}</p>}
            {state.success && <p className="text-green-600">{state.success}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="btn disabled:opacity-50"
            >
                {isPending ? "Tilmeldes..." : "Tilmeld"}
            </button>
        </form>
    )
}