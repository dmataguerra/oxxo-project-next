'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from 'next/cache';
import { Location } from "@/entities";

export async function updateLocation(store : string,formData: FormData) {
    const location: any = {}
    let locationLating = [0, 0];

    Array.from(formData.keys()).forEach(key => {
        const value = formData.get(key);
        if (value) {
            if (key === "locationLat") {
                locationLating[0] = +value;
            } else if (key === "locationLng") {
                locationLating[1] = +value;
            } else if (key === "manager") {
                location.managerId = formData.get(key);
            } else {
                location[key] = formData.get(key);
            }
        }
    });
    location.locationLating = locationLating;

    const response = await fetch(`${API_URL}/locations/${store}`, {
        method: "PATCH",
        body: JSON.stringify(location),
        headers: {
            'content-type' : 'application/json',
            ...authHeaders()
        }
    })
    
    if (response.ok) {
        const {locationId} : Location = await response.json();
        revalidateTag("dashboard:locations");
        revalidateTag(`dashboard:locations:${store}`);
        return { success: true, locationId };
    }
    
    return { success: false };
}