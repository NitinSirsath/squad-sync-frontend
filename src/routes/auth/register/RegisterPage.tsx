import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/auth/useAuth";
import AuthCard from "../components/AuthCard";
import { UserRegisterFormType } from "@/types/user.types";

const Register = () => {
  const { mutate, status, error } = useRegister();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegisterFormType>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleRegister = () => {
    mutate(formData, { onSuccess: () => navigate("/login") });
  };

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Get started with Squad Sync"
      buttonText="Register"
      onSubmit={handleRegister}
      isLoading={status === "pending"}
      inputs={[
        {
          type: "text",
          placeholder: "Username",
          value: formData.username,
          onChange: (e) =>
            setFormData({ ...formData, username: e.target.value }),
        },
        {
          type: "email",
          placeholder: "Email",
          value: formData.email,
          onChange: (e) => setFormData({ ...formData, email: e.target.value }),
        },
        {
          type: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: (e) =>
            setFormData({ ...formData, password: e.target.value }),
        },
        {
          type: "text",
          placeholder: "First Name",
          value: formData.firstName,
          onChange: (e) =>
            setFormData({ ...formData, firstName: e.target.value }),
        },
        {
          type: "text",
          placeholder: "Last Name",
          value: formData.lastName,
          onChange: (e) =>
            setFormData({ ...formData, lastName: e.target.value }),
        },
      ]}
      error={error?.message}
      footerText="Already have an account?"
      footerLinkText="Login"
      onFooterClick={() => navigate("/login")}
    />
  );
};

export default Register;
