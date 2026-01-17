import { DashboardLayout } from "@/components/layout/DashboardLayout";
// import { FlowCanvas } from "@/components/FlowCanvas";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";

export default function Home() {
  return (
    <DashboardLayout>
      <BuilderCanvas />
    </DashboardLayout>
  );
}
