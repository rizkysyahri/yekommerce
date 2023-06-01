import Link from "next/link";
import MenuList from "components/MenuList";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-3 shadow-md">
      <Link href="/">
        <span className="font-semibold">yekommerce</span>
      </Link>

      <div className="relative">
        <MenuList />
      </div>
    </nav>
  );
};

export default Navbar;
