import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CustomToastContainer from "./services/toastContainer/CustomToastContainer";
import SignupForm from "./pages/SignUp.jsx";
import LoginForm from "./pages/Login.jsx";

function App() {

  return (
    <>
      <Navbar />
      <main className="min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<LoginForm />} />
        </Routes>
      </main>

        <CustomToastContainer />
    </>
  )
}

export default App
