import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";

type Props = {
  signIn: (data: any) =>  void
}

export default function SignUpPage({signIn}: Props) {
  const navigate = useNavigate()
  return (
    <div className="sign-up-page">
      <h1 className="sign-up-title">Hi App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:5000/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // @ts-ignore
              email: e.target.email.value,
              // @ts-ignore
              password: e.target.password.value,
              // @ts-ignore
              firstName: e.target.firstName.value,
              // @ts-ignore
              lastName: e.target.lastName.value,
              // @ts-ignore
              avatar: e.target.avatar.value,
              
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              // data = {user,token}
              if (data.error) {
                alert(data.error);
                console.log(data)
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
          <input type="email" name="email" required />
        </label>
        <label htmlFor="">
          Password:
          <input type="password" name="password" required />
        </label>
        <label htmlFor="">
          First name:
          <input type="text" name="firstName" required />
        </label>
        <label htmlFor="">
          Last name:
          <input type="text" name="lastName" required />
        </label>
        <label htmlFor="">
          Avatar:
          <input type="text" name="avatar" required />
        </label>
        
        <button onClick = {() => {
          navigate('/chat-page')

        }}>SIGN UP</button>
      </form>
      <h3>
        Already have an account?
        <Link className="sign-in-link" to={"/LogIn"}>
          Log In
        </Link>
        here.
      </h3>
    </div>
  );
}
