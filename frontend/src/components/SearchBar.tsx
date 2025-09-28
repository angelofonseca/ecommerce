"use client";

import type React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsFromQuery } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useProductContext } from "../context/ProductContext";

function SearchBar() {
  const { setProducts, setIsSearched, setIsLoading } = useProductContext();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const results = await getProductsFromQuery(query);
    setQuery("");
    setIsLoading(false);
    setProducts(results);
    setIsSearched(true);
    if (location.pathname === "/") {
      navigate("/?search=" + query);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-accent/50">
        <div className="absolute left-4 z-10">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <Input
          className="flex-1 bg-transparent text-gray-800 border-0 focus:ring-0 focus:outline-none pl-12 pr-4 py-4 text-base placeholder:text-gray-500 font-medium"
          type="text"
          id="query-input"
          data-testid="query-input"
          value={query}
          placeholder="Busque por tênis, sapatos, sandálias..."
          onChange={({ target }) => setQuery(target.value)}
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl m-1 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Pesquisar</span>
          </div>
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;
