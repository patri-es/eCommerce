
import { X } from "lucide-react"
import LoginForm from "./LoginForm"

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {

    if (!isOpen) return null

    const handleSuccess = (user) => {
        onLoginSuccess(user)
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    onClose()
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-title"
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
            >
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar ventana"
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                    <X className="size-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2
                        id="login-title"
                        className="text-2xl font-bold text-gray-800"
                    >
                        Iniciar sesión
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Accede a tu cuenta
                    </p>
                </div>

                {/* Form */}
                <LoginForm onSuccess={handleSuccess} />

            </div>
        </div>
    )
}

export default LoginModal
