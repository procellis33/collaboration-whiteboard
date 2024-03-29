"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import React from "react";
import { Loading } from "@/components/auth/loading";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

interface IConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<IConvexClientProviderProps> = ({
  children,
}) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
