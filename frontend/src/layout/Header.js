import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";

function NavList({ isLoggedIn, handleLogout }) {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {!isLoggedIn && (
        <>
          <Typography
            as={Link} // Render Link component instead of 'a' tag
            to="/register"
            variant="medium"
            className="p-1 font-bold font-custom hover:text-black transition duration-300 ease-in-out"
            color="white"
          >
            Sing in
          </Typography>
        </>
      )}

      {isLoggedIn && (
        <>
          <Typography
            as={Link} // Render Link component instead of 'a' tag
            to="/projects"
            variant="medium"
            className="p-1 font-bold font-custom hover:text-black transition duration-300 ease-in-out"
            color="white"
          >
            Projects
          </Typography>
          <Typography
            as={Link}
            onClick={handleLogout}
            to="/"
            variant="medium"
            className="p-1 font-bold font-custom hover:text-black transition duration-300 ease-in-out"
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
    <Navbar className="blue-bg w-full min-w-full rounded-none shadow-none border-0 ">
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-between text-blue-gray-900 header-width">
          <Typography
            as={Link}
            to="/"
            variant="h5"
            className="cursor-pointer py-1.5 font-custom hover:text-black transition duration-300 ease-in-out"
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
      </div>
      <Collapse open={openNav}>
        <NavList isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </Collapse>
    </Navbar>
  );
}

export default NavbarSimple;
