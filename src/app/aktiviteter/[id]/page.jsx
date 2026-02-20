import { getActivityById } from "@/lib/dal";



export default async function AktiviteterDetailPage ( {params} ) {

    const { id } = await params

    const activity = await getActivityById(id)

    console.log(activity);
    
    return (
        <main>
            <div
            className="flex flex-col-reverse w-90 h-85  bg-cover bg-center"
            style={{
                backgroundImage: `url(${activity.asset?.url || "/placeholder.jpg"})`,
            }}
            >
                <button>Tildmeld</button>
            </div>
            <h1 className="text-3xl  my-6">{ activity.name }</h1>
            <p>{activity.minAge}+år</p>

            <p>{activity.description}</p>
        </main>
    )

}