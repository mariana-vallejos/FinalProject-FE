import PopcornImg from "../../assets/img/Popcorn.svg";
import CinemaImg from "../../assets/img/Cinema.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const initialValues: LoginForm = { email: "", password: "" };

  const validationSchema: Yup.ObjectSchema<LoginForm> = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is mandatory"),
    password: Yup.string().required("Password is mandatory"),
  });

  const handleSubmit = async (
    values: LoginForm,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await login(values.email, values.password);

      if (values.email === "admin@cinelog.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login failed", error);
      setErrors({ email: "Invalid credentials" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen mx-auto px-2 bg-primary-bg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="relative w-lg md:px-16 px-2 py-6 bg-white border-2 border-primary rounded-xl shadow-lg">
            <img
              src={CinemaImg}
              alt="cinema icon"
              className="absolute md:-left-12 -left-3 -top-12 md:w-32 w-16"
            />
            <h1 className="text-center text-4xl font-bold py-3">CineLog</h1>
            <p className="font-light text-center py-2">
              Welcome back! Please sign in to your account
            </p>

            <div className="flex flex-col py-2">
              <label htmlFor="email" className="text-md">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="rounded-md border border-primary mb-2 p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="password" className="text-md">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="rounded-md border border-primary mb-2 p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="mx-auto w-full mt-6 mb-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-blue-500 text-white px-10 py-2 rounded-3xl w-full"
              >
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </div>
            <img
              src={PopcornImg}
              alt="cinema icon"
              className="absolute left-5/6 -bottom-10 md:w-32 w-16"
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default LoginPage;
