import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { buttonVariants } from "#components/ui/button";
import { cn } from "./cn";

export interface AppShellNavItem {
  readonly key: string;
  readonly label: string;
  readonly href?: string;
  readonly icon?: ReactNode;
  readonly badge?: ReactNode;
  readonly active?: boolean;
}

export interface AppShellNavSectionConfig {
  readonly key: string;
  readonly title?: string;
  readonly items: readonly AppShellNavItem[];
}

export interface AppShellNavigationProps {
  readonly sections: readonly AppShellNavSectionConfig[];
  readonly onNavigate?: () => void;
  readonly className?: string;
}

type AppShellNavLinkProps = Omit<AppShellNavItem, "key"> & {
  readonly onSelect?: () => void;
};

export function AppShellNavigation({
  sections,
  onNavigate,
  className,
}: AppShellNavigationProps) {
  return (
    <AppShellNav className={className}>
      {sections.map((section) => (
        <AppShellNavSection key={section.key} title={section.title}>
          {section.items.map(({ key, ...item }) => (
            <AppShellNavLink key={key} {...item} onSelect={onNavigate} />
          ))}
        </AppShellNavSection>
      ))}
    </AppShellNav>
  );
}

export function AppShellNav({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return <nav className={cn("grid gap-5", className)}>{children}</nav>;
}

export function AppShellNavSection({
  title,
  children,
  className,
}: {
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <section className={cn("grid gap-3", className)}>
      {title ? (
        <p className="px-3 text-[0.69rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          {title}
        </p>
      ) : null}
      <div className="grid gap-1.5">{children}</div>
    </section>
  );
}

export function AppShellNavLink({
  active,
  badge,
  href,
  icon,
  label,
  onSelect,
}: AppShellNavLinkProps) {
  const className = cn(
    buttonVariants({ variant: "ghost" }),
    "h-auto w-full justify-start rounded-2xl px-3 py-3 text-left text-sm shadow-none",
    active
      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
      : "text-muted-foreground hover:bg-accent/80 hover:text-foreground",
  );

  const content = (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl border text-current",
          active
            ? "border-primary-foreground/20 bg-primary-foreground/10"
            : "border-border/70 bg-background/70",
        )}
      >
        {icon ?? <span className="size-2 rounded-full bg-current/65" />}
      </span>
      <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
      {badge ? <span className="text-xs font-semibold">{badge}</span> : null}
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} onClick={onSelect}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onSelect}>
      {content}
    </button>
  );
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonPropsBase = ButtonHTMLAttributes<HTMLButtonElement>;

export type AppShellAnchorProps = AnchorProps;
export type AppShellButtonProps = ButtonPropsBase;
