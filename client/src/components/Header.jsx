import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  TextInput,
  NavbarToggle,
} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 border-gray-200">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-gray-800 hover:text-gray-500 dark:text-white"
      >
        <span className="px-2 py-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Young's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-14 h-11 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-4 md:order-2">
        <Button className="w-14 h-11 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button className=" bg-blue-100 text-blue-900 text-semibold hover:bg-blue-200! focus:ring-blue-300!">
            Sign In
          </Button>
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} active={path === '/'} to="/">
          Home
        </NavbarLink>
        <NavbarLink as={Link} active={path === '/about'} to="/about">
          About
        </NavbarLink>
        <NavbarLink as={Link} active={path === '/projects'} to="/projects">
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
