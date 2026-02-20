// This page intentionally returns null.
// It exists only to register the `/overview` route.
//
// The actual Overview overlay is rendered inside the Hero and PrimaryPanel layout
// and is controlled via `usePathname()`.
// When the URL is `/overview`, the overlay becomes visible.
//
// Do not remove this file unless the routing strategy changes.
export default function OverViewPage() {
  return null;
}