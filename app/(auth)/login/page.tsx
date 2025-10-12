"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitting(true);
        setError("");
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let authData: any = {};
        authData.userEmail = formData.get("userEmail");
        authData.userPassword = formData.get("userPassword");
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                userEmail: authData.userEmail,
                userPassword: authData.userPassword
            }, {
                withCredentials: true,
            });
            if (response.status === 201 || response.status === 200) {
                router.push('/dashboard');
            }
            setSubmitting(false);
        } catch (error: any) {
            setSubmitting(false);
            if (error.code === 'ERR_NETWORK') {
                setError("Error de red: Verifica que el backend esté funcionando y configurado para CORS");
            } else if (error.response?.status === 401) {
                setError("Credenciales incorrectas");
            } else {
                setError(error.message || "Error al iniciar sesión");
            }
            console.error("Error en login:", error);
        }
        return;
    }
    return (
        <form className="bg-orange-500 px-10 py-2 rounded-md" onSubmit={handelSubmit}>
            <p className="text-2xl my-4 text-white">
                Iniciar Sesión
            </p>
            <div className="flex flex-col gap-2 my-4 items-center">
                <Input label="Email" name="userEmail" type="email" isRequired={true} size="sm" />
                <Input label="Password" name="userPassword" type="password" isRequired={true} size="sm" />
                {error && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                        {error}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 items-center">
                <Button color="primary" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Iniciar Sesión"}</Button>

                <p className="text-white">
                    No tienes una cuenta?<Link href="/signup" className="text-red-600 underline">Registrarse</Link>
                </p>
            </div>
        </form>
    )
}