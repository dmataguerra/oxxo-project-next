'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";


export default async function createManager(formData: FormData) {
    const manager : any =  {};
    Array.from(formData.keys()).forEach(key => {
        manager[key] = formData.get(key); 
    });
    const response = await fetch(`${API_URL}/managers`, {
        method: "POST",
        body: JSON.stringify(manager),
        headers: {
            ...authHeaders(),
        },
    })
    if (response.status === 201) {
        revalidateTag("dashboard:managers");
    }
}
