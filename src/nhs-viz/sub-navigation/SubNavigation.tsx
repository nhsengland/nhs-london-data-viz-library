/* eslint-disable react/prop-types */
import React from "react";

interface SubNavigationProps {
  "aria-label"?: string;
  children: React.ReactNode;
}

interface SubNavigationItemProps {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  "aria-current"?: "page" | undefined;
  children: React.ReactNode;
}

const SubNavigationItem: React.FC<SubNavigationItemProps> = ({
  href,
  onClick,
  className,
  "aria-current": ariaCurrent,
  children,
}) => (
  <li className={`nhsuk-sub-navigation__item ${className ?? ""}`}>
    <a
      className="nhsuk-sub-navigation__link"
      href={href}
      onClick={onClick}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  </li>
);

export const SubNavigation: React.FC<SubNavigationProps> & {
  Item: typeof SubNavigationItem;
} = ({ "aria-label": ariaLabel, children }) => (
  <nav aria-label={ariaLabel}>
    <ul className="nhsuk-sub-navigation__list">{children}</ul>
  </nav>
);

SubNavigation.Item = SubNavigationItem;
