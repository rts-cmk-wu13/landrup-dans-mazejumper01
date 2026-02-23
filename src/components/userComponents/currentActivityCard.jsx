"use client";
import Link from "next/link";

export default function CurrentActivityCard({ activity }) {
  return (
    <div className="bg-white text-black opacity-80 p-4 rounded shadow flex flex-col justify-between">
      <h3 className="font-bold text-lg">{activity.name}</h3>
      <p>Start: {activity.weekday} kl {activity.time}</p>
      <Link  href={`/aktiviteter/${activity.id}`}>
      < button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Vis hold</button>
      </Link>
    </div>
  );
}