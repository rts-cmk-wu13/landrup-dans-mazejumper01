"use server";

import { getActivityById, leaveActivity, getUserById } from "@/lib/dal"
import { joinActivity } from "@/lib/dal"
import { cookies } from "next/headers"
import FooterNav from "@/components/footerNav";
import Image from "next/image";

export default async function Page({ params }) {
  const { id } = await params
  const activity = await getActivityById(id)

  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  const token = cookieStore.get("accessToken")?.value

  const user = userId && token
    ? await getUserById(userId, token)
    : null

  return (
    <>
    <main className="grid grid-cols-[10px_1fr_10px]">
      <h1 className="col-start-2 text-center text-2xl py-5">Min profil</h1>
    
      <div className="bg-white col-start-1 col-span-3 text-3xl text-black flex flex-col gap-4 justify-center items-center rounded shadow">
        <Image src="/assets/user.svg" width={64} height={64} alt="Bruger ikon" />
        <p>Navn: {user.firstname} {user.lastname}</p>
        <p>Rank: {user.role}</p>
      </div>

      <div className="col-start-2 pt-8 flex flex-col gap-8"> 
        <h2 className="text-2xl ">{activity.name}</h2>
        <h3 className="text-lg">Deltagere:</h3>
        {activity.users && activity.users.length > 0 ? (
          <ul>
            {activity.users.map(user => (
              <li className="bg-white text-[#003147] opacity-80 p-4 rounded shadow flex gap-5 justify-between" key={user.id}>
                <div className="flex gap-2">
                 <Image src="/assets/user.svg"
                  width={20} height={20}
                   alt="Bruger ikon" />
                <p>{user.firstname} {user.lastname}</p>
                </div>
                <p>{user.age} år</p>

              </li>
              
            ))}
          </ul>
        ) : (
          <p>Ingen deltagere endnu</p>
        )}
      </div>
    </main>

      <FooterNav />
    </>
  )
}