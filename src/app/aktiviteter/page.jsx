"use client";

import { useState, useEffect } from "react";
import { getAllActivities } from "@/lib/dal";
import ActivityCard from "@/components/activityCard";
import FooterNav from "@/components/footerNav";
import SearchDrawer from "@/components/SearchDrawer";

export default function Page() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      const data = await getAllActivities();
      setActivities(data);
      setFilteredActivities(data);
      setLoading(false);
    }
    fetchActivities();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = activities.filter((activity) => {
      const nameMatch = activity.name.toLowerCase().includes(lowerQuery);
      const weekdayMatch = activity.weekday.toLowerCase().includes(lowerQuery);
      const instructorName = activity.users?.find(u => u.role === "instructor");
      const instructorMatch = instructorName
        ? `${instructorName.firstname ?? ""} ${instructorName.lastname ?? ""}`
            .toLowerCase()
            .includes(lowerQuery)
        : false;

      return nameMatch || weekdayMatch || instructorMatch;
    });

    setFilteredActivities(filtered);
  };

  return (
    <>
      <main className="grid grid-cols-[10px_1fr_10px] pb-20">
    
          <section className="w-full items-center flex flex-col col-start-2 gap-10 max-w-3xl ">
            <SearchDrawer onSearch={handleSearch} />
            <h1 className="text-3xl font-bold ">Aktiviteter</h1>

          


            {loading ? (
              <p>Indlæser aktiviteter...</p>
            ) : filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <ActivityCard activity={activity} key={activity.id} />
              ))
            ) : (
              <p>Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</p>
            )}
          </section>
  
      </main>

      <FooterNav />
    </>
  );
}