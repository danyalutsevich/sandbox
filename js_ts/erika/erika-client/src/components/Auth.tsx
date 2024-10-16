import { useState } from "react";
import { sp } from "../client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createAccount = async () => {
    const res = await sp.user.cmdS("create_account", {
      email: email,
      password: password,
      role: "user",
    });
    console.log(res);
  };

  const login = async () => {
    const res = await sp.user.cmdS("login", {
      email: email,
      password: password,
    });
    sp.user.setJwt(res.accessToken);
    localStorage.setItem("userId", JSON.stringify(res.userId));
    console.log(res);
  };

  const checkAuth = async () => {
    const res = await sp.user.checkJwt();
    console.log(res);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>Auth</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-2">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <CardFooter className="space-x-1">
        <Button onClick={createAccount}>Create Account</Button>
        <Button onClick={login}>Login</Button>
        <Button onClick={checkAuth}>Check Auth</Button>
      </CardFooter>
    </Card>
  );
}
