"use server"

import { z } from "zod"

const newsletterSchema = z.object({
    email: z
        .string()
        .min(3, "Email er påkrævet")
        .email("Ugyldig email adresse")
})

export async function subscribeToNewsletter(prevState, formData) {

    const rawData = {
        email: formData.get("email")
    }

    const validatedFields = newsletterSchema.safeParse(rawData)

    // Hvis validering fejler
    if (!validatedFields.success) {
        return {
            values: rawData,
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    try {
        const response = await fetch("http://localhost:4000/api/v1/newsletter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validatedFields.data)
        })

        if (!response.ok) {
            throw new Error("Noget gik galt")
        }

        return {
            values: { email: "" },
            success: "Du er nu tilmeldt nyhedsbrevet"
        }

    } catch (error) {
        return {
            values: rawData,
            errors: { form: ["Kunne ikke tilmelde. Prøv igen senere."] }
        }
    }
}