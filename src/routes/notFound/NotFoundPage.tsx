import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md text-center p-6 shadow-lg bg-white dark:bg-gray-800">
          <CardContent>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              404 - Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              The page you’re looking for doesn’t exist.
            </p>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
