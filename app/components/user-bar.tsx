import { User } from "@prisma/client";
import { Link } from "@remix-run/react";
// ----767 - mobile
// md - 768 - tablet
// ? lg - 1024 ????
// xl - 1280 - desktop
export const UserBar = ({
  user,
}: {
  user?: Pick<User, "id" | "email" | "profile">;
}) => {
  return (
    <>
      {user ? (
        <div className="flex items-center justify-between">
          <div>
            {/* {user?.profile?.firstName} */}
            <div className="md:hidden w-8 h-8 bg-lightBg rounded-full flex items-center justify-center">
              {/* todo - only if we doesnt have avatar */}
              <span className="text-secondary font-roboto font-bold text-label">
                {user?.profile?.firstName?.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <form action="/logout" method="post">
              <button type="submit">Sign Out</button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
};
