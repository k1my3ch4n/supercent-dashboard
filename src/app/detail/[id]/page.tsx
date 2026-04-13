import DashboardWidget from "@widgets/DashboardWidget";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  return <DashboardWidget gameId={id} />;
}
