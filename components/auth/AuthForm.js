import { useState, useRef } from "react";
import styles from "./AuthForm.module.scss";

const createUser = async (email, password, currentTime) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, currentTime }),
    header: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something wwent wrong.");
  }

  return data;
};

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // TODO optional : add validation
    if (!enteredEmail || !enteredEmail.includes("@")) {
      console.log("You have typed in an Invalid Email address");
      throw new Error("please check your email");
    }
    if (!enteredPassword || enteredPassword.trim().length < 7) {
      console.log("password too short");
      throw new Error("please check your password");
    }

    var currentTime = new Date().toISOString();

    console.log(emailInputRef.current.value);

    if (isLogin) {
      // login useer
    } else {
      // create new user
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        currentTime
      );
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>

        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>

          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
