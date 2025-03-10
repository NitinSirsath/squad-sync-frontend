import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/auth/useAuth";

const Register = () => {
  const { mutate, status, error } = useRegister();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "super-user22",
    email: "nitinsirsath22@gmail.com",
    password: "12345678",
    firstName: "Nitin22",
    lastName: "Sirsath",
  });

  const handleRegister = () => {
    mutate(formData, { onSuccess: () => navigate("/login") });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] p-6 shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold">Register</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <Button
            onClick={handleRegister}
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Registering..." : "Register"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
