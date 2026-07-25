import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BeO4WaRx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CDzKt8fC.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [{ charSet: "utf-8" }, {
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		}],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "bottom-right" })]
	});
}
var $$splitComponentImporter$2 = () => import("./routes-CyLpWNqe.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "ShipStreak — Track streaks. Show them off." },
		{
			name: "description",
			content: "A habit-streak tracker for indie makers. GitHub-style heatmaps, streak badges you can drop into any README."
		},
		{
			property: "og:title",
			content: "ShipStreak — Track streaks. Show them off."
		},
		{
			property: "og:description",
			content: "Track daily coding, writing, and shipping habits. Share streak badges anywhere."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./app-Co5g_xKO.mjs");
var Route$3 = createFileRoute("/app")({
	head: () => ({ meta: [
		{ title: "Your habits · ShipStreak" },
		{
			name: "description",
			content: "Track your daily habits, streaks, and share badges."
		},
		{
			property: "og:title",
			content: "Your habits · ShipStreak"
		},
		{
			property: "og:description",
			content: "Track your daily habits, streaks, and share badges."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var BASE_URL = "";
var Route$2 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[{
		path: "/",
		changefreq: "weekly",
		priority: "1.0"
	}].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
/**
* Escape XML/SVG special characters to prevent injection
*/
function escapeXml(unsafe) {
	return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
/**
* Sanitize and validate badge parameters
*/
function sanitizeBadgeParams(name, streak) {
	const streakNum = typeof streak === "number" ? streak : parseInt(streak, 10);
	const validStreak = isNaN(streakNum) || streakNum < 0 ? 0 : streakNum;
	return {
		name: escapeXml((name || "Habit").trim().slice(0, 50)),
		streak: validStreak
	};
}
/**
* Generate SVG badge string
*/
function generateBadgeSvg({ name, streak }) {
	const label = `ShipStreak: ${name}`;
	const value = `🔥 ${streak} days`;
	const labelW = Math.max(72, label.length * 6.5 + 16);
	const valueW = Math.max(64, value.length * 7 + 16);
	const totalW = labelW + valueW;
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="22" viewBox="0 0 ${totalW} 22" role="img" aria-label="${label} ${value}">
  <linearGradient id="ss-b" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".2" />
    <stop offset="1" stop-opacity=".15" />
  </linearGradient>
  <clipPath id="ss-c">
    <rect width="${totalW}" height="22" rx="4" fill="#fff" />
  </clipPath>
  <g clip-path="url(#ss-c)">
    <rect width="${labelW}" height="22" fill="#2b2118" />
    <rect x="${labelW}" width="${valueW}" height="22" fill="#e5622a" />
    <rect width="${totalW}" height="22" fill="url(#ss-b)" />
  </g>
  <g fill="#fff" text-anchor="middle" font-family="'JetBrains Mono', Consolas, monospace" font-size="11">
    <text x="${labelW / 2}" y="15">${label}</text>
    <text x="${labelW + valueW / 2}" y="15">${value}</text>
  </g>
</svg>`;
}
var Route$1 = createFileRoute("/api/badge.svg")({ server: { handlers: { GET: async ({ request }) => {
	const url = new URL(request.url);
	const svg = generateBadgeSvg(sanitizeBadgeParams(url.searchParams.get("name") || "", url.searchParams.get("streak") || "0"));
	return new Response(svg, { headers: {
		"Content-Type": "image/svg+xml",
		"Cache-Control": "public, max-age=300"
	} });
} } } });
var $$splitComponentImporter = () => import("./app.badges-BUtrGDS1.mjs");
var Route = createFileRoute("/app/badges")({
	head: () => ({ meta: [
		{ title: "Badges · ShipStreak" },
		{
			name: "description",
			content: "View your achievements and badges earned through habit tracking."
		},
		{
			property: "og:title",
			content: "Badges · ShipStreak"
		},
		{
			property: "og:description",
			content: "View your achievements and badges earned through habit tracking."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var AppRoute = Route$3.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$5
});
var SitemapDotxmlRoute = Route$2.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$5
});
var ApiBadgeDotsvgRoute = Route$1.update({
	id: "/api/badge.svg",
	path: "/api/badge.svg",
	getParentRoute: () => Route$5
});
var AppRouteChildren = { AppBadgesRoute: Route.update({
	id: "/badges",
	path: "/badges",
	getParentRoute: () => AppRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	SitemapDotxmlRoute,
	ApiBadgeDotsvgRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
