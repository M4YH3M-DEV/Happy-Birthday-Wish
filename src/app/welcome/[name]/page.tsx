import WelcomeComponent from "@@/src/components/WelcomeComponent";
import React from "react";

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return (
    <div>
      <WelcomeComponent name={name} />
    </div>
  );
}
