"use client"

import { axiosInstance } from "@/lib/axios";
import React, { useState } from "react";
import styles from './register.module.css'
import { useRouter } from "next/navigation";
import Link from "next/link";


const RegisterForm : React.FC = () => {
    const [username , setUsername ] = useState<string>('');
    const [email , setEmail ] = useState <string>('');
    const [password , setPassword ] = useState <string>('');
    const router = useRouter();

    const handleSubmit1 = async (e: React.FormEvent) => {    
        e.preventDefault();

        try { 
            const response = await axiosInstance.post('/api/register', { 
                username, email, password
            });
            console.log(response.data);

            setUsername('');
            setEmail('');
            setPassword('');

            router.push('/login') // Send to login page
        } catch (error) { 
            console.log ( ' Failed to create account ' , error); 
        }
    }
    return (
        <div className={styles.container}>
            <div>
                <h2>Register</h2>
            </div>
            <form onSubmit={handleSubmit1}>
                <div className={styles.input_container}>
                    Username
                    <input className={styles.textarea} value={username} onChange={(e) => setUsername (e.target.value)}></input>
                </div>
                <div className={styles.input_container}>
                    Email
                    <input className={styles.textarea} value={email} onChange={(e) => setEmail (e.target.value)}></input>
                </div>
                <div className={styles.input_container}>
                    Password
                    <input className={styles.textarea} type="password" value={password} onChange={(e) => setPassword (e.target.value)} ></input>
                </div>
                <button className={styles.button}type="submit">Register</button>
            </form>
            <div className={styles.desc}>
                <a>Already have an account? </a>
                <Link href={'/login'} className={styles.link}>Log in</Link>
            </div>
        </div>
    ) 
}

export default RegisterForm; 