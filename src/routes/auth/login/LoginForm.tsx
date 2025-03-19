import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth/useAuth";
import { useToastStore } from "@/services/stores/toast/useToastStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate, status, error } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToastStore();

  const handleFeature = () => {
    showToast("Feature is in development");
  };

  // ✅ Validation State
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ✅ Email Validation Function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Handle Login with Validation
  const handleLogin = () => {
    let isValid = true;

    // ✅ Validate Email
    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // ✅ Validate Password
    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return; // Stop submission if validation fails

    // ✅ Proceed with API Call
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/create-organization");
        },
      }
    );
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="flex flex-col gap-6">
              {/* Logo & Heading */}
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">Squad Sync</span>
                </a>
                <h1 className="text-xl font-bold">Welcome to Squad Sync</h1>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a
                    onClick={() => navigate("/register")}
                    className="underline underline-offset-4 cursor-pointer"
                  >
                    Sign up
                  </a>
                </div>
              </div>

              {/* Error Message from API */}
              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error.message}
                </p>
              )}

              {/* Input Fields */}
              <div className="grid gap-4">
                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs">{emailError}</p>
                  )}
                </div>

                {/* Password Input with Show/Hide Toggle */}
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pr-10 ${passwordError ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 top-5 flex items-center "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {passwordError && (
                    <p className="text-red-500 text-xs">{passwordError}</p>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? "Processing..." : "Login"}
                </Button>
              </div>

              {/* OR Separator */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>

              {/* Social Logins */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  onClick={handleFeature}
                  variant="outline"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button
                  onClick={handleFeature}
                  variant="outline"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0Z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
          <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
