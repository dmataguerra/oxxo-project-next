'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";


export default async function createProduct(formData: FormData) {
    const product : any =  {};
    Array.from(formData.keys()).forEach(key => {
        const value = formData.get(key);
        // Skip Next.js internal action IDs
        if (key.startsWith('$ACTION')) return;
        
        if (key === 'price' || key === 'countSeal') {
            product[key] = Number(value);
        } else {
            product[key] = value;
        }
    });

    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'content-type': 'application/json',
            ...authHeaders(),
        },
    });

    if (response.status === 201) {
        revalidateTag("dashboard:products");
    }
}