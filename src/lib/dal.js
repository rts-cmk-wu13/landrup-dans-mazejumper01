"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

export async function getAllEvents() {
    //Second line of defense (apart from proxy)
    const cookieStore = await cookies();
    //Guard clause
    if (!cookieStore.has("accessToken")) return redirect("/no-access");

    const response = await fetch("http://localhost:4000/events");
    if(!response.ok){
        throw new Error({message: "Events could not be fetched"})
    }
    const data = await response.json();
    
    return data;
}


//Henter alle aktiviteter
export async function getAllActivities() {
    const response = await fetch("http://localhost:4000/api/v1/activities");
    if(!response.ok){
        throw new Error({message: "Posts could not be fetched"})
    }
    const data = await response.json();
    
    return data;
}

//Henter en enkel aktivitet med id
export async function getActivityById(id) {
    const response = await fetch(`http://localhost:4000/api/v1/activities/${id}`);
    if(!response.ok){
        throw new Error({message: "Posts could not be fetched"})
    }
    const data = await response.json();
    
    return data;
}


//Token til at logge ind udløber hver time
//Når token udløber giver den error 500 men det er en 401


//Henter en enkel bruger med id
export async function getUserById(id, token) {
  const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });




  if (!response.ok) {
    throw new Error("Kunne ikke hente bruger");
  }

  return response.json();
 }

 
//Til at tilføje en bruger til en aktivitet
export async function joinActivity(activityId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  
  const userResponse = await fetch(
    `http://localhost:4000/api/v1/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    }
  )

  if (!userResponse.ok) throw new Error("Kunne ikke hente bruger")

  const user = await userResponse.json()

  
  const activityResponse = await fetch(
    `http://localhost:4000/api/v1/activities/${activityId}`,
    { cache: "no-store" }
  )

  if (!activityResponse.ok) throw new Error("Kunne ikke hente aktivitet")

  const activity = await activityResponse.json()

  //Tjekker alder
  if (user.age < activity.minAge) {
    throw new Error("Du opfylder ikke alderskravet")
  }

  //Tjekker om bruger allerede har en aktivitet samme ugedag
  const hasSameWeekday = user.activities?.some(
    (a) => a.weekday.toLowerCase() === activity.weekday.toLowerCase()
  )

  if (hasSameWeekday) {
    throw new Error("Du er allerede tilmeldt en aktivitet på denne ugedag")
  }


  const response = await fetch(
    `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  )

  if (!response.ok) throw new Error("Kunne ikke tilmelde aktivitet")

  revalidatePath(`/aktiviteter/${activityId}`)
  return response.json()
}


//Henter reviews fra api
export async function getTestimonials() {
  const response = await fetch("http://localhost:4000/api/v1/testimonials")
  if (!response.ok) throw new Error("Kunne ikke hente testimonials")
  return response.json()
}


//Til at fjerne en bruger fra aktivitet
export async function leaveActivity(activityId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const response = await fetch(
    `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`,
    { 
        method: "DELETE", 
        headers:{ Authorization: `Bearer ${token}` }, 
        cache: "no-store" }
  )

  if (!response.ok) throw new Error("Kunne ikke afmelde aktivitet")

  revalidatePath(`/aktiviteter/${activityId}`)
  return { success: true }
}


