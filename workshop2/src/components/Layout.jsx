import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Card from './Card'
import NavBar from './NavBar'

function Layout() {
  return (
    <div>
      
     <Header />
      <Card>
        <NavBar />
      <Outlet />
      </Card>
    </div>
  )
}

export default Layout
