import { describe, expect, it } from "vitest";
import { nextWordIndex } from "@/lib/rotating-words";

describe("nextWordIndex", () => {
  it("avanza al siguiente índice", () => {
    expect(nextWordIndex(0, 3)).toBe(1);
    expect(nextWordIndex(1, 3)).toBe(2);
  });

  it("vuelve a 0 al pasar el último índice", () => {
    expect(nextWordIndex(2, 3)).toBe(0);
  });
});
