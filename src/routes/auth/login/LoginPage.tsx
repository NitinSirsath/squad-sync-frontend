// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLogin } from "@/hooks/auth/useAuth";
// import AuthCard from "../components/AuthCard";
import { LoginForm } from "./LoginForm";

const Login = () => {
  //   const { mutate, status, error } = useLogin();
  //   const navigate = useNavigate();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   const handleLogin = () => {
  //     mutate(
  //       { email, password },
  //       {
  //         onSuccess: () => {
  //           navigate("/create-organization");
  //         },
  //       }
  //     );
  //   };

  return (
    // <AuthCard
    //   title="Sign in to Squad Sync"
    //   subtitle="Use your work email to continue"
    //   buttonText="Sign In"
    //   onSubmit={handleLogin}
    //   isLoading={status === "pending"}
    //   inputs={[
    //     {
    //       type: "email",
    //       placeholder: "Enter your email",
    //       value: email,
    //       onChange: (e) => setEmail(e.target.value),
    //     },
    //     {
    //       type: "password",
    //       placeholder: "Enter your password",
    //       value: password,
    //       onChange: (e) => setPassword(e.target.value),
    //     },
    //   ]}
    //   error={error?.message}
    //   footerText="Don't have an account?"
    //   footerLinkText="Register"
    //   onFooterClick={() => navigate("/register")}
    // />
    <LoginForm />
  );
};

export default Login;
