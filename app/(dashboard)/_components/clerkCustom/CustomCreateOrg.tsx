"use client";
import { CreateOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export const CustomCreateOrg = () => {
  const { theme } = useTheme();
  return (
    <CreateOrganization
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          rootBox: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
          },
          card: {
            width: "unset",
            maxWidth: "unset",
            flex: 1,
            backgroundColor: theme === "dark" ? undefined : "transparent",
            boxShadow: "unset",
          },
        },
      }}
    />
  );
};
