"use client";

import Link from "next/link";

export default function ActivityCard({ activity }) {
  return (
<>
<div className="pb-5">
  <Link
    href={`/aktiviteter/${activity.id}`}
    aria-labelledby={"activity-card-" + activity.id}
    className="block"
  >
    <div
      className="flex flex-col-reverse w-90 h-85 rounded-t-3xl rounded-bl-3xl overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${activity.asset?.url || "/placeholder.jpg"})`,
      }}
    >
      <div className="bg-gray-800 rounded-tr-3xl opacity-90 flex flex-col justify-end p-4 text-white">
        <h2
          name={"activity-card-" + activity.name}
          className="text-xl font-semibold"
        >
          {activity.name}
        </h2>
        <p>
          {activity.minAge}-{activity.maxAge} år
        </p>
      </div>
    </div>
  </Link>
</div>

    </>
  );
}
