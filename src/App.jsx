import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(user);
    });

    return () => unsubscribe();
  }, [user]);
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setRegisterEmail("");
      setRegisterPassword("");
      toast.success("Registration Successfull");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Please use a different email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email id");
      } else if (error.code === "auth/weak-password")
        toast.warning("Password should be at least 6 characters");
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setLoginEmail("");
      setLoginPassword("");
      toast.success("User Logged in Successfull");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully Logged out");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="h-max flex flex-col mt-11 mb-8 p-6 max-w-sm mx-auto border border-spacing-28 border-purple-500 rounded-xl">
      <div className="mb-5">
        <label
          htmlFor="registerEmail"
          className="block mb-2 text-sm font-medium text-fuchsia-600 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="registerEmail"
          value={registerEmail}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter your email...."
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="registerPassword"
          className="block mb-2 text-sm font-medium text-fuchsia-600 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="registerPassword"
          value={registerPassword}
          placeholder="Enter Your password...."
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
      </div>

      <button
        type="button"
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-fit"
        onClick={register}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Register
        </span>
      </button>

      <div className="h-7 m-14 text-fuchsia-600">
        Already have an account? Login 👇🏻
      </div>

      <div className="mb-2">
        <label
          htmlFor="loginEmail"
          className="block mb-2 text-sm font-medium text-fuchsia-600 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="loginEmail"
          value={loginEmail}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter your email...."
          onChange={(event) => setLoginEmail(event.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="loginPassword"
          className="block mb-2 text-sm font-medium text-fuchsia-600 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="loginPassword"
          value={loginPassword}
          placeholder="Enter Your password...."
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(event) => setLoginPassword(event.target.value)}
        />
      </div>

      <button
        type="button"
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-fit"
        onClick={login}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Login
        </span>
      </button>

      <div className="h-6"></div>

      <div className="mb-2">
        <label
          htmlFor="loggedInEmail"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          User Logged-in
        </label>
        <p className="mb-3 text-fuchsia-600">user: {user?.email || "No one"}</p>
        <button
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-fit"
          onClick={logout}
        >
          <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Logout
          </span>
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </form>
  );
};

export default App;
