'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export default async function createProvider(formData: FormData) {
    const provider : any = {};
    Array.from(formData.keys()).forEach(key => {
        if (key !== "products") {
            provider[key] = formData.get(key); 
        }
    });
    const response = await fetch(`${API_URL}/providers`, {
        method: "POST",
        body: JSON.stringify(provider),
        headers: {
            'content-type': 'application/json',
            ...authHeaders(),
        },
    })
    if (response.status === 201) {
        revalidateTag("dashboard:providers");
        revalidateTag("dashboard:products");
        redirect("/dashboard/providers");
    } else {
        const errorText = await response.text();
        throw new Error(`Failed to create provider: ${response.status} ${response.statusText} - ${errorText}`);
    }
}