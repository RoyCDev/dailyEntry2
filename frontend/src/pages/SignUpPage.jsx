import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Brand from "../components/common/Brand"

function SignUpPage() {
    const [page, setPage] = useState(1)
    const [formFields, setFormFields] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: signUp } = useMutation({
        mutationFn: async () => {
            try {
                const request = await fetch("/api/v1/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formFields)
                })
                const data = await request.json()
                if (!request.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            }
            catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            navigate("/")
        },
        onError: (error) => toast.error(error.message)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formFields)
    }

    return (
        <div className="hero-bg h-screen bg-cover bg-center flex justify-center items-center">
            {/* Container */}
            <div className="bg-base-100/80 text-base-content rounded-xl px-8 py-16 flex w-sm md:w-2xl items-center">
                {/* Left side - image */}
                <div className="hidden md:flex flex-1 opacity-75">
                    <img src="/journal.png" className="-translate-x-5" />
                </div>
                {/* Right side - sign up form, broken into 2 sections */}
                <div className="flex-1">
                    <Brand />
                    <p className="text-3xl font-extralight mt-1 mb-6">
                        Sign Up
                        <span className="text-base ml-2">{page}/2</span>
                    </p>
                    {page === 1 &&
                        <form>
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
                                <label className="fieldset-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="input w-full"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formFields.email}
                                    onChange={handleChange}
                                />

                                <p>Already have an acocunt? {""}
                                    <Link to="/login" className="underline">Login</Link>
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-primary mt-8"
                                    onClick={() => setPage(2)}
                                >
                                    Next
                                </button>
                            </fieldset>
                        </form>
                    }
                    {page === 2 &&
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
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
                                <label className="fieldset-label" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    className="input w-full"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formFields.confirmPassword}
                                    onChange={handleChange}
                                />

                                <p>Already have an acocunt? <Link to="/login" className="underline">Login</Link></p>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline btn-primary mt-8 flex-1"
                                        onClick={() => setPage(1)}
                                    >
                                        Previous
                                    </button>
                                    <button className="btn btn-primary mt-8 flex-1">
                                        Sign Up
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;