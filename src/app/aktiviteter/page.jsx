import Image from "next/image"
import { getAllActivities } from "@/lib/dal"
import ActivityCard from "@/components/activityCard"
import FooterNav from "@/components/footerNav"


export default async function Page() {

    const activities = await getAllActivities()

  return (
    <>
      <main className="px-4 pb-20">
        <section className="flex justify-center">

          <div>

            <h1 className="text-3xl font-bold mb-6">Aktiviteter</h1>


              
              {activities.map((activity) => (
                <ActivityCard activity={activity} key={activity.id} />
              ))}
            </div>

        </section>
      </main>
      
      <FooterNav />
    </>
  );
}
