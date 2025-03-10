import React, { ReactNode } from "react";
import { Card } from "../card";

const CustomCard = ({ children }: { children: ReactNode }) => {
  return <Card className="w-[400px] p-6 shadow-lg">{children}</Card>;
};

export default CustomCard;
