import { getActivityById } from "@/lib/dal";



export default async function AktiviteterDetailPage ( {params} ) {

    const { id } = await params

    const activity = await getActivityById(id)

    console.log(activity);
    
    

}