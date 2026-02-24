"use client";
import Link from "next/link";

export default function CurrentActivityCard({ activity, isInstructor }) {
  return (
    <div className="bg-white text-black opacity-80 p-4 rounded shadow flex flex-col justify-between">
      <h3 className="font-bold text-xl">{activity.name}</h3>
      <p>{activity.weekday} kl {activity.time}</p>

      {isInstructor ? (
        <>
          <p>Max. deltagere: {activity.maxParticipants}</p>
          <p>tilmeldte {activity.users?.length || 0}</p>
          <Link href={`/deltagerListe/${activity.id}`}>
            <button className="mt-2 bg-[#003147] text-white px-4 py-2 rounded ">
              Deltagerliste
            </button>
          </Link>
        </>
      ) : (
        <Link href={`/aktiviteter/${activity.id}`}>
          <button className="mt-2 bg-[#003147] text-white px-4 py-2 rounded ">
            Vis hold
          </button>
        </Link>
      )}
    </div>
  );
}
