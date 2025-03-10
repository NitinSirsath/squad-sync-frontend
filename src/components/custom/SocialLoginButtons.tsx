import { Button } from "@/components/ui/button";

type SocialLoginButtonsProps = {
  isLoading: boolean;
  onSocialLogin: (provider: "google" | "apple") => void;
};

export const SocialLoginButtons = ({
  isLoading,
  onSocialLogin,
}: SocialLoginButtonsProps) => {
  return (
    <div className="space-y-3">
      <Button
        onClick={() => onSocialLogin("google")}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Logging in..." : "Continue with Google"}
      </Button>
      <Button
        onClick={() => onSocialLogin("apple")}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Logging in..." : "Continue with Apple"}
      </Button>
    </div>
  );
};
