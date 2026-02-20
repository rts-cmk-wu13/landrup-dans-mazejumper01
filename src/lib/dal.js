"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

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


export async function getAllActivities() {
    const response = await fetch("http://localhost:4000/api/v1/activities");
    if(!response.ok){
        throw new Error({message: "Posts could not be fetched"})
    }
    const data = await response.json();
    
    return data;
}

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

export async function getUserById(id, token) {
  const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });

   console.log("Status:", response.status);


  if (!response.ok) {
    throw new Error("Kunne ikke hente bruger");
  }

  return response.json();
 }

