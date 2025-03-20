import {
  Users,
  Lock,
  MessageSquare,
  LayoutDashboard,
  Search,
  Bell,
} from "lucide-react";

const faq = [
  {
    icon: Users,
    question: "How do I invite users to my workspace?",
    answer:
      "Go to your workspace settings, click on 'Create User', and enter the email addresses of the users you want to invite.",
  },
  {
    icon: Lock,
    question: "Is my data secure on Squad Sync?",
    answer:
      "Yes, we use industry-standard encryption and security practices to protect your data. Your privacy is our top priority.",
  },
  {
    icon: MessageSquare,
    question: "Can I create different channels within a workspace?",
    answer:
      "Absolutely! You can create multiple channels based on different topics or teams to keep your conversations organized.",
  },
  {
    icon: LayoutDashboard,
    question: "Is there a mobile app for Squad Sync?",
    answer:
      "Currently, Squad Sync is accessible through web browsers. We are working on mobile apps for future releases.",
  },
  {
    icon: Search,
    question: "How do I search for messages or files?",
    answer:
      "Use the search bar at the top of the interface to quickly find messages, files, and users across your workspaces.",
  },
  {
    icon: Bell,
    question: "How do I manage notifications?",
    answer:
      "You can customize your notification settings in your profile preferences to control when and how you receive alerts.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-20"
    >
      <div className="max-w-(--breakpoint-lg)">
        <h2 className="text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-bold tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Quick answers to common questions about Squad Sync.
        </p>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline-[1px] outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
