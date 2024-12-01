"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";

type LoginBody = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginComponent = ({
  setIsUserConnected,
}: {
  setIsUserConnected: (state: boolean) => void;
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    submit?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors: {
      email?: string;
      password?: string;
      submit?: string;
    } = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formValidity = validateForm();
    if (!formValidity) {
      console.log(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify(formData),
        method: "POST",
      });
      if (!response.ok) {
        setErrors({
          submit: "Erreur de connexion. Veuillez réessayer.",
        });
        return;
      }
      const data = await response.json();
      localStorage.setItem("dpToken", JSON.stringify(data.token));
      localStorage.setItem("dpUser", JSON.stringify(data.data));
      setIsUserConnected(true);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);

      setErrors({
        submit: "Erreur de connexion. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border 
                  ${
                    errors.email && errors.email.length > 0
                      ? "border-red-300"
                      : "border-gray-300"
                  }
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && errors.email.length > 0 ? (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              ) : (
                false
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border 
                  ${
                    errors.password && errors.password.length > 0
                      ? "border-red-300"
                      : "border-gray-300"
                  }
                  placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.password && errors.password.length > 0 ? (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              ) : (
                false
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Mot de passe oublié?
              </a>
            </div>
          </div>

          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{errors.submit}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                false
              )}
              Se connecter
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
