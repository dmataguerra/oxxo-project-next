'use server';
import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';

type UpdateResult = {
    success: boolean;
    error?: string;
};

export default async function updateUser(prevState: UpdateResult, formData: FormData): Promise<UpdateResult> {
    const userId = formData.get('userId');
    const userEmail = formData.get('userEmail');
    const userPassword = formData.get('userPassword');

    if (!userId) {
        return { success: false, error: 'Falta userId en el formulario' };
    }

    const body: any = {};
    if (userEmail) body.userEmail = userEmail;
    if (userPassword) body.userPassword = userPassword;

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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
    } catch (e: any) {
        return { success: false, error: e?.message ?? 'Error en la solicitud' };
    }
}
