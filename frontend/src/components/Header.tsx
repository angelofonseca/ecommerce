"use client"

import { NavLink, useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import CartIcon from "./CartIcon/CartIcon"

function Header() {
  const navigate = useNavigate()
  return (
    <header className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-2xl sticky top-0 z-50 border-b border-primary/20 backdrop-blur-lg">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-auto cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
              src={"/logo.png"}
              alt="logo"
              onClick={() => {
                navigate("/")
              }}
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">SneakerStore</h1>
              <p className="text-xs text-primary-foreground/80">Sua paixão por calçados</p>
            </div>
          </div>

          <div className="flex-1 max-w-3xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                className="text-sm font-medium hover:text-accent transition-colors duration-300 hover:scale-105"
              >
                Início
              </NavLink>
              <NavLink
                to="/categories"
                className="text-sm font-medium hover:text-accent transition-colors duration-300 hover:scale-105"
              >
                Categorias
              </NavLink>
              <NavLink
                to="/login"
                className="text-sm font-medium hover:text-accent transition-colors duration-300 hover:scale-105"
              >
                Login
              </NavLink>
            </nav>

            <div className="w-px h-6 bg-primary-foreground/20 hidden md:block"></div>

            <NavLink
              data-testid="shopping-cart-button"
              to="/cart"
              className="p-3 rounded-xl hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-110 relative group"
            >
              <CartIcon />
              <div className="absolute inset-0 rounded-xl bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
