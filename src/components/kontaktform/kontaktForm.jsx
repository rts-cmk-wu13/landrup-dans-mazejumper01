"use client"

import { useActionState } from "react"
import { sendKontaktMessage } from "./kontaktAction"

const initialState = {
  values: { name: "", email: "", message: "" },
  errors: undefined,
  success: undefined
}

export default function KontaktForm() {
  const [state, formAction, isPending] = useActionState(sendKontaktMessage, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-3 max-w-lg mx-auto p-4  rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Kontakt os</h2>

      <input
        type="text"
        name="name"
        placeholder="Navn"
        defaultValue={state.values.name}
        className="inpt"
      />
      {state.errors?.name && <p >{state.errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={state.values.email}
        className="inpt"
      />
      {state.errors?.email && <p >{state.errors.email}</p>}

      <textarea
        name="message"
        placeholder="Besked"
        defaultValue={state.values.message}
        className="text-black bg-gray-200 w-full h-28.5"
      />
      {state.errors?.message && <p >{state.errors.message}</p>}

      {state.errors?.form && <p >{state.errors.form}</p>}
      {state.success && <p>{state.success}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-white text-[#003147] px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "Sender..." : "Send besked"}
      </button>
    </form>
  )
}