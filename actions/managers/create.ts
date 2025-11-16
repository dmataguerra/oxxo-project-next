'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";


export default async function createManager(formData: FormData) {
    const manager : any =  {};
    Array.from(formData.keys()).forEach(key => {
        const value = formData.get(key);
        // normalize values according to expected backend types
        if (key === 'location') {
            if (value && value !== '0') {
                manager.locationId = Number(value);
            }
        } else if (key === 'managerSalary') {
            manager.managerSalary = Number(value as any);
        } else if (value instanceof File) {
            // skip files for managers
        } else {
            manager[key] = value as string;
        }
    });
    // ensure salary is a number if present
    if (manager.managerSalary !== undefined) manager.managerSalary = Number(manager.managerSalary);
    const response = await fetch(`${API_URL}/managers`, {
        method: "POST",
        body: JSON.stringify(manager),
        headers: {
            'content-type': 'application/json',
            ...authHeaders(),
        },
    })
    if (response.status === 201) {
        revalidateTag("dashboard:managers");
        return { success: true };
    }
    let details = undefined;
    try {
        details = await response.json();
    } catch (e) {
        details = await response.text();
    }
    return { success: false, error: `Failed to create manager: ${response.status} ${response.statusText} - ${JSON.stringify(details)}` };
}
