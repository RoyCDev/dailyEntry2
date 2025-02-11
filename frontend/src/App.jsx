import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import RootLayout from "./layout/RootLayout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage"
import JournalPage from "./pages/JournalPage/JournalPage";

function App() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const response = await fetch("/api/v1/auth/check");
                const data = await response.json()
                if (!response.ok) throw new Error(data.error || "Something went wrong")
                return data
            } catch (error) {
                return null
            }
        },
        retry: false
    })

    console.log("authUser", user)
    if (isLoading)
        return (
            <div>Loading...</div>
        )

    return (
        <Routes>
            {user ?
                <Route path="/" element={<RootLayout user={user} />}>
                    <Route path="journal" element={<JournalPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
                :
                <>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            }
        </Routes>
    )
}

export default App
