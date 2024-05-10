import {ThemeButton} from "./themeButton";
import {BlogName} from "./blog-name";

const Header = () => {
  return (
    <header className="navbar p-0">
      <div className={"flex-1 text-xl font-bold"}>
        <BlogName />
      </div>
      <ThemeButton />
    </header>
  );
};

export default Header;
