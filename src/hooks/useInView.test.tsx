import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useInView } from "@/hooks/useInView";

type ObserverCallback = ConstructorParameters<typeof IntersectionObserver>[0];

class FakeObserver {
  static instances: FakeObserver[] = [];

  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnected = false;
  private readonly callback: ObserverCallback;

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    FakeObserver.instances.push(this);
  }

  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
  disconnect() {
    this.disconnected = true;
  }

  emit(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

function latest(): FakeObserver | undefined {
  return FakeObserver.instances[FakeObserver.instances.length - 1];
}

function Probe({ once }: { once?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once });

  return <div ref={ref} data-testid="probe" data-inview={String(inView)} />;
}

afterEach(() => {
  vi.unstubAllGlobals();
  FakeObserver.instances = [];
});

describe("useInView", () => {
  it("se considera visible cuando falta IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(<Probe />);

    expect(screen.getByTestId("probe")).toHaveAttribute("data-inview", "true");
  });

  it("sigue las entradas y salidas cuando once es falso", () => {
    vi.stubGlobal("IntersectionObserver", FakeObserver);

    render(<Probe />);
    const probe = screen.getByTestId("probe");

    expect(probe).toHaveAttribute("data-inview", "false");

    act(() => latest()?.emit(true));
    expect(probe).toHaveAttribute("data-inview", "true");

    act(() => latest()?.emit(false));
    expect(probe).toHaveAttribute("data-inview", "false");
  });

  it("deja de observar tras la primera entrada cuando once es verdadero", () => {
    vi.stubGlobal("IntersectionObserver", FakeObserver);

    render(<Probe once />);
    const observer = latest();

    act(() => observer?.emit(true));

    expect(observer?.disconnected).toBe(true);
    expect(screen.getByTestId("probe")).toHaveAttribute("data-inview", "true");
  });
});
