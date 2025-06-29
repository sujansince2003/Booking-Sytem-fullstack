import type { LoginFormData } from "../pages/Login";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const LoginAPI = async (formData: LoginFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
    return responseData;
}