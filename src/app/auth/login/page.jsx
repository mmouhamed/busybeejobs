"use client"

import React, { useState } from 'react';
import './LoginCard.css';
import { login } from '../../../../actions/login';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("")
    setSuccess("")

    startTransition(() => {
      login(email, password)
        .then((data) => {
          if (data) {
            setError(data.error)
            setSuccess(data.success)
          }
          window.location.reload()
        });
    })
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          disabled={isPending}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          disabled={isPending}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit" disabled={isPending}>Login</button>
        {error && (
          <div className={'error'}>
            {error}
          </div>
        )}
        {success && (
          <div className={'success'}>
            {success}
          </div>
        )}

        <div className="dont-have-account">
           <span>Don&apos;t have an account? <a href="/auth/signup">Sign up</a></span>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
