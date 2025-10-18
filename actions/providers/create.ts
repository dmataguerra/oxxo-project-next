'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";


export default async function createProvider(formData: FormData) {
    const provider : any =  {};
    Array.from(formData.keys()).forEach(key => {
        provider[key] = formData.get(key); 
    });
    const response = await fetch(`${API_URL}/providers`, {
        method: "POST",
        body: JSON.stringify(provider),
        headers: {
            ...authHeaders(),
        },
    })
    if (response.status === 201) {
        revalidateTag("dashboard:providers");
    }
}