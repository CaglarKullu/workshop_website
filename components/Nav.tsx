"use client"


import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav>
<div className="navbar bg-base-100">
  <div className="flex-1">
  <Link className=" normal-case text-xl text-secondary"  href={'/'}> Altolye Nova</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>      <Link  href={'/search-page'}>Search Page</Link> </li>

      <li>
        <details>
          <summary>
            Parent
          </summary>
          <ul className="p-2 bg-base-100">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>

    </nav>
  )
}

export default Nav