import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

type AuthCardProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: () => void;
  isLoading: boolean;
  inputs: {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  error?: string;
  footerText: string;
  footerLinkText: string;
  onFooterClick: () => void;
};

const AuthCard = ({
  title,
  subtitle,
  buttonText,
  onSubmit,
  isLoading,
  inputs,
  error,
  footerText,
  footerLinkText,
  onFooterClick,
}: AuthCardProps) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg ">
        {/* Header Section */}
        <CardHeader className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Squad Sync
          </h1>
          <h1 className="text-2xl sm:text-3xl mt-2 sm:mt-3 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm my-2 sm:mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            {subtitle}
          </p>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-3"
          >
            <FcGoogle size={18} /> Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-3"
          >
            <FaApple size={18} /> Continue with Apple
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-5">
          {/* Social Login Buttons */}

          {/* OR Separator */}
          <div className="relative flex items-center justify-center my-10">
            <Separator className="w-full" />
            <span className="absolute bg-white dark:bg-gray-800 px-2 sm:px-3 text-xs sm:text-sm text-gray-500 font-medium">
              OR
            </span>
          </div>

          {/* Dynamic Inputs */}
          {inputs.map((input, index) => (
            <Input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              onChange={input.onChange}
              className="py-2 sm:py-3 text-sm sm:text-md"
            />
          ))}

          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full py-2 sm:py-3 text-sm sm:text-md font-semibold tracking-wide"
          >
            {isLoading ? "Processing..." : buttonText}
          </Button>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* Footer Link */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
            {footerText}{" "}
            <span
              className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline transition"
              onClick={onFooterClick}
            >
              {footerLinkText}
            </span>
          </p>
        </CardContent>
      </div>
    </div>
  );
};

export default AuthCard;
