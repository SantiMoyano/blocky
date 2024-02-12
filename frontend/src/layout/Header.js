import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function NavList({ isLoggedIn, handleLogout }) {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {!isLoggedIn && (
        <>
          <Typography
            as={Link} // Render Link component instead of 'a' tag
            to="/login"
            variant="small"
            className="p-1 font-medium font-custom"
            color="white"
          >
            Login
          </Typography>
          <Typography
            as={Link} // Render Link component instead of 'a' tag
            to="/register"
            variant="small"
            className="p-1 font-medium font-custom"
            color="white"
          >
            Register
          </Typography>
        </>
      )}

      {isLoggedIn && (
        <>
          <Typography
            as={Link} // Render Link component instead of 'a' tag
            to="/projects"
            variant="small"
            className="p-1 font-medium font-custom"
            color="white"
          >
            Projects
          </Typography>
          <Typography
            as={Link}
            onClick={handleLogout}
            to="/"
            variant="small"
            className="p-1 font-medium font-custom"
            color="white"
          >
            Logout
          </Typography>
        </>
      )}
    </ul>
  );
}

function NavbarSimple({ isLoggedIn, handleLogout }) {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []); // Run only once when the component mounts

  return (
    <Navbar className="dark-red-bg mx-auto max-w-screen-xl px-6 py-3 rounded-none border-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          to="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 font-custom"
          color="white"
        >
          BLOCKY
        </Typography>
        <div className="hidden lg:block">
          <NavList isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          color="white"
        >
          {openNav ? (
            <XMarkIcon color="white" className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon color="white" className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </Collapse>
    </Navbar>
  );
}

export default NavbarSimple;
