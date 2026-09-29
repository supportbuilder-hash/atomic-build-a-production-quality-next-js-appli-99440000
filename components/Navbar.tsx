"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, primaryNavCta, APP_NAME } from "@/lib/data";

const MotionLink = motion(Link);

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = (t.raw("nav") ?? {}) as Record<string, string>;
  const [open, setOpen] = useState(false);

  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  const handleAnchorClick = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/")) return;
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--primary)] text-white">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">{navT.brand ?? APP_NAME}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={resolveHref(link.href)}
              onClick={handleAnchorClick(link.href)}
              className="rounded-md text-sm font-medium text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              {navT[link.key] ?? link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <MotionLink
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            href={resolveHref(primaryNavCta.href)}
            onClick={handleAnchorClick(primaryNavCta.href)}
            className="inline-flex items-center justify-center rounded-[10px] bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(24,27,32,0.04),0_4px_12px_-2px_rgba(24,27,32,0.15)] transition-colors duration-300 hover:bg-[var(--primary)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          >
            {navT[primaryNavCta.key] ?? primaryNavCta.label}
          </MotionLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[var(--foreground)] transition-colors duration-300 hover:bg-[var(--card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] md:hidden"
          aria-label={open ? navT.closeMenu ?? "Close menu" : navT.openMenu ?? "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={resolveHref(link.href)}
                  onClick={handleAnchorClick(link.href)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] transition-colors duration-300 hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                >
                  {navT[link.key] ?? link.label}
                </Link>
              ))}
              <Link
                href={resolveHref(primaryNavCta.href)}
                onClick={handleAnchorClick(primaryNavCta.href)}
                className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--primary)]/90"
              >
                {navT[primaryNavCta.key] ?? primaryNavCta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}