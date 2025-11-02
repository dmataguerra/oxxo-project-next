'use server';
import {  API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProduct(formData: FormData) {
    const product : any =  {};
    const productId = formData.get('productId');
    
    Array.from(formData.keys()).forEach(key => {
        const value = formData.get(key);
        if (key === 'price' || key === 'countSeal') {
            product[key] = Number(value);
        } else if (key !== 'productId' && !key.startsWith('$')) {
            product[key] = value;
        }
    });
    
    const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: {
            ...authHeaders(),
            'content-type' : 'application/json'
        },
    })
    
    if (response.ok) {
        revalidateTag("dashboard:products") 
        revalidateTag(`dashboard:products:${productId}`)
    } else {
        const errorText = await response.text();
    }
}