import {
  Users,
  Lock,
  MessageSquare,
  LayoutDashboard,
  Search,
  Bell,
  PhoneCall,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "User Authentication",
    description:
      "Secure login and registration with JWT-based authentication, including OAuth support for quick access.",
  },
  {
    icon: Lock,
    title: "Team & Workspace Management",
    description:
      "Create workspaces for teams or projects with role-based access control and multiple channels.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Messaging",
    description:
      "1:1 and group messaging with threaded conversations, mentions, and notifications for better engagement.",
  },
  {
    icon: LayoutDashboard,
    title: "Modern UI & User Experience",
    description:
      "Inspired by Slack with a clean, modern design using ShadCN/UI, including dark and light mode support.",
  },
  {
    icon: Search,
    title: "Search & Message History",
    description:
      "Advanced search functionality for quick access to messages and files, with message history retention.",
  },
  {
    icon: Bell,
    title: "Notifications & Alerts",
    description:
      "Real-time alerts for new messages and mentions, with future push notification enhancements.",
  },
  {
    icon: PhoneCall,
    title: "Voice & Video Calls (Future)",
    description:
      "Future integration with WebRTC for seamless voice and video communication.",
  },
  {
    icon: Bot,
    title: "AI-Powered Chatbot (Future)",
    description:
      "Future AI-powered chatbot assistant for automation and enhanced user experience.",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-12 xs:py-20 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Core Features
      </h2>
      <div className="w-full max-w-(--breakpoint-lg) mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
