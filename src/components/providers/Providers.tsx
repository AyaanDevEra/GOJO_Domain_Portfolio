"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/** App-wide client providers (React Query). Zustand stores need no provider. */
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } } })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
