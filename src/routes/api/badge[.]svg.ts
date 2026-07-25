import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sanitizeBadgeParams, generateBadgeSvg } from "@/lib/badge-svg";

export const Route = createFileRoute("/api/badge.svg")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get("name") || "";
        const streak = url.searchParams.get("streak") || "0";

        const params = sanitizeBadgeParams(name, streak);
        const svg = generateBadgeSvg(params);

        return new Response(svg, {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
