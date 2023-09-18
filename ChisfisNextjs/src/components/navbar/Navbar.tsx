import React from "react";
import Container from "../Container";
import Logo from "../navbar/Logo";
import Search from "./Search";
import Usermenu from "./Usermenu";
import { FiMenu } from "react-icons/fi"

export default function Navbar() {
  return (
    <div className="z-20 w-full bg-white sticky top-0 shadow-md h-[67px] pt-[0.6rem]">
      <div className="">
        <Container>
          <div className="hidden md:flex items-center justify-between gap-2 md:gap-0">
          <Logo/>
          <Search/>
          <Usermenu/>
          </div>
          <div className=" md:hidden flex justify-between gap-2 md:gap-0">
            <Logo />
            <FiMenu />
          </div>
        </Container>  
      </div>
    
    </div>
  );
}
