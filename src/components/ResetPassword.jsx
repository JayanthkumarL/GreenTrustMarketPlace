import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ResetPassword.css';

function ResetPassword() {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/reset-password-request', { email });
      alert('Reset token logged to console (mock email). Enter it below.');
      setStep('reset');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/reset-password', { token, newPassword });
      alert('Password reset! Log in with new password.');
      window.location.href = '/login';
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        {step === 'request' ? (
          <>
            <h2>Reset Password</h2>
            <form onSubmit={handleRequest}>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit">Request Reset</button>
            </form>
          </>
        ) : (
          <>
            <h2>Enter New Password</h2>
            <form onSubmit={handleReset}>
              <input type="text" placeholder="Enter reset token" value={token} onChange={(e) => setToken(e.target.value)} required />
              <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              <button type="submit">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;