"use client";

import { PrivyProvider, type PrivyProviderProps } from "@privy-io/react-auth";
import React from "react";

export function PrivyClientProvider(props: PrivyProviderProps) {
  return <PrivyProvider {...props}>{props.children}</PrivyProvider>;
}
