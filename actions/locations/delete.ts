'use server';

import { cookies } from "next/headers";
import {API_URL,  TOKEN_NAME } from "@/constants";
import axios from "axios";

export default async function deleteLocation (formData : FormData){
    const locationId = formData.get("deleteValue")
    if(!locationId) return;
    
    const tokenCookie = cookies().get(TOKEN_NAME)?.value;
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }
    
    await axios.delete(`${API_URL}/locations/${locationId}`, {
        headers: {
            Authorization: `Bearer ${actualToken}`
        },
        withCredentials: true
    });
}