import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login"

function App() {
  // const user = {
  //   username: "browses",
  //   profileImg: ""
  // }

  const user = false

  return (
    <Routes>
      <Route path="/" element={<RootLayout user={user} />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
