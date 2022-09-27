import "./SignUpPage.css";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <h1 className="sign-up-title">Hi App</h1>
      <form action="" className="sign-up-form">
        <h2>Sign Up</h2>
        <label htmlFor="">
          Email:
          <input type="email" />
        </label>
        <label htmlFor="">
          Password:
          <input type="password" />
        </label>
      </form>
      <h3>
        Already have an account?
        <Link className="sign-in-link" to={"/Sign-In"}>
          Log In
        </Link>
        here.
      </h3>
    </div>
  );
}
