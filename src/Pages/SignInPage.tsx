import "./SignInPage.css";
import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h1 className="sign-in-title">Hi App</h1>
      <form action="" className="sign-in-form">
        <h2>Sign In</h2>
        <label htmlFor="">
          Email:
          <input type="text" placeholder="write your email here" />
        </label>
        <label htmlFor="">
          Password:
          <input type="text" placeholder="password" />
        </label>
      </form>
      <h3>
        Don't have an account?
        <Link className="sign-up-link" to={"/Sign-Up"}>
          Sign Up
        </Link>
        chat link here: <Link to={"/chat-page"}>Chat</Link>
      </h3>
    </div>
  );
}
