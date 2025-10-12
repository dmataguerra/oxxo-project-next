'use server';
import axios from "axios";
import { cookies } from "next/headers";
import { TOKEN_NAME, API_URL } from "@/constants";

export async function createLocation(formData: FormData) {
    const tokenCookie = cookies().get(TOKEN_NAME)?.value;
    if (!tokenCookie) return;

    // Extraer el JWT real del objeto JSON
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }

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

    console.log("Datos a enviar:", location);

    const response = await axios.post(`${API_URL}/locations`, {
        ...location
    }, {
        headers: {
            Authorization: `Bearer ${actualToken}`
        },
        withCredentials: true
    });

    console.log("Location creada exitosamente:", response.data);
    return { success: true, data: response.data };

}

