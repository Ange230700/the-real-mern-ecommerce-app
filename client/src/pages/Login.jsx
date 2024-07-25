import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import login from "../redux/apiCalls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">SIGN IN</h1>
        <form className="login-form">
          <input
            className="login-input"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="login-button"
            onClick={handleClick}
            disabled={isFetching}
          >
            LOGIN
          </button>
          {error && (
            <span className="login-error">Something went wrong...</span>
          )}
          <Link to="/" className="login-link">
            DO NOT YOU REMEMBER THE PASSWORD?
          </Link>
          <Link to="/" className="login-link">
            CREATE A NEW ACCOUNT
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
