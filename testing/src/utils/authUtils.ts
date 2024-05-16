import { axiosInstance } from "@/lib/axios";

export async function verifyToken(token: string) {
    try {
        const response = await axiosInstance.post('/api/verify-token', { token });

        if (response.status === 200) {
            // Token valid, lanjutkan aksi yang sesuai
            console.log('Token valid');
            return true;
        } else {
            // Token tidak valid, handle kesalahan
            console.error('Token tidak valid');
            return false;
        }
    } catch (error) {
        console.error('Gagal memverifikasi token:', error);
        return false;
    }
}


export const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };