import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

import Brand from "../components/common/Brand";
import { loginSchema } from "shared"

function LoginPage() {
    const [formFields, setFormFields] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: login, isPending } = useMutation({
        mutationFn: async () => {
            const request = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formFields)
            })
            const data = await request.json()
            if (!request.ok) {
                throw data.error.name === "ZodError" ?
                    data.error :
                    new Error(data.error || "Something went wrong")
            }
            return data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["authUser"] })
            navigate("/")
        },
        onError: (error) => {
            error.issues ?
                error.issues.forEach(e => toast.error(e.message)) :
                toast.error(error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            loginSchema.parse(formFields)
            login(formFields)
        }
        catch (error) {
            error.issues.forEach(e => toast.error(e.message))
        }
    }

    return (
        <div className="hero-bg h-screen bg-cover bg-center flex justify-center items-center">
            {/* Container */}
            <div className="bg-base-100/80 text-base-content rounded-xl px-8 py-16 flex w-sm md:w-2xl items-center">
                {/* Left side - image */}
                <div className="hidden md:flex flex-1 opacity-75">
                    <img src="/journal.png" className="-translate-x-5" />
                </div>
                {/* Right side - login form */}
                <div className="flex-1">
                    <Brand />
                    <p className="text-3xl font-extralight mt-1 mb-6">Login</p>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className="fieldset-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="input w-full"
                                type="text"
                                name="username"
                                id="username"
                                value={formFields.username}
                                onChange={handleChange}
                            />
                            <label className="fieldset-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="input w-full"
                                type="password"
                                name="password"
                                id="password"
                                value={formFields.password}
                                onChange={handleChange}
                            />

                            <p>Don&#39;t have an acocunt? {""}
                                <Link to="/signup" className="underline">Create One</Link>
                            </p>
                            <button
                                className="btn btn-primary mt-8"
                                disabled={isPending}
                            >
                                Login
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;