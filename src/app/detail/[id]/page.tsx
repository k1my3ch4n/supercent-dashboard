import { Suspense } from "react";
import DashboardWidget from "@widgets/DashboardWidget";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

async function DashboardContent({ params }: DetailPageProps) {
  const { id } = await params;
  return <DashboardWidget gameId={id} />;
}

export default function DetailPage({ params }: DetailPageProps) {
  return (
    <Suspense>
      <DashboardContent params={params} />
    </Suspense>
  );
}
