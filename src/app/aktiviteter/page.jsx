import Image from "next/image"
import { getAllActivities } from "@/lib/dal"
import ActivityCard from "@/components/activityCard"


export default async function Page() {

    const activities = await getAllActivities()

    return (
   <main className="px-4">
  <section className="flex justify-center">

    <div>

      <h1 className="text-3xl font-bold mb-6">Aktiviteter</h1>


        
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </div>

  </section>
</main>
  );
}
