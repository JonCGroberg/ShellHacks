import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "../components/Link";

const Header: React.FC = () => {
  return (
    <header className="bg-orange-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Globe className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">LinguaLeap</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="#">
              <a className="text-gray-600 hover:text-orange-500">Courses</a>
            </Link>
            <Link href="#">
              <a className="text-gray-600 hover:text-orange-500">Resources</a>
            </Link>
            <Link href="#">
              <a className="text-gray-600 hover:text-orange-500">Community</a>
            </Link>
            <Link href="#">
              <a className="text-gray-600 hover:text-orange-500">About</a>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <select className="bg-white border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 hover:border-gray-400 focus:outline-none appearance-none">
              <option>EN</option>
              <option>ES</option>
              <option>FR</option>
            </select>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Sign Up
            </Button>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
