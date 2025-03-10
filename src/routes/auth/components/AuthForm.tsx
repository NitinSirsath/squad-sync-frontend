import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  error?: string;
};

export const AuthForm = ({
  email,
  password,
  setEmail,
  setPassword,
  isLoading,
  onSubmit,
  error,
}: AuthFormProps) => {
  return (
    <div className="space-y-4">
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
      <Button onClick={onSubmit} disabled={isLoading} className="w-full">
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
