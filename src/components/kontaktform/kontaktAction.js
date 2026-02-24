"use server"

import { z } from "zod"

const kontaktSchema = z.object({
  name: z.string().min(2, "Navn er påkrævet"),
  email: z.string().email("Ugyldig email adresse"),
  message: z.string().min(5, "Besked skal være mindst 5 tegn")
})

export async function sendKontaktMessage(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  }

  const validation = kontaktSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      values: rawData,
      errors: validation.error.flatten().fieldErrors
    }
  }

  try {
    const response = await fetch("http://localhost:4000/api/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data)
    })

    if (!response.ok) {
      throw new Error("Noget gik galt ved afsendelse")
    }

    return {
      values: { name: "", email: "", message: "" },
      success: "Din besked er sendt. Vi vender tilbage hurtigst muligt."
    }
  } catch (error) {
    return {
      values: rawData,
      errors: { form: ["Kunne ikke sende besked. Prøv igen senere."] }
    }
  }
}