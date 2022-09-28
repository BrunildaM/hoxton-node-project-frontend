import "./SignUpPage.css";
import { Link } from "react-router-dom";

export default function SignUpPage(signIn: any) {
  return (
    <div className="sign-up-page">
      <h1 className="sign-up-title">Hi App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:4000/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // @ts-ignore
              email: e.target.email.value,
              // @ts-ignore
              password: e.target.password.value,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              // data = {user,token}
              if (data.error) {
                alert(data.error);
              } else {
                signIn(data);
              }
            });
        }}
        className="sign-up-form"
      >
        <h2>Sign Up</h2>
        <label htmlFor="">
          Email:
          <input type="email" name="email" />
        </label>
        <label htmlFor="">
          Password:
          <input type="password" name="password" />
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
