export function clampIndex(index: number, total: number): number {
  if (total <= 0 || !Number.isFinite(index)) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(index), 0), total - 1);
}

export function nextIndex(current: number, total: number): number {
  return clampIndex(current + 1, total);
}

export function prevIndex(current: number, total: number): number {
  return clampIndex(current - 1, total);
}

export function pageCount(total: number, perView: number): number {
  if (total <= 0) {
    return 0;
  }

  const per = Math.max(1, Math.trunc(perView));

  return Math.ceil(total / per);
}
