'use server';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

type RegisterResult = {
    success: boolean;
    error?: string;
};

export default async function registerManager(prevState: RegisterResult, formData: FormData): Promise<RegisterResult> {
    const userEmail = formData.get('userEmail');
    const userPassword = formData.get('userPassword');
    const managerId = formData.get('managerId');

    if (!managerId) {
        return { success: false, error: 'Falta managerId en el formulario' };
    }

    if (!userEmail || !userPassword) {
        return { success: false, error: 'Faltan campos requeridos: userEmail o userPassword' };
    }

    const response = await fetch(`${API_URL}/auth/register/${managerId}?role=manager`, {
        method: 'POST',
        headers: {
            ...authHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userPassword }),
        credentials: 'include',
    });

    if (!response.ok) {
        let details: any = undefined;
        try {
            details = await response.json();
        } catch {}
        const message = details?.message
            ? (Array.isArray(details.message) ? details.message.join(', ') : String(details.message))
            : response.statusText || 'Error desconocido';
        return { success: false, error: message };
    }

    return { success: true };
}
