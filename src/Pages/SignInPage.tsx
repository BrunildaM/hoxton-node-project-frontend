import "./SignInPage.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";
import { useEffect, useState } from "react";
import io from "socket.io-client";

type Props = {
  signIn: (data: any) => void;
};

export default function SignInPage({ signIn }: Props) {
  
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    const socket = io("ws://localhost:4555");
    setSocket(socket);
    console.log(socket);
    socket.on("message", (messages) => {
      setMessages(messages);
    });
  }, []);

  return (
    <div className="sign-in-page">
      <h1 className="sign-in-title">Hi App <img className="logo" src="https://play-lh.googleusercontent.com/jI-MNIYkb1QXGrgNoSiuRn8PdBRrqd-cW3krfuhoSr0HH-w-Gu40C0BFwlNfYekhMC4" alt="" /></h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:5000/sign-in", {
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
                console.log(data.error);
              } else {
                signIn(data);
                navigate("/chat-page");
              }
            });
        }}
        className="sign-in-form"
      >
        <h2>Sign In</h2>
        <label>
          Email:
          <input type="email" placeholder="Email" name="email" required />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
        </label>

        <button>SIGN IN</button>
      </form>
      <h3>
        Don't have an account?
        <Link className="sign-up-link" to={"/Sign-Up"}>
          Sign Up
        </Link>
        {/* chat link here: <Link to={"/chat-page"}>Chat</Link> */}
      </h3>
    </div>
  );
}
