import { NavLink } from "@remix-run/react";

type INavLink = {
  label: string;
  to: string;
};

export const NavLinks = ({ navLinks }: { navLinks: INavLink[] }) => {
  // todo - refactor
  return (
    <ul className="nav-links flex">
      {navLinks?.map((el) => (
        <li key={el.to} className="rounded-t-3xl overflow-hidden">
          <NavLink
            to={el.to}
            className={({ isActive, isPending }) =>
              `text-center py-4 px-6 inline-block min-w-[138px] font-roboto text-label tracking-small font-bold uppercase ${
                isPending
                  ? "pending bg-navLinks-normalBg text-navLinks-pendingText"
                  : isActive
                  ? "active bg-navLinks-activeBg text-navLinks-activeText"
                  : "bg-navLinks-normalBg text-navLinks-normalText"
              }`
            }
          >
            {el.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
