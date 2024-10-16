import { useEffect, useState } from "react";
import "./App.css";
import { authClient } from "./better-auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/user", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>Better Auth Client</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => authClient.signIn.email}>Login</button>
      <button
        onClick={() =>
          authClient.signUp.email(
            {
              email: email,
              password: password,
              name: name,
              image: "image",
            },
            {
              onSuccess: (ctx) => {
                console.log("Success", ctx);
              },
            },
          )
        }
      >
        Sign Up
      </button>
    </>
  );
}

export default App;
