import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      if (user && user.email === values.email) {
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-black shadow-md rounded-lg mx-2 px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <p className="text-center my-2 text-lg font-semibold text-white">
            Access Your Account 🔐🚀
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-md font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm my-1 italic font-semibold">
              {formik.errors.email}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-md font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm my-1 italic font-semibold">
              {formik.errors.password}
            </p>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-sm my-1 italic font-semibold">
            {error}
          </p>
        )}
        <div className="mb-6 flex justify-center text-white divide-x-2 gap-2 font-medium">
          <p>Don't have an account?</p>
          <div className="divide-x">
            <Link to="/signup" className="hover:underline px-2 font-bold">
              SignUp
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#553fff] w-full hover:bg-[#3d3bb7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In 😊
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
