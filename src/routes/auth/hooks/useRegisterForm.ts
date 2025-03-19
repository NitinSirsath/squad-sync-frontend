import { UserRegisterFormType } from "@/types/user.types";
import { useToastStore } from "@/services/stores/toast/useToastStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/auth/useAuth";

const useRegisterForm = () => {
  const { mutate, error } = useRegister();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const handleFeature = () => {
    showToast("Feature is in development");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<UserRegisterFormType>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // ✅ Validation State
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // ✅ Email Validation Function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Handle Register with Validation
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };

    // ✅ Validate Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // ✅ Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    // ✅ Validate Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    // ✅ Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    // ✅ Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return; // Stop submission if validation fails

    // ✅ Proceed with API Call
    mutate(formData, {
      onSuccess: () => navigate("/login"),
    });
  };
  return {
    handleRegister,
    navigate,
    error,
    formData,
    setFormData,
    errors,
    showPassword,
    setShowPassword,
    handleFeature,
  };
};

export default useRegisterForm;
