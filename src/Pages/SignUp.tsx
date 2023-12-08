import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password") || null], "Passwords must match")
    .required("Required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", values.name);
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="bg-black shadow-md rounded-lg mx-2 px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <p className="text-center my-2 text-lg font-semibold text-white">
            SignUp Here...
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-md font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm my-1 italic font-semibold">
              {formik.errors.name}
            </p>
          )}
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label
            className="block text-white text-md font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm my-1 italic font-semibold">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          className="bg-[#553fff] w-full hover:bg-[#3d3bb7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
