import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import RootLayout from "./layout/RootLayout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage"

function App() {
  const { data: user } = useQuery({
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
  return (
    <>
      <Routes>
        {user ?
          <Route path="/" element={<RootLayout user={user} />}>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          :
          <>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </>
        }
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
