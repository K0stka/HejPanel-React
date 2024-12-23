"use client";

import Transition from "@/components/utility/Transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Transition>{children}</Transition>;
}
