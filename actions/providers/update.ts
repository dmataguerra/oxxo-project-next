'use server';
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateProvider(providerId: string, formData: FormData) {
    const provider: any = {};
    Array.from(formData.keys()).forEach(key => {
        if (key !== "products") {
            provider[key] = formData.get(key);
        }
    });
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
        method: "PATCH",
        body: JSON.stringify(provider),
        headers: {
            'content-type': 'application/json',
            ...authHeaders(),
        },
    });
    if (response.status === 200) {
        revalidateTag("dashboard:providers");
        revalidateTag(`dashboard:providers:${providerId}`);
    }
}