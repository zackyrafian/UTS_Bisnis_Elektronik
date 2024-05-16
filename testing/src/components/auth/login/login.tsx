"use client"
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css"

const LoginForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/login', {
                usernameOrEmail, password
            });
            const { token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', usernameOrEmail);

            router.push('/dashboard');

        } catch (error) {
            // setError(error.response.data.message);
            setError('');
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <h2>Welcome Back</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_container}>
                    <a className={styles.input_title}>Username</a>
                    <input type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                    <a>Password</a>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className={styles.button} type="submit">Login</button>
            </form>
            <div>
                <Link href={'/forget-password'}className={styles.link}>Forget Password?</Link>
            </div>
            <div>
                <a>New on out platform? </a>
                <Link href={'/register'} className={styles.link}>Create an account</Link>
            </div>
        </div>
    ) 
};

export default LoginForm;