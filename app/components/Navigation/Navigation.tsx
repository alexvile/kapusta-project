import { NavLink } from "@remix-run/react";
import { Icon } from "../Layout/Icon";

type INavLink = {
  label: string;
  to: string;
  end?: boolean;
  icon?: string;
};
type NavigationProps = {
  navLinks: INavLink[];
  style?: "main" | "submain" | "";
};

const NavLinks = ({ navLinks }: { navLinks: INavLink[] }) => {
  return (
    <ul>
      {navLinks?.map((el) => (
        <li key={el.to}>
          <NavLink
            to={el.to}
            end={el?.end ? true : false}
            className={({ isActive, isPending }) =>
              ` ${isPending ? "pending" : isActive ? "active" : ""}`
            }
          >
            <span className="flex items-center justify-start gap-1">
              {el.icon && <Icon name={el.icon} />} {el.label}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export const Navigation = ({ navLinks, style = "" }: NavigationProps) => {
  return (
    <nav className={style}>
      <NavLinks navLinks={navLinks} />
    </nav>
  );
};
