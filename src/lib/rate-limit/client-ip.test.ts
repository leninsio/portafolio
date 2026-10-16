import { describe, expect, it } from "vitest";
import { getClientIp } from "@/lib/rate-limit/client-ip";

describe("getClientIp", () => {
  it("toma el primer valor de x-forwarded-for y lo recorta", () => {
    const headers = new Headers({
      "x-forwarded-for": "  203.0.113.7 , 70.41.3.18, 150.172.238.178",
    });

    expect(getClientIp(headers)).toBe("203.0.113.7");
  });

  it("usa x-real-ip cuando falta x-forwarded-for", () => {
    const headers = new Headers({ "x-real-ip": "198.51.100.9" });

    expect(getClientIp(headers)).toBe("198.51.100.9");
  });

  it("devuelve unknown cuando no hay cabeceras de IP", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
