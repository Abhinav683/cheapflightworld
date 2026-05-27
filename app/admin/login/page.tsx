"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Plane } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch (error) {
      setError("Unable to connect. Please try again.");
      setLoading(false);
    }
  }

  return (
<main className="relative min-h-screen overflow-hidden bg-[#f8fbff] text-slate-900 flex items-center justify-center px-4 py-6">
  {/* Background */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl animate-pulse" />
    <div className="absolute bottom-[-120px] right-[-80px] h-[28rem] w-[28rem] rounded-full bg-cyan-200/40 blur-3xl animate-pulse [animation-delay:2s]" />

    <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>

  {/* Card */}
  <div className="relative z-10 w-full max-w-md">
    <div className="rounded-[2rem] border border-white/70 bg-white/80 px-8 py-7 shadow-[0_20px_80px_rgba(14,165,233,0.12)] backdrop-blur-2xl">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 shadow-lg shadow-sky-300/40">
          <span className="text-xl font-black text-white"><Plane/></span>
        </div>

        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-sky-600">
          Admin Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Username */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Username
          </label>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 transition-all duration-300 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              required
              className="w-full bg-transparent py-3 text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </label>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 transition-all duration-300 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-transparent py-3 text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Error */}
        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-500">
            {error}
          </p>
        ) : null}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(14,165,233,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">
            {loading ? "Signing in..." : "Sign In"}
          </span>

          <div className="absolute inset-0 translate-x-[-120%] bg-white/20 skew-x-12 transition-transform duration-1000 group-hover:translate-x-[200%]" />
        </button>
      </form>
    </div>
  </div>
</main>
  );
}
