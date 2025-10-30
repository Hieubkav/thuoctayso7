import { describe, expect, it } from "vitest";

import { slugify } from "@/lib/utils";

describe("slugify", () => {
  it("chuyển tiếng việt có dấu sang slug không dấu", () => {
    expect(slugify("Thuốc hạ sốt Dược sĩ Trọng")).toBe("thuoc-ha-sot-duoc-si-trong");
  });

  it("loại bỏ ký tự đặc biệt và chuẩn hóa khoảng trắng", () => {
    expect(slugify("  Máy đo huyết áp Omron M3  ")).toBe("may-do-huyet-ap-omron-m3");
  });
});
