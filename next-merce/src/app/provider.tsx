"use client";

import { ReduxProvider } from "@/redux/provider";
import { ReactQueryProvider } from "@/lib/react-query/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}