'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from 'next/cache';

export async function createLocation(formData: FormData) {
    let location: any = {}
    let locationLating = [0, 0];

    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            if (key === "locationLat") {
                locationLating[0] = +value;
            } else if (key === "locationLng") {
                locationLating[1] = +value;
            } else if (key === "manager") {
                // Cambiar "manager" a "managerId"
                location.managerId = formData.get(key);
            } else {
                location[key] = formData.get(key);
            }
        }
    }
    location.locationLating = locationLating;

    const response = await fetch(`${API_URL}/locations`, {
        method: "POST",
        body: JSON.stringify(location),
        headers: {
            ...authHeaders()
        }
    })
    if(response.status === 201) revalidateTag ("dashboard:locations");
}


