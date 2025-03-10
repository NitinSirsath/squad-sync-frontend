import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useAuth";

const Login = () => {
  const { mutate, status, error } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("nitinsirsath@gmail.com");
  const [password, setPassword] = useState("12345678");

  const handleLogin = () => {
    mutate({ email, password }, { onSuccess: () => navigate("/dashboard") });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] p-6 shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
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
          <Button
            onClick={handleLogin}
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Logging in..." : "Login"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
