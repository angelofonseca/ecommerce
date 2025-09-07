"use client"

import { BrowserRouter } from "react-router-dom"
import App from "../src/App"
import { CartProvider } from "../src/context/CartContext"
import { ProductProvider } from "../src/context/ProductContext"
import "../src/output.css"

export default function Page() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  )
}
