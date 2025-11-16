"use server";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateEmployee(formData: FormData) {
    const id = String(formData.get('id'));
    const clean = new FormData();
    let locationId: number | undefined;
    formData.forEach((value, key) => {
        if (key.startsWith('$')) return;
        if (key === 'id') return; // do not send id in body
        if (key === 'location') {
            const v = typeof value === 'string' ? value : String(value);
            if (v) locationId = Number(v);
            return; // we'll append transformed below
        }
        clean.append(key, value as any);
    });
    if (locationId !== undefined && !Number.isNaN(locationId)) {
        clean.append('location', JSON.stringify({ locationId }));
    }
    const response = await fetch(`${API_URL}/employees/${id}`, {
        method: "PATCH",
        headers: {
            ...authHeaders(),
        },
        body: clean,
    });
    if (response.status === 200) revalidateTag(`dashboard:employees`);
    return;
}