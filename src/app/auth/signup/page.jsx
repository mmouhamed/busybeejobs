"use client";

import React, { useState } from "react";
import { useTransition } from "react";
import { signup } from '../../../../actions/signup';
import styles from './SignUpCard.css'

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("")
    setSuccess("")

    startTransition(() => {
      signup(name, email, password)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        });
    })
  };

  return (
    <div className='sign-up-card'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            disabled={isPending}
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>
        <label>
          Email:
          <input
            disabled={isPending}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        <label>
          Password:
          <input
            disabled={isPending}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <button type="submit" disabled={isPending}>Sign Up</button>
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

        <div className="already-have-account">
          <span>Already have an account? <a href="/auth/login">Log in</a></span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
