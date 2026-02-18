import Link from "next/link";
import Logo from "@/components/logo";


export default function Home() {
  return (
    <main>
     <section className="relative min-h-212 w-full bg-[url('/assets/heroimg.jpg')] bg-cover bg-center flex flex-col justify-between items-center">
        <Logo />
        <Link href="/login">
          <button className='btn'>Log ind her</button>
        </Link>
     </section>
    </main>
  );
}