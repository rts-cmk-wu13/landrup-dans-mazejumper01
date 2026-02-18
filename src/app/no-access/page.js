import Link from "next/link";


export default function NoAccess () {

    return (
        <main>
            <h1 className="text-red-400 uppercase text-8xl">Ingen adgang!</h1>
            <p className="my-8">Du skal logge ind!!!</p>
            <Link href="/login">Log ind her</Link>
        </main>
    )
}