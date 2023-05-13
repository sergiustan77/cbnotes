"use client";
import React, { useEffect } from "react";
import { Button } from "./button";
import { Moon, Sun, Loader2 } from "lucide-react";

import { useTheme } from "next-themes";

type Props = {};

const ThemeToggle = (props: Props) => {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      {mounted ? (
        <div className="  ">
          {currentTheme === "dark" ? (
            <Button
              onClick={() => setTheme("light")}
              variant={"ghost"}
              size={"icon"}
            >
              <Sun />
            </Button>
          ) : (
            <Button
              onClick={() => setTheme("dark")}
              variant={"ghost"}
              size={"icon"}
            >
              <Moon />
            </Button>
          )}
        </div>
      ) : (
        <div className="">
          <Button variant={"ghost"} size={"icon"}>
            <Loader2 className=" animate-spin" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
