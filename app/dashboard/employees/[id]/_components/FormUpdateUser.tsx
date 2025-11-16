'use client';
import updateUser from '@/actions/users/update-user';
import { Input, Button } from "@nextui-org/react";
import { Employee } from '@/entities';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { LuEye } from 'react-icons/lu';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" isLoading={pending} color="primary" className="mt-2 font-semibold text-base bg-orange-500 text-white shadow-md hover:bg-orange-600 transition">
            {pending ? 'Actualizando...' : 'Actualizar usuario'}
        </Button>
    );
}

export default function FormUpdateUserEmployee({ employee, onClose } : { employee: Employee, onClose?: () => void }) {
    const [email, setEmail] = useState<string>(employee?.user?.userEmail ?? '');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const userId = employee?.user?.userId ?? '';
    const [state, formAction] = useFormState(updateUser as any, { success: false, error: undefined as string | undefined });

    const router = useRouter();
    useEffect(() => {
        if (state?.success) {
            setPassword('');
            try { router.refresh(); } catch (e) {}
            onClose?.();
        }
    }, [state?.success, onClose, router]);

    return (
        <div className="w-full flex justify-center items-center py-6">
            <div className="bg-white rounded-xl shadow-lg border border-orange-300 p-8 min-w-[320px] max-w-[400px] flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-orange-500 text-center mb-2">Actualizar usuario</h2>
                <form action={formAction} className="flex flex-col gap-4">
                    <input type="hidden" name="userId" value={userId} />
                    <Input name="userEmail" type="email" label="Email" required className="bg-orange-50" value={email} onChange={(e:any) => setEmail(e.target.value)} />
                    <Input
                        value={password}
                        name="userPassword"
                        type={visible ? 'text' : 'password'}
                        label="Contraseña (dejar en blanco para no cambiar)"
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
                        <p className="text-green-600 text-sm">Usuario actualizado correctamente.</p>
                    )}
                    <SubmitButton />
                </form>
            </div>
        </div>
    )
}
