import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntroSection } from "@/components/sections/IntroSection";
import { profile } from "@/data/profile";

describe("IntroSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<IntroSection text={profile.intro} />);

    expect(screen.getByRole("region", { name: "Intro" })).toBeInTheDocument();
  });

  it("muestra el texto PENDIENTE", () => {
    render(<IntroSection text={profile.intro} />);

    expect(screen.getByRole("region", { name: "Intro" })).toHaveTextContent(
      "PENDIENTE",
    );
  });
});
