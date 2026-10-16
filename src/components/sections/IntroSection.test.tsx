import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntroSection } from "@/components/sections/IntroSection";
import { profile } from "@/data/profile";

describe("IntroSection", () => {
  it("es una region accesible etiquetada como Sobre mí", () => {
    render(<IntroSection text={profile.intro} />);

    expect(screen.getByRole("region", { name: "Sobre mí" })).toBeInTheDocument();
  });

  it("muestra la intro como texto real", () => {
    render(<IntroSection text={profile.intro} />);

    expect(screen.getByRole("region", { name: "Sobre mí" })).toHaveTextContent(
      /desarrollador full stack/i,
    );
    expect(screen.queryByText(/PENDIENTE/)).not.toBeInTheDocument();
  });
});
