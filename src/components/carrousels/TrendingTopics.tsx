import React from "react";
import { Badge } from "../ui/badge";

type Props = {};

const TrendingTopics = (props: Props) => {
  const topicsMocks = [
    "web development",
    "IT",
    "IoT",
    "free time",
    "new tech",
    "crypto",
    "breakthrough",
  ];
  return (
    <div className="grid gap-4">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Trending Topics
      </h3>
      <div className="flex flex-wrap gap-2">
        {topicsMocks.map((t, index) => (
          <Badge className="py-2 px-4 text-sm" key={index}>
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
