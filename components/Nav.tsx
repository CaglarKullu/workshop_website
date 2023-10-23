"use client"


import Link from 'next/link'
import React from 'react'
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
  <div className="flex-1">
  <Link className=" normal-case text-xl text-primary"  href={'/'}> Altolye Nova</Link>
  <div className=" justify-evenly space-x-5 md:space-x-2 pl-20" >
    <Link href={''}>Categories</Link>
    <Link href={''}>Something</Link>
    <Link href={''}>Something Else</Link>
  </div>
  </div>
  {/* Desktop Navigation */}
  <div className="sm:flex hidden">
    <ul className="menu menu-horizontal px-1 ">
      <li>      <Link className='normal-case text-primary' href={'/search-page'}>Search Page</Link> </li>
      <li>
        <details>
          <summary className='normal-case text-primary'>
            Parent
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
  <DropdownMenuTrigger>Profile Icon</DropdownMenuTrigger>
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