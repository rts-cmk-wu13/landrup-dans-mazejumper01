import LoginForm from "@/components/loginform/loginForm.jsx";
import Logo from "@/components/logo";
import Link from "next/link";

export default function Login() {
    return (

        <main >
            <Logo />

            <div className="grid grid-cols-[10px_1fr_10px] gap-5">

                 <h1 className="col-start-2 text-4xl">Log ind</h1>

                <LoginForm/>
            </div>
           
            <p className="w-screen text-center">er du endu ikke bruger? <Link className="underline" href="/register">opret dig her</Link></p>

        </main>

    );

    };