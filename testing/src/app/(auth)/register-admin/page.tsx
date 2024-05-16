"use client"

import { axiosInstance } from "@/lib/axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterAdmin() {

    const [email, setEmail] = useState<String>('');
    const [username , setUsername] = useState<String>('');
    const [password , setPassword] = useState<String>('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        
        const response = await axiosInstance.post('/api/register-admin', {
            email,
            username,
            password
        });
        console.log(response.data);

        setUsername('');
        setEmail('');
        setPassword('');

        router.push('/login');
    } catch (error) {
        console.log(error);
    } 
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email as string} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Username" value={username as string} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password as string} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

