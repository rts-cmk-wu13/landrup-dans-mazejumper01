"use server"
import { z } from "zod"
import { redirect } from "next/navigation"

const registerSchema = z.object({
    firstname: z.string().min(1, "Fornavn er påkrævet."),
    lastname: z.string().min(1, "Efternavn er påkrævet."),
    username: z.string().min(3, "Brugernavn skal være mindst 3 karakterer."),
    age: z.number().min(1, "Alder skal være en positiv værdi."),
    password: z.string().min(4, "Adgangskode skal være mindst 4 karakterer."),
    confirmPassword: z.string().min(4, "Gentag adgangskode skal udfyldes.")
}).refine(data => data.password === data.confirmPassword, {
    message: "Adgangskoderne matcher ikke.",
    path: ["confirmPassword"]
})

export async function registerUser(prevState, formData) {
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const username = formData.get("username")
    const age = Number(formData.get("age"))
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    
    const result = registerSchema.safeParse({ firstname, lastname, username, age, password, confirmPassword })

    if (!result.success) {
        return {
            values: { firstname, lastname, username, age, password, confirmPassword },
            errors: z.flattenError(result.error).fieldErrors
        }
    }

    // POST request til API
    const response = await fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstname,
            lastname,
            username,
            age,
            password,
            role: "default"
        })
    })

    if (!response.ok) {
        return {
            values: { firstname, lastname, username, age, password, confirmPassword },
            errors: { form: ["Der opstod en fejl ved oprettelse af bruger."] }
        }
    }

    // Redirect til login-side
    return redirect("/login")
}