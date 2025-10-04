import { Button , Input} from "@nextui-org/react";
import Link from "next/link";

export default function SignupPage(){
    return (
        <div className="bg-orange-500 px-10 py-2 rounded-md">
            <p className="text-2xl my-4 text-white">Crear Cuenta<span></span></p>
            <div className="flex flex-col gap-2 my-4 items-center">
                <Input label="Email" type="email" isRequired={true} size="sm" />
                <Input label="Password" type="password" isRequired={true} size="sm" />
                <Input label="Repetir contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col gap-2 my-4 items-center">
             <Button color="primary">Registrarse</Button>
             <p>Ya tienes una cuenta? <Link href="/login">Iniciar Sesion</Link></p>
            </div>
        </div>
    ); 
}