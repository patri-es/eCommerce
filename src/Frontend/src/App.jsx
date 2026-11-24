import Person from "./components/person/Person"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { useEffect, useState } from "react"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import { Routes, Route } from "react-router"
import { Toaster } from "react-hot-toast"
import Product from "./components/product/Product"
import Category from "./components/categories/Category"
import authenticationService from "./services/authenticationService"
import LoginModal from "./components/authentication/LoginModal"

const App = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        authenticationService.refreshToken().catch(error => {
            console.error("Error initializing CSRF protection:", error)
        })
    }, [])
    return (
        <>
            <Navbar
                currentUser={currentUser}
                onLoginClick={() => setIsLoginOpen(true)}
            />
            <Routes>
                <Route index element={<Home /> } />
                <Route path="about" element={<About /> } />
                <Route path="person" element={<Person /> } />
                <Route path="product" element={<Product /> } />
                <Route path="category" element={<Category /> } />
                <Route path="*" element={<NotFound /> } />
            </Routes>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLoginSuccess={setCurrentUser}
            />

            <Toaster />
        </>
    )    
}

export default App