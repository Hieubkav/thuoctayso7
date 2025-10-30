import { describe, expect, it } from "vitest";

import { useDashboardStore } from "@/features/admin/stores/use-dashboard-store";

describe("useDashboardStore", () => {
  it("cập nhật tab đang hoạt động", () => {
    useDashboardStore.getState().setActiveTab("services");
    expect(useDashboardStore.getState().activeTab).toBe("services");
  });
});
