'use client';
import registerEmployee from "@/actions/users/register-employee";
import { Input, Button } from "@nextui-org/react";
import { Employee } from "@/entities";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {generate} from 'generate-password';
import { LuEye } from "react-icons/lu";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" isLoading={pending} color="primary" className="mt-2 font-semibold text-base bg-orange-500 text-white shadow-md hover:bg-orange-600 transition">
            {pending ? 'Creando...' : 'Crear usuario'}
        </Button>
    );
}

export default function FormCreateUserEmployee({employee, onClose} : {employee : Employee, onClose?: () => void}) {
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const {id} = employee;
    const [state, formAction] = useFormState(registerEmployee as any, { success: false, error: undefined as string | undefined });

    useEffect(() => {
        if (state?.success) {
            setPassword("");
            onClose?.();
        }
    }, [state?.success, onClose]);
    return (
        <div className="w-full flex justify-center items-center py-6">
            <div className="bg-white rounded-xl shadow-lg border border-orange-300 p-8 min-w-[320px] max-w-[400px] flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-orange-500 text-center mb-2">Crear usuario para empleado</h2>
                <form action={formAction} className="flex flex-col gap-4">
                    <input type="hidden" name="employeeId" value={id} />
                    <Input name="userEmail" type="email" label="Email" required className="bg-orange-50"/>
                    <Input
                        value={password}
                        name="userPassword"
                        type={visible ? "text" : "password"}
                        label="Contraseña"
                        required
                        className="bg-orange-50"
                        onChange={e => setPassword(e.target.value)}
                        endContent={
                            <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                onPress={() => setVisible(v => !v)}
                                className="min-w-0 px-1"
                                aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                <LuEye style={{opacity: visible ? 1 : 0.5}} />
                            </Button>
                        }
                    />
                    {state?.error && (
                        <p className="text-red-600 text-sm">{state.error}</p>
                    )}
                    {state?.success && !state.error && (
                        <p className="text-green-600 text-sm">Usuario creado correctamente.</p>
                    )}
                    <Button color="danger" onPress={() => {
                        setPassword(generate({
                            length: 10,
                        }))
                    }}>Generar Contraseña</Button>
                    <SubmitButton />
                </form>
            </div>
        </div>
    )
}