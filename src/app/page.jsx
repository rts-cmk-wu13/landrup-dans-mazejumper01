import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
import NyhedsForm from "@/components/nyhedsform/nyhedsForm";
import Slider from "@/components/slider";
import KontaktForm from "@/components/kontaktform/kontaktForm"
import { logoutUser } from "@/lib/logout";
import { cookies } from "next/headers";


export default async function Home() {

  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has("accessToken")


  return (
    <main>
     <section className="relative min-h-212 w-full bg-[url('/assets/heroimg.jpg')] bg-cover bg-center flex flex-col justify-between items-center">
        <Logo />
         {isLoggedIn ? (
          <form action={logoutUser}>
            <button className='btn'>Log ud</button>
          </form>
        ) : (
          <Link href="/login">
            <button className='btn'>Log ind her</button>
          </Link>
        )}

     </section>

      
  
      <section className="flex justify-center">

        

        <section>
          <h1 className="text-3xl pt-10">Hvores holdtyper</h1>

          <article className="holdtyper">
            <h3>Børnehold</h3>

            <Image 
                src="/assets/boernedans.jpg"
                width={1000}
                height={62}
                alt="Børn der danser"
                    />

            <p>På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse og fantasi. Undervisningen styrker motorik, rytme og kropsbevidsthed i trygge rammer. Fokus er på danseglæde, fællesskab og aktiv bevægelse, hvor alle kan være med.</p>
          </article>

          <article className="holdtyper">
            <h3>Selskabs- og seniordans</h3>

            <Image 
                src="/assets/seniordans.jpg"
                width={1000}
                height={62}
                alt="Ældre mennesker der danser"
                    />

            <p>Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion. Vi danser klassiske pardanse i et tempo, hvor alle kan følge med. Undervisningen styrker balance, koordination og kondition, samtidig med at fællesskabet og danseglæden er i centrum.</p>
          </article>

          <article className="holdtyper">
            <h3>Moderne dans og ballet</h3>

            <Image 
                src="/assets/modernedans.jpg"
                width={1000}
                height={62}
                alt="Folk som danser moderne dans og ballet"
                    />

            <p>Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk. Træningen forbedrer styrke, smidighed og holdning gennem varierede øvelser. Undervisningen foregår i en positiv atmosfære, hvor bevægelsesglæde og koncentration skaber både fordybelse og effektiv motion.</p>
          </article>

          <article className="holdtyper">
            <h3>Streetdance og hiphop</h3>

            <Image 
                src="/assets/streethiphop.jpg"
                width={1000}
                height={62}
                alt="folk som danser hip-hop"
                    />

            <p>Streetdance og hiphop er energifyldt træning med fokus på rytme, attitude og fællesskab. Vi arbejder med grooves, koreografier og grundtrin, der styrker kondition og koordination. Stemningen er uformel og motiverende, så motion og danseglæde går hånd i hånd.</p>
          </article>
      </section>
      </section>

      <section className="flex justify-center ">
      <div className="w-89">
        <h2>Nyhedsbrev</h2>

        <p>Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>

       <NyhedsForm />
       </div>
      </section>

      <Slider />
      
      <KontaktForm />

      <footer className="flex flex-col items-center gap-4 my-10">

        <Image 
          src="/assets/landrup.svg"
          width={64}
          height={64}
          alt="Landrup Dans logo"
                    />

        <h2 className="text-2xl">Landrup Dans</h2>
        <p>Pulsen 8. 4000 Roskilde</p>
        <p>Tlf. 3540 4550</p>
      </footer>
    </main>
  );
}


