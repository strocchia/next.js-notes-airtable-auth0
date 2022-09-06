import { useContext } from "react";
import { ThemeContext } from "../utils/themeContext";

const Navbar = ({ Themes, user }) => {
  const { theme, handleThemeChange } = useContext(ThemeContext);

  //   console.log(user);

  return (
    <div className="navbar bg-base-100 border-b-2 mb-4">
      <div className="flex-1 gap-x-8">
        {!user && (
          <a className="btn btn-sm btn-link" href="/api/login">
            Login
          </a>
        )}
        {user && (
          <a className="btn btn-sm btn-ghost" href="/api/logout">
            Logout
          </a>
        )}
      </div>
      {user && <div className="flex-1">Hello, {user?.nickname}</div>}
      <div className="flex-none gap-x-4">
        <div className="dropdown">
          <label tabIndex={1} className="btn btn-ghost">
            theme
          </label>
          <ul
            tabIndex={1}
            className="dropdown-content menu mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Themes.map((key, _) => {
              return (
                <li key={key} onClick={() => handleThemeChange(key)}>
                  <a className="capitalize">{key}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <span className="ml-4 text-sm">
          <code className="mr-2">`{theme}`</code> mode
        </span>
      </div>
    </div>
  );
};

export default Navbar;
