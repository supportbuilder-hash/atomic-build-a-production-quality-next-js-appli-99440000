"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layout, Sparkles, FileCode, User, GitBranch, Activity, Folder, Settings, Check, ArrowRight, Star, ChevronRight, Circle } from 'lucide-react';
import { useState } from "react";
import { cn } from "@/lib/utils";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

interface Feature {
  title: string;
  description: string;
  icon: typeof Layout;
  span: string;
}

const FEATURES: Feature[] = [
  {
    title: "Visual website builder",
    description:
      "Drag blocks onto a live canvas, tweak layout and spacing inline, and see every change render instantly before you save it.",
    icon: Layout,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Full undo and redo history",
    description: "Every edit is versioned, so a bad change is always one click from being reversed.",
    icon: GitBranch,
    span: "lg:col-span-1",
  },
  {
    title: "Theme and typography controls",
    description: "Set a color palette and a type pairing once, then apply it across every page you build.",
    icon: Settings,
    span: "lg:col-span-1",
  },
  {
    title: "Team roles that make sense",
    description: "Owners manage billing, Editors ship changes, Viewers stay in the loop. Nobody steps on anyone's work.",
    icon: User,
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: "Project dashboard",
    description: "Track deploys, storage, and traffic per project from a single overview.",
    icon: Activity,
    span: "lg:col-span-1",
  },
  {
    title: "Reusable components",
    description: "Save a section as a component once and drop it into any page across the project.",
    icon: FileCode,
    span: "lg:col-span-1",
  },
];

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  highlighted: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    description: "For trying out LaunchHub on a single project.",
    highlighted: false,
    features: ["1 project", "1 team member", "LaunchHub subdomain", "Community support"],
  },
  {
    name: "Pro",
    monthly: 29,
    yearly: 24,
    description: "For teams shipping client or product sites regularly.",
    highlighted: true,
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Custom domains",
      "Version history and rollback",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    monthly: 99,
    yearly: 84,
    description: "For organizations with compliance and scale needs.",
    highlighted: false,
    features: [
      "Unlimited everything",
      "SSO and audit logs",
      "Dedicated onboarding",
      "Uptime SLA",
      "Enterprise support",
    ],
  },
];

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  wide?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We moved our agency's client sites off three different tools and onto LaunchHub. Handoffs between designers and the people who actually publish got a lot shorter.",
    name: "Priya Nair",
    role: "Studio Lead, Northbound Agency",
    wide: true,
  },
  {
    quote: "The undo history alone saved a launch. Someone broke the homepage an hour before go-live and we rolled it back in seconds.",
    name: "Marcus Webb",
    role: "Founder, Fielder",
  },
  {
    quote: "Editor and Viewer roles mean I can loop in stakeholders without worrying they'll accidentally publish something.",
    name: "Sana Ahmed",
    role: "Product Marketing, Loom & Co.",
  },
];

interface MockProject {
  name: string;
  status: "Live" | "Draft" | "Building";
  updated: string;
  members: string[];
}

const MOCK_PROJECTS: MockProject[] = [
  { name: "Harborline Studio", status: "Live", updated: "2h ago", members: ["PN", "MW"] },
  { name: "Fielder Marketing", status: "Building", updated: "5h ago", members: ["MW"] },
  { name: "Loom & Co. Landing", status: "Draft", updated: "1d ago", members: ["SA", "PN", "MW"] },
];

