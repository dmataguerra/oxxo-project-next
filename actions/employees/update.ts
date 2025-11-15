"use server";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateEmployee(id: string, formData: FormData) {
    const clean = new FormData();
    formData.forEach((value, key) => {
        if (key.startsWith('$')) return;
        clean.append(key, value as any);
    });

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