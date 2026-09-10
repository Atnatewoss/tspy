import React from "react";
import { Outlet } from "react-router";

export interface TSPYLayoutAdapterProps {
  Layout: React.ComponentType<{ children?: React.ReactNode }>;
}

export function TSPYLayoutAdapter({ Layout }: TSPYLayoutAdapterProps) {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
