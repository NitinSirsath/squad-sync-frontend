import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GeneralSettings = () => {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">
          Here you can configure general settings.
        </p>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
