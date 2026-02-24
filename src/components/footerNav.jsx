"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function FooterNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t grid grid-cols-[20px_1fr_20px]">
            <ul className="col-start-2 flex justify-between items-center">

                <li>
                    <Link href="/" className="flex flex-col items-center">
                        <Image
                            src="/assets/home.svg"
                            width={18}
                            height={18}
                            alt="Home"
                        />
                        <span className={pathname === "/" ? "text-black" : "text-gray-500"}>
                            Home
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="/aktiviteter" className="flex flex-col items-center">
                        <Image
                            src={pathname.startsWith("/aktiviteter") 
                                ? "/assets/aktiviteter-active.svg" 
                                : "/assets/vector.svg"}
                            width={18}
                            height={18}
                            alt="Aktiviteter"
                        />
                        <span className={pathname.startsWith("/aktiviteter") ? "text-black" : "text-gray-500"}>
                            Aktiviteter
                        </span>
                    </Link>
                </li>

                <li>
                    <Link href="/kalender" className="flex flex-col items-center">
                        <Image
                            src={pathname.startsWith("/kalender") 
                                ? "/assets/profile-active.svg" 
                                : "/assets/profil.svg"}
                            width={18}
                            height={18}
                            alt="Profil"
                        />
                        <span className={pathname.startsWith("/kalender") ? "text-black" : "text-gray-500"}>
                            Profil
                        </span>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}