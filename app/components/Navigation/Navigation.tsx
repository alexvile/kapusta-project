import { NavLink } from "@remix-run/react";

type INavLink = {
  label: string;
  to: string;
  end?: boolean;
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
            {el.label}
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
