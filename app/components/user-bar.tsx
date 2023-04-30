import { Link } from "@remix-run/react";

export const UserBar = ({ user }) => {
  return (
    <>
      {user ? (
        <div>
          <div>User name: {user.email}</div>
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
