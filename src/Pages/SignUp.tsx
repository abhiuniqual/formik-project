import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().test(function (value) {
    const { lastName } = this.parent;
    if (
      !(value && value.trim() !== "") &&
      (!lastName || lastName.trim() === "")
    ) {
      throw new Yup.ValidationError(
        "Either First Name or Last Name is required",
        value,
        "firstName"
      );
    }
    return true;
  }),
  lastName: Yup.string().test(function (value) {
    const { firstName } = this.parent;
    if (
      !(value && value.trim() !== "") &&
      (!firstName || firstName.trim() === "")
    ) {
      throw new Yup.ValidationError(
        "Either First Name or Last Name is required",
        value,
        "lastName"
      );
    }
    return true;
  }),
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
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      const signUpDetails = {
        name: values.firstName || values.lastName,
        email: values.email,
      };
      login(signUpDetails);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", values.firstName || values.lastName);
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
            Create Your Account 🔓
          </p>
        </div>
        <div className="mb-4 ">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <label
                className="block text-white text-md font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                className="block text-white text-md font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
          </div>
          {(!formik.touched.firstName && !formik.touched.lastName) ||
            (formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm my-1 italic font-semibold">
                {formik.errors.firstName}
              </p>
            )) ||
            (formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm my-1 italic font-semibold">
                {formik.errors.lastName}
              </p>
            ))}
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
        <div className="mb-6 flex justify-center text-white divide-x-2 gap-2 font-medium">
          <p>Already have an account?</p>
          <div className="divide-x">
            <Link to="/signin" className="hover:underline px-2 font-bold">
              SignIn
            </Link>
          </div>
        </div>
        <button
          className="bg-[#553fff] w-full hover:bg-[#3d3bb7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up 🤗
        </button>
      </form>
    </div>
  );
};

export default SignUp;
