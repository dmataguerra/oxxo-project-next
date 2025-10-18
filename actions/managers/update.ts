'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateManager(formData: FormData) {
    const manager : any =  {};
    const managerId = formData.get('managerId');
    
    Array.from(formData.keys()).forEach(key => {
        const value = formData.get(key);
        if (key === 'location') {
            if (value && value !== '0') {
                manager.locationId = Number(value);
            }
        } else if (key !== 'managerId') {
            manager[key] = value;
        }
    });

    manager.managerSalary = Number(manager.managerSalary);
    
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify(manager),
        headers: {
            ...authHeaders(),
            'content-type' : 'application/json'
        },
    })
    
    if (response.ok) {
        revalidateTag("dashboard:managers") 
        revalidateTag(`dashboard:managers:${managerId}`)
        return { success: true };
    }
    
    return { success: false };
}