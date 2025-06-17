const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const validateTokenAPIClient = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: "GET",
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Token Invalid")
    }
    const responseData = await response.json();
    return responseData;
}