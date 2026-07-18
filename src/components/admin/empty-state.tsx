"use client";

// When a section has no content, we render nothing (null) instead of an
// "empty state" card. The section header (eyebrow + title + description)
// is always shown, so an empty section just looks clean and minimal.

export function EmptyState({ sectionId: _sectionId }: { sectionId: string }) {
  return null;
}
