export function nextWordIndex(current: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return (current + 1) % total;
}
