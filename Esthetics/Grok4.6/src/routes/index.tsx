import { createFileRoute } from "@tanstack/react-router";
import { ProofApp } from "@/components/proof/proof-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ProofApp />;
}
