'use server';
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createEmployee(formData: FormData) {
    let locationId: number | undefined;
    const clean = new FormData();
    formData.forEach((value, key) => {
        if (key === 'employeePhoto' && value instanceof File) {
            clean.append(key, value);
        } else if (key === 'location') {
            const v = typeof value === 'string' ? value : String(value);
            if (v) locationId = Number(v);
        } else {
            clean.append(key, value as any);
        }
    });
    if (locationId !== undefined && !Number.isNaN(locationId)) {
        const json = JSON.stringify({ locationId });
        clean.append('location', json);
    }
    const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        body: clean,
        headers: {
            ...authHeaders(),
        },
    });
    if (response.status === 201) {
        revalidateTag("dashboard:employees");
    }
}