const STATUS_STYLES: Record<MockProject["status"], string> = {
  Live: "bg-emerald-100 text-emerald-700",
  Building: "bg-amber-100 text-amber-700",
  Draft: "bg-gray-100 text-gray-600",
};

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative border-b border-[var(--border)] bg-[var(--background)] px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(79,70,229,0.14),transparent)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--muted-foreground)] shadow-[0_1px_2px_rgba(24,27,32,0.04)]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              Now shipping visual undo/redo
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
            >
              {APP_TAGLINE}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]"
            >
              {APP_NAME} pulls the builder, hosting, and team workflow into one place, so shipping a new page takes minutes instead of a sprint.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(24,27,32,0.04),0_8px_24px_-8px_rgba(79,70,229,0.45)] transition-all duration-300 hover:bg-[var(--primary)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                Start building free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                See how it works
              </a>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-6 text-xs font-medium text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[var(--success)]" aria-hidden="true" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[var(--success)]" aria-hidden="true" /> Free plan forever
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(24,27,32,0.04),0_24px_48px_-16px_rgba(24,27,32,0.18)]">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-medium text-[var(--muted-foreground)]">launchhub.app/dashboard</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-0">
                <div className="hidden flex-col gap-1 border-r border-[var(--border)] p-4 sm:flex">
                  {[Layout, Folder, Activity, User, Settings].map((Icon, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-[10px]",
                        i === 0 ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ))}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent projects</h3>
                    <span className="text-xs font-medium text-[var(--primary)]">View all</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    {MOCK_PROJECTS.map((project) => (
                      <div
                        key={project.name}
                        className="flex items-center justify-between rounded-[10px] border border-[var(--border)] px-3.5 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-xs font-semibold text-[var(--primary)]">
                            {project.name.slice(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-[var(--foreground)]">{project.name}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">Updated {project.updated}</p>
                          </div>
                        </div>
                        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", STATUS_STYLES[project.status])}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[0_1px_2px_rgba(24,27,32,0.04),0_16px_32px_-12px_rgba(24,27,32,0.2)] sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">4.9/5 average</p>
                  <p className="text-xs text-[var(--muted-foreground)]">from 1,200+ teams</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos strip */}
      <section className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Trusted by teams shipping real client work
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold tracking-tight text-[var(--foreground)]/40">
            <span>Northbound</span>
            <span>Fielder</span>
            <span>Loom &amp; Co.</span>
            <span>Harborline</span>
            <span>Greystone</span>
          </div>
        </Reveal>
      </section>

      {/* Features - bento grid */}
      <section id="features" className="bg-[var(--background)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Platform</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Everything a team needs to build and ship a site
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
              One workspace for design, content, and publishing, so nothing gets lost between tools.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]"
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl border border-black/5 bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.14)]",
                  feature.span
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--primary)]/10 text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-y border-[var(--border)] bg-[var(--card)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Customers</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Teams move faster once everything lives in one place
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3"
          >
            {TESTIMONIALS.map((testimonial) => (
              <motion.figure
                key={testimonial.name}
                variants={fadeInUp}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border border-black/5 bg-[var(--background)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]",
                  testimonial.wide && "lg:col-span-2"
                )}
              >
                <div className="flex gap-0.5 text-[var(--accent)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-[var(--foreground)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10 text-xs font-semibold text-[var(--primary)]">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{testimonial.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[var(--background)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Pricing</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Plans that grow with your team
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
              Start free. Upgrade when you need custom domains, more seats, or enterprise controls.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                  billingCycle === "monthly" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)]"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                  billingCycle === "yearly" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)]"
                )}
              >
                Yearly
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    billingCycle === "yearly" ? "bg-white/20 text-white" : "bg-[var(--accent)]/15 text-[var(--accent)]"
                  )}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                className={cn(
                  "flex flex-col rounded-2xl border p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300",
                  plan.highlighted
                    ? "border-[var(--primary)] bg-[var(--foreground)] text-white lg:-translate-y-3"
                    : "border-black/5 bg-[var(--card)]"
                )}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3 w-3" aria-hidden="true" /> Most popular
                  </span>
                )}
                <h3 className={cn("text-lg font-semibold", plan.highlighted ? "text-white" : "text-[var(--foreground)]")}>
                  {plan.name}
                </h3>
                <p className={cn("mt-2 text-sm leading-relaxed", plan.highlighted ? "text-white/70" : "text-[var(--muted-foreground)]")}>
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={cn("text-4xl font-semibold tracking-tight", plan.highlighted ? "text-white" : "text-[var(--foreground)]")}>
                    ${billingCycle === "monthly" ? plan.monthly : plan.yearly}
                  </span>
                  <span className={cn("text-sm", plan.highlighted ? "text-white/60" : "text-[var(--muted-foreground)]")}>
                    /mo{plan.monthly > 0 && billingCycle === "yearly" ? ", billed yearly" : ""}
                  </span>
                </div>
                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlighted ? "text-[var(--accent)]" : "text-[var(--success)]")}
                        aria-hidden="true"
                      />
                      <span className={plan.highlighted ? "text-white/90" : "text-[var(--foreground)]"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    plan.highlighted
                      ? "bg-white text-[var(--foreground)] hover:bg-white/90 focus-visible:ring-white"
                      : "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)] focus-visible:ring-[var(--primary)]"
                  )}
                >
                  {plan.monthly === 0 ? "Start for free" : "Choose " + plan.name}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-[var(--background)] px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-black/5 bg-[var(--foreground)] px-8 py-16 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-16px_rgba(0,0,0,0.35)] sm:px-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80">
          <Circle className="h-2 w-2 fill-[var(--success)] text-[var(--success)]" aria-hidden="true" /> Free plan, no card needed
        </span>
        <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to launch your team&apos;s next site?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70">
          Set up your first project in minutes. Invite your team when you're ready to collaborate.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foreground)]"
          >
            Start building free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        </Reveal>
      </section>
    </main>
  );
}
