"use client";

import {useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null 
  const navRef  = useRef<HTMLDivElement| null> (null)

  useEffect(()=>{
    const handler = (e:KeyboardEvent)=>{
      if (e.key ==="Escape"){
        setActiveIndex(null)
      }
    }
    document.addEventListener("keydown",handler)
    return () => {
      document.removeEventListener("keydown",handler)
    }
  },[])
  useOnClickOutside(navRef,() =>setActiveIndex(null))

  return (
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          console.log(activeIndex)
          if (activeIndex == 1  || activeIndex == 0 ) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };
        const isOpen = i === activeIndex;
        return <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen} />;
      })}
    </div>
  );
};

export default NavItems;
