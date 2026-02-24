"use server";

import { getActivityById, joinActivity, leaveActivity } from "@/lib/dal"
import { cookies } from "next/headers"
import FooterNav from "@/components/footerNav";

export default async function AktiviteterDetailPage({ params }) {
  const { id } = await params
  const activity = await getActivityById(id)

  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  const isJoined = activity.users?.some(u => u.id === Number(userId))

  async function handleJoin() {
    "use server"
    await joinActivity(id)
  }

  async function handleLeave() {
    "use server"
    await leaveActivity(id)
  }

  return (
    <>
    <main className="grid gap-6">
      <div
        className="grid grid-cols-[10px_1fr_10px] max-w-100% h-120.5 items-end justify-items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${activity.asset?.url || "/placeholder.jpg"})` }}
      >
        {isJoined ? (
          <form action={handleLeave} className="col-start-2 mb-7">
            <button className="bg-[#003147] w-60 h-13.25 rounded text-white">
              Afmeld
            </button>
          </form>
        ) : (
          <form action={handleJoin} className="col-start-2 mb-7">
            <button className="bg-[#003147] w-60 h-13.25 rounded text-white">
              Tilmeld
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-[10px_1fr_10px]">
        <div className="col-start-2">
          <h1 className="text-3xl">{activity.name}</h1>
          <p>{activity.minAge}+ år</p>
          <p>{activity.description}</p>
        </div>
      </div>
    </main>

    <FooterNav />
    </>
  )
}