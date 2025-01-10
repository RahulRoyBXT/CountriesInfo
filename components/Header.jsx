import { useContext} from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function Header() {
const [isDark, setIsDark] = useContext(ThemeContext);

  console.log('check local storage', isDark);
  return (
    <header className={`header-container ${isDark? "dark": ""}`}>
      <div className="header-content">
        <h2 className="title">
          <Link to="/">Where in the world?</Link>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setIsDark((prev) => !prev);
            localStorage.setItem("DarkMode", !isDark);
          }}
        >
          <i className={`fa-solid ${isDark? "fa-sun": "fa-moon"}`} />
          &nbsp;&nbsp;{isDark? "Light Mode": "Dark Mode"}
        </p>
      </div>
    </header>
  );
}
