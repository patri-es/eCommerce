
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import authenticationService from "../../services/authenticationService"
import { getErrorMessage } from "../../utils/errorHelper"

const LoginForm = ({ onSuccess }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (credentials) => {
        try {
            const user = await authenticationService.login(credentials)

            toast.success("Sesión iniciada correctamente")

            onSuccess(user)

        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Correo electrónico
                </label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@email.com"
                    {...register("email", {
                        required: "El correo electrónico es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Introduce un correo electrónico válido"
                        }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Contraseña
                </label>

                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Introduce tu contraseña"
                    {...register("password", {
                        required: "La contraseña es obligatoria"
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

        </form>
    )
}

export default LoginForm
