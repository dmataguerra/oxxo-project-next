'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateManager(formData: FormData) {
    const manager : any =  {};
    const managerId = formData.get('managerId');
    
    Array.from(formData.keys()).forEach(key => {
        manager[key] = formData.get(key); 
    });
    
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify(manager),
        headers: {
            ...authHeaders(),
        },
    })
    if (response.status === 201) {
        revalidateTag("dashboard:managers") 
        revalidateTag(`dashboard:managers:${managerId}`)
    }
}