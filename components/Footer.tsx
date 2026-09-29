"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, socialLinks, APP_NAME } from "@/lib/data";

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
} as const;

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = (t.raw("nav") ?? {}) as Record<string, string>;
  const footerT = (t.raw("footer") ?? {}) as Record<string, string>;
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8"
      >
        <div>
          <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {navT.brand ?? APP_NAME}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
            {footerT.tagline ?? ""}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.key as keyof typeof socialIcons];
              const label = footerT[`${social.key}Label`] ?? social.label;
              return (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--border)] text-[var(--muted-foreground)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                >
                  {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            {footerT.linksHeading ?? "Navigate"}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={resolveHref(link.href)}
                  onClick={handleAnchorClick(link.href)}
                  className="text-sm text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--foreground)]"
                >
                  {navT[link.key] ?? link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            {footerT.socialHeading ?? "Follow"}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {socialLinks.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--foreground)]"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-[var(--border)] px-4 py-6 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-xs text-[var(--muted-foreground)]">
          &copy; {year} {navT.brand ?? APP_NAME}. {footerT.copyright ?? ""}
        </p>
      </div>
    </footer>
  );
}