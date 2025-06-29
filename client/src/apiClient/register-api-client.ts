import type { RegisterFormData } from "../pages/Register";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const registerAPI = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)

    })

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.msg)
    }
    return responseData
}


