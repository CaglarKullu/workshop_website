"use client"


import Link from 'next/link'
import React from 'react'
import {BiUserCircle } from 'react-icons/bi'
import {BsFillCartFill } from 'react-icons/bs'
import { IconContext } from "react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/ui/dropdown-menu"
import NextBreadcrumb from './NextBreadcrumb'

const Nav = () => {
  return (
    <nav>
<div className="navbar bg-background flex-between w-full pt-3">
  <div className="flex-auto">
  <Link className=" normal-case text-xl text-primary"  href={'/'}> Altolye Nova</Link>
  <div className=" justify-evenly space-x-10 md:space-x-2 pl-20" >
    <Link className='pr-5' href={'/about'}>About Us</Link>
    <Link className='pr-5' href={'/search-page'}>Events</Link>
    <Link className='pr-5' href={'/contact'}>Contact</Link>
  </div>
  </div>
  {/* Desktop Navigation */}
  <div className="sm:flex hidden">
    <ul className="menu menu-horizontal px-1 ">
      <li> <Link className='text-primary' href={'/search-page'}>
      <IconContext.Provider value={{ color: "hsl(var(--primary))", className: "global-class-name" }}>
        <BiUserCircle size={25}/>
        </IconContext.Provider>
      </Link> </li>
      <li>
        <details>
          <summary className='normal-case text-primary'>
          <IconContext.Provider value={{ color: "hsl(var(--primary))", className: "global-class-name" }}>
        <BsFillCartFill size={20}/>
        </IconContext.Provider>
          </summary>
          <ul className="p-2 bg-base-100 text-primary">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  {/* Mobile Navigation */}
  <div className="sm:hidden flex relative text-primary menu menu-horizonta">
  <DropdownMenu>
  <DropdownMenuTrigger><IconContext.Provider value={{ color: "hsl(var(--primary))", className: "global-class-name" }}>
        <BiUserCircle size={20}/>
        </IconContext.Provider></DropdownMenuTrigger>
  <DropdownMenuContent >
    <DropdownMenuLabel >My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem >Search Events</DropdownMenuItem>
    <DropdownMenuItem >My Favorites</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  </div>

</div>
<div className='bg-secondary h-1 flex-initial'></div>
<NextBreadcrumb
          homeElement={'Home'}
          separator={">"}
          activeClasses='text-primary'
          containerClasses='flex py-5' 
          listClasses='hover:underline mx-2'
          capitalizeLinks
        />
    </nav>
  )
}

export default Nav