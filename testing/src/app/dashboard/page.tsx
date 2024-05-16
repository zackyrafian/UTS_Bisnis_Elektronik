"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardComponent from '@/components/dashboard/dashboard';
import { verifyToken } from '@/utils/authUtils';

const DashboardPage: React.FC = () => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token'); // Ambil token dari local storage atau cookie
            if (!token) {
                router.push('/login');
                return;
            }

            const tokenIsValid = await verifyToken(token);
            if (!tokenIsValid) {
                router.push('/login');
            } else {
                setLoggedIn(true); // Set state loggedIn menjadi true jika token valid
            }
        };

        checkToken();
    }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     router.push('/')
    // }

    if (!loggedIn) {
        return null;
    }

    return (
        <div>
            <DashboardComponent/>
        </div>
    );
};

export default DashboardPage;
