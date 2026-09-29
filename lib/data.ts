export const APP_NAME = "LaunchHub";

export const APP_TAGLINE =
  "Launch a website your team is proud of, in an afternoon.";

export const APP_DESCRIPTION =
  "LaunchHub is the all-in-one platform for building, managing, and deploying websites without wrangling servers, DNS, or a dozen disconnected tools.";

export interface NavLink {
  label: string;
  href: string;
  key: string;
}

/**
 * Single source of truth for top-level navigation.
 * Only the homepage exists right now, so every entry besides "Home"
 * points at an on-page section anchor rather than a separate route.
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Features", href: "#features", key: "features" },
  { label: "Pricing", href: "#pricing", key: "pricing" },
  { label: "Testimonials", href: "#testimonials", key: "testimonials" },
];

export const primaryNavCta: NavLink = {
  label: "Start building free",
  href: "#cta",
  key: "cta",
};

export interface SocialLink {
  label: string;
  href: string;
  key: string;
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/launchhub", key: "github" },
  { label: "Twitter", href: "https://twitter.com/launchhub", key: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com/company/launchhub", key: "linkedin" },
];

export type PlanTier = "Free" | "Pro" | "Enterprise";
export type UserRole = "Owner" | "Editor" | "Viewer";
export type ProjectStatus = "Live" | "Draft" | "Building";