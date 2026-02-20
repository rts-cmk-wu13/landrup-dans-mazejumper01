import Image from "next/image";
import { cookies } from "next/headers";
import { getUserById } from "@/lib/dal";
import CurrentActivityCard from "@/components/userComponents/currentActivityCard";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token || !userId) return <p>Du er ikke logget ind</p>;

  let user;
  try {
    user = await getUserById(userId, token);


    console.log("Brugerdata:", user);


    const activities = user.activities || [];
    console.log("Aktiviteter array:", activities);
    console.log("Antal hold:", activities.length);

  } catch (err) {
    console.error("Fejl ved hentning af bruger:", err);
    return <p>Kunne ikke hente bruger</p>;
  }

  const activities = user.activities || [];

  return (
    <main className="p-4">
      <h1>Min profil</h1>
      <div className="bg-white text-3xl text-black flex flex-col gap-4 justify-center items-center p-4 rounded shadow">
        <Image src="/assets/user.svg" width={64} height={64} alt="Bruger ikon" />
        <p>Navn: {user.firstname} {user.lastname}</p>
        <p>Rank: {user.role}</p>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl mb-4">Tilmeldte hold</h2>
        {activities.length === 0 && <p>Du er ikke tilmeldt nogen hold.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activities.map(activity => (
            <CurrentActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

     
    </main>
  );
}
