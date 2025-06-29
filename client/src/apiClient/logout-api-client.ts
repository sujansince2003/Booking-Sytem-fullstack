const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const LogoutAPI = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    })
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.msg)
    }
    return responseData;


}