import Link from "next/link";


export default function NoAccess () {

    return (
        <main className="flex flex-col gap-5 items-center">
            <h1 className=" mt-10  text-2xl under">Du er ikke logget ind</h1>

            <Link className="underline"  href="/login">Du kan log ind her</Link>
        </main>
    )
}