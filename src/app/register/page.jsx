import RegisterForm from "@/components/registerForm/registerForm.jsx";
import Logo from "@/components/logo";

export default function Register() {
    return (
        <main>
            <Logo />

            <div className="grid grid-cols-[10px_1fr_10px] gap-5">
                <h1 className="col-start-2 text-4xl">Opret ny bruger</h1>
                <RegisterForm />
            </div>
        </main>
    )
}