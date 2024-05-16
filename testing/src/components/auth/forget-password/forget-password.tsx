import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import styles from './forget-password.module.css'

const FormForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/forget-password', { email });
            setMessage('Message sent. Check your inbox for the reset link.');

        } catch (error) {
            setMessage('Failed to send mail. Please try again.');
            console.error('Error sending email : ', error);
        }
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>

    )
}

export default FormForgetPassword;