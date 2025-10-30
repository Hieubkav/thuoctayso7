import { auth } from "@/auth";
import { DashboardHeader } from "@/features/admin/components/dashboard-header";
import { DashboardMobileNav } from "@/features/admin/components/dashboard-mobile-nav";
import { DashboardSidebar } from "@/features/admin/components/dashboard-sidebar";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

function getInitials(name?: string | null, email?: string | null) {
  if (name && name.trim().length) {
    const parts = name.trim().split(" ");
    return parts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }
  if (email) {
    return email.charAt(0).toUpperCase();
  }
  return "QT";
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect(routes.admin.login);
  }

  const initials = getInitials(session.user.name, session.user.email);

  return (
    <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
      <div className="hidden md:block">
        <DashboardSidebar initials={initials} />
      </div>
      <div className="flex flex-col">
        <DashboardHeader />
        <DashboardMobileNav initials={initials} />
        <main className="flex-1 bg-muted/20 p-6">{children}</main>
      </div>
    </div>
  );
}
