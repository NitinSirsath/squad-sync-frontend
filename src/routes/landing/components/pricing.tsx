"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp } from "lucide-react";
import { useState } from "react";

const tooltipContent = {
  workspaces: "Number of workspaces you can create.",
  users: "Number of users you can invite to your workspaces.",
  storage: "Amount of storage space for file sharing.",
  integrations: "Access to integrations with other tools.",
  guestAccess: "Ability to invite guests with limited access.",
  videoCalls: "Duration of video calls allowed.",
};

const YEARLY_DISCOUNT = 15;
const plans = [
  {
    name: "Basic",
    price: 10,
    description: "Ideal for small teams to start collaborating.",
    features: [
      { title: "1 Workspace", tooltip: tooltipContent.workspaces },
      { title: "10 Users", tooltip: tooltipContent.users },
      { title: "5 GB Storage", tooltip: tooltipContent.storage },
      { title: "Basic Integrations", tooltip: tooltipContent.integrations },
      { title: "Guest Access", tooltip: tooltipContent.guestAccess },
    ],
    buttonText: "Get Started with Basic",
  },
  {
    name: "Standard",
    price: 25,
    isRecommended: true,
    description: "For growing teams needing advanced collaboration features.",
    features: [
      { title: "5 Workspaces", tooltip: tooltipContent.workspaces },
      { title: "50 Users", tooltip: tooltipContent.users },
      { title: "25 GB Storage", tooltip: tooltipContent.storage },
      { title: "Advanced Integrations", tooltip: tooltipContent.integrations },
      { title: "Guest Access", tooltip: tooltipContent.guestAccess },
      { title: "1 Hour Video Calls", tooltip: tooltipContent.videoCalls },
    ],
    buttonText: "Upgrade to Standard",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 50,
    description: "For large teams requiring full collaboration capabilities.",
    features: [
      { title: "Unlimited Workspaces", tooltip: tooltipContent.workspaces },
      { title: "Unlimited Users", tooltip: tooltipContent.users },
      { title: "100 GB Storage", tooltip: tooltipContent.storage },
      { title: "All Integrations", tooltip: tooltipContent.integrations },
      { title: "Guest Access", tooltip: tooltipContent.guestAccess },
      { title: "Unlimited Video Calls", tooltip: tooltipContent.videoCalls },
    ],
    buttonText: "Unlock Premium Features",
  },
];

const Pricing = () => {
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");

  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-center py-12 xs:py-20 px-6"
    >
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-center tracking-tight">
        Pricing
      </h1>
      <Tabs
        value={selectedBillingPeriod}
        onValueChange={setSelectedBillingPeriod}
        className="mt-8"
      >
        <TabsList className="h-11 px-1.5 rounded-full bg-primary/5">
          <TabsTrigger value="monthly" className="py-1.5 rounded-full">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="py-1.5 rounded-full">
            Yearly (Save {YEARLY_DISCOUNT}%)
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-12 max-w-(--breakpoint-lg) mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn("relative border rounded-xl p-6 bg-background/50", {
              "border-[2px] border-primary bg-background py-10": plan.isPopular,
            })}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Most Popular
              </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold">
              $
              {selectedBillingPeriod === "monthly"
                ? plan.price
                : plan.price * ((100 - YEARLY_DISCOUNT) / 100)}
              <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                /month
              </span>
            </p>
            <p className="mt-4 font-medium text-muted-foreground">
              {plan.description}
            </p>

            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-6 text-base"
            >
              {plan.buttonText}
            </Button>
            <Separator className="my-8" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-1.5">
                  <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                  {feature.title}
                  {feature.tooltip && (
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <CircleHelp className="h-4 w-4 mt-1 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>{feature.tooltip}</TooltipContent>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
