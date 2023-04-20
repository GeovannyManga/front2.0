import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/Login.scss";
import { SweetFailedLogin } from "../components/Sweet";

const validate = (state) => {
  const error = {};

  // const validEmail =
  //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!state.email.length) {
    error.email = "You must enter a email addres";
  }

  // if (validEmail.test(state.email)) {
  //   error.email = "You must enter a valid email addres";
  // }

  if (!state.password.length) {
    error.password = "You must write a password";
  }

  return error;
};

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);

  const errors = validate(user);

  const [blur, setBlur] = useState({});

  const formValid = Object.keys(errors).length === 0;

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate(); // Es un Hook que se puede usar para controlar el redirect a otra página
  const [error, setError] = useState(); // Con este estado se puede controlar los errores generados al momento de registrarse un nuevo usuario

  const [info, setInfo] = useState(); // Con este estado se puede controlar los erros generados al momento de registrarse un nuevo usuario

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUser({
      ...user,
      [property]: value,
    });
  };

  // Login con usuario y contraseña
  const submitHandle = async (event) => {
    event.preventDefault();

    if (formValid) {
      try {
        await login(user.email, user.password);
        navigate("/"); // Al registrarse un usuario, se redirecciona al Home
      } catch (error) {
        setError(error.message);
      }
    } else {
      setBlur({
        ...blur,
        email: true,
        password: true,
      });
      SweetFailedLogin();
    }
  };

  // login con Google
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Para recuperar la contraseña
  const handleResetPassword = async () => {
    if (!user.email) setError("Please enter your email");

    try {
      await resetPassword(user.email);
      setError("");
      setInfo("We sent you an email with a link to reset you password");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBlur = (event) => {
    setBlur({
      ...blur,
      [event.target.name]: true,
    });
  };

  return (
    <div>
      <section className="">
        <div className="columns-login">
          <div className="image-container">
            <Link to="/home">
              <button className="back">Back to home</button>
            </Link>
          </div>

          <div className="txt-container">
            <div>
              <h1>Log In</h1>
            </div>

            <div>
              <button
                className="button-sign-google"
                onClick={handleGoogleSignIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                Continue with Google
              </button>
              <p className="or">- OR -</p>
            </div>

            <div className="form">
              <div className="message-alert">
                {error && <p className="error">{error}</p>}

                {info && <p className="info">{info}</p>}
              </div>

              <form className="login-form" onSubmit={submitHandle}>
                <div>
                  <div className="input-content">
                    <label>Email: </label>
                    <input
                      name="email"
                      type="email"
                      onChange={changeHandler}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && blur.email && (
                    <p className="error">{errors.email}</p>
                  )}

                  <div className="input-content">
                    <label>Password: </label>
                    <input
                      name="password"
                      type="password"
                      onChange={changeHandler}
                      onBlur={handleBlur}
                    />
                    {errors.password && blur.password && (
                      <p className="error">{errors.password}</p>
                    )}
                    <a
                      className="pass-reset"
                      href="#!"
                      onClick={handleResetPassword}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <div className="buttom-form">
                    <button>Log in</button>
                  </div>
                </div>
              </form>
            </div>

            <div>
              Don't have an account?
              <Link to="/loginCreate"> Create account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
