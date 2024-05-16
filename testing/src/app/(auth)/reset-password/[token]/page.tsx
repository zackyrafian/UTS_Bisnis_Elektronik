"use client"
import React, { useState } from 'react';
import { axiosInstance } from '@/lib/axios';

interface TokenData {
  token: string;
  timestamp: number;
}

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/reset-password/:token', {
        token,
        newPassword,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* New password input field */}
      <input type="password" name="newPassword" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

      <button type="submit">Reset Password</button>
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default ResetPassword;
