
import Image from "next/image";
import { cookies } from "next/headers";
import { getUserById, getAllActivities } from "@/lib/dal";
import CurrentActivityCard from "@/components/userComponents/currentActivityCard";
import FooterNav from "@/components/footerNav";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token || !userId) return <p>Du er ikke logget ind</p>;

  let user;
  try {
    user = await getUserById(userId, token);
   
  } catch (err) {
    console.error("Fejl ved hentning af bruger:", err);
    return <p>Kunne ikke hente bruger</p>;
  }

  let activities = [];

  if (user.role !== "instructor") {

    activities = user.activities || [];
  } else {

    try {
      const allActivities = await getAllActivities();
      activities = allActivities.filter(act => act.instructorId === user.id);

    } catch (err) {
      console.error("Fejl ved hentning af alle aktiviteter:", err);
      activities = [];
    }
  }

  return (
    <>
      <main className="grid grid-cols-[10px_1fr_10px]">
        <h1 className="col-start-2 text-center text-2xl py-5">Min profil</h1>

        <div className="bg-white col-start-1 col-span-3 text-3xl text-black flex flex-col gap-4 justify-center items-center rounded shadow">
          <Image src="/assets/user.svg" width={64} height={64} alt="Bruger ikon" />
          <p>Navn: {user.firstname} {user.lastname}</p>
          <p>Rank: {user.role}</p>
        </div>

        <section className="mt-8 col-start-2">
          <h2 className="text-2xl mb-4">{user.role === "instructor" ? "Hold du underviser" : "Tilmeldte hold"}</h2>

          {activities.length === 0 && (
            <p>{user.role === "instructor" ? "Du underviser endnu ikke på nogen hold." : "Du er ikke tilmeldt nogen hold."}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activities.map(activity => (
              <CurrentActivityCard
                key={activity.id}
                activity={activity}
                isInstructor={user.role === "instructor"}
              />
            ))}
          </div>
        </section>
      </main>
      <FooterNav />
    </>
  );
}