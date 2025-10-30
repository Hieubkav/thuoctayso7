import { ServiceManager } from "@/features/admin/components/service-manager";
import { listServices } from "@/features/admin/data/services";

export default async function ServicesManagementPage() {
  const services = await listServices();
  return <ServiceManager services={services} />;
}
