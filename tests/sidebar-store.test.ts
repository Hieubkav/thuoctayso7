import { describe, expect, it } from "vitest";

import { useSidebarStore } from "@/features/admin/stores/use-sidebar-store";

describe("useSidebarStore", () => {
  it("toggles open state", () => {
    const initial = useSidebarStore.getState().isOpen;
    useSidebarStore.getState().toggle();
    expect(useSidebarStore.getState().isOpen).toBe(!initial);
  });

  it("closes the sidebar", () => {
    useSidebarStore.setState({ isOpen: true });
    useSidebarStore.getState().close();
    expect(useSidebarStore.getState().isOpen).toBe(false);
  });
});
