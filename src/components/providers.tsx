"use client";

import { QueryProviders } from "./query-provider"

export const Providers = ({
    children
} : {
    children: React.ReactNode
}) => {
  return (
    <QueryProviders>
        {children}
    </QueryProviders>
  )
}
