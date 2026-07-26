import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Knapp i designens tre varianter.
 *
 * `icon` är obligatorisk: varje knapp bär en ikon så att den går att tyda utan
 * att läsa texten. Det är ett uttalat krav från kunden — ta inte bort den.
 */
type Variant = "gold" | "ghost" | "ghost-dark";

const VARIANT_CLASS: Record<Variant, string> = {
  gold: "btn-gold",
  ghost: "btn-ghost",
  "ghost-dark": "btn-ghost-dark",
};

type CommonProps = {
  variant?: Variant;
  icon: IconName;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "gold", icon, children, className, ...rest } = props;
  const classes = cn("btn", VARIANT_CLASS[variant], className);

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorProps}>
        <Icon name={icon} />
        <span>{children}</span>
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      <Icon name={icon} />
      <span>{children}</span>
    </button>
  );
}
