import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // ============================================
  // CATEGORIAS
  // ============================================
  console.log("📦 Criando categorias...");
  const category1 = await prisma.category.create({ data: { name: "Tênis" } });
  const category2 = await prisma.category.create({ data: { name: "Sandálias" } });
  const category3 = await prisma.category.create({ data: { name: "Camisetas" } });
  const category4 = await prisma.category.create({ data: { name: "Mochilas" } });
  const category5 = await prisma.category.create({ data: { name: "Acessórios" } });
  const category6 = await prisma.category.create({ data: { name: "Calças" } });
  const category7 = await prisma.category.create({ data: { name: "Jaquetas" } });
  const category8 = await prisma.category.create({ data: { name: "Meias" } });
  const category9 = await prisma.category.create({ data: { name: "Bonés" } });
  const category10 = await prisma.category.create({ data: { name: "Bolsas" } });
  const category11 = await prisma.category.create({ data: { name: "Shorts" } });
  const category12 = await prisma.category.create({ data: { name: "Regatas" } });
  const category13 = await prisma.category.create({ data: { name: "Chinelos" } });
  const category14 = await prisma.category.create({ data: { name: "Luvas" } });
  const category15 = await prisma.category.create({ data: { name: "Relógios" } });

  // ============================================
  // MARCAS
  // ============================================
  console.log("🏷️  Criando marcas...");
  const brand1 = await prisma.brand.create({ data: { name: "Nike" } });
  const brand2 = await prisma.brand.create({ data: { name: "Adidas" } });
  const brand3 = await prisma.brand.create({ data: { name: "Puma" } });
  const brand4 = await prisma.brand.create({ data: { name: "Vans" } });
  const brand5 = await prisma.brand.create({ data: { name: "Oakley" } });
  const brand6 = await prisma.brand.create({ data: { name: "Fila" } });
  const brand7 = await prisma.brand.create({ data: { name: "Reebok" } });
  const brand8 = await prisma.brand.create({ data: { name: "New Balance" } });
  const brand9 = await prisma.brand.create({ data: { name: "Under Armour" } });
  const brand10 = await prisma.brand.create({ data: { name: "Levi's" } });
  const brand11 = await prisma.brand.create({ data: { name: "Asics" } });
  const brand12 = await prisma.brand.create({ data: { name: "Mizuno" } });
  const brand13 = await prisma.brand.create({ data: { name: "Converse" } });
  const brand14 = await prisma.brand.create({ data: { name: "Lacoste" } });
  const brand15 = await prisma.brand.create({ data: { name: "Speedo" } });

  // ============================================
  // PRODUTOS
  // ============================================
  console.log("👟 Criando produtos...");

  // TÊNIS (15 produtos)
  const product1 = await prisma.product.create({
    data: {
      name: "Tênis Nike Air Max",
      price: 399.99,
      categoryId: category1.id,
      brandId: brand1.id,
      freeShipping: true,
      photo: "https://imgnike-a.akamaihd.net/360x360/029489INA1.jpg",
      description: "Tênis Nike Air Max com amortecimento superior",
      stock: { create: { quantity: 25 } },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Tênis Adidas Ultraboost",
      price: 599.99,
      categoryId: category1.id,
      brandId: brand2.id,
      freeShipping: true,
      photo: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/eb71f51488f04e78952ad8c0fb5fe58e_9366/Tenis_Corrida_Adistar_4_Azul_JR0310_HM1.jpg",
      description: "Tênis Adidas Ultraboost para corrida de alto desempenho",
      stock: { create: { quantity: 18 } },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Tênis Puma RS-X",
      price: 349.99,
      categoryId: category1.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Tênis Puma RS-X com design moderno",
      stock: { create: { quantity: 20 } },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Tênis Vans Old Skool",
      price: 279.99,
      categoryId: category1.id,
      brandId: brand4.id,
      freeShipping: false,
      description: "Tênis Vans Old Skool clássico",
      stock: { create: { quantity: 30 } },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Tênis Asics Gel-Kayano",
      price: 699.99,
      categoryId: category1.id,
      brandId: brand11.id,
      freeShipping: true,
      description: "Tênis Asics Gel-Kayano profissional para corrida",
      stock: { create: { quantity: 12 } },
    },
  });

  const product6 = await prisma.product.create({
    data: {
      name: "Tênis Mizuno Wave Creation",
      price: 549.99,
      categoryId: category1.id,
      brandId: brand12.id,
      freeShipping: true,
      description: "Tênis Mizuno Wave Creation com tecnologia de amortecimento",
      stock: { create: { quantity: 15 } },
    },
  });

  const product7 = await prisma.product.create({
    data: {
      name: "Tênis Reebok Nano X",
      price: 449.99,
      categoryId: category1.id,
      brandId: brand7.id,
      freeShipping: true,
      description: "Tênis Reebok Nano X para crossfit",
      stock: { create: { quantity: 10 } },
    },
  });

  const product8 = await prisma.product.create({
    data: {
      name: "Tênis New Balance 574",
      price: 379.99,
      categoryId: category1.id,
      brandId: brand8.id,
      freeShipping: false,
      description: "Tênis New Balance 574 lifestyle",
      stock: { create: { quantity: 22 } },
    },
  });

  const product9 = await prisma.product.create({
    data: {
      name: "Tênis Converse All Star",
      price: 199.99,
      categoryId: category1.id,
      brandId: brand13.id,
      freeShipping: false,
      description: "Tênis Converse All Star clássico",
      stock: { create: { quantity: 40 } },
    },
  });

  const product10 = await prisma.product.create({
    data: {
      name: "Tênis Nike Revolution 6",
      price: 249.99,
      categoryId: category1.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Tênis Nike Revolution 6 para corrida diária",
      stock: { create: { quantity: 35 } },
    },
  });

  const product11 = await prisma.product.create({
    data: {
      name: "Tênis Adidas Grand Court",
      price: 229.99,
      categoryId: category1.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Tênis Adidas Grand Court casual",
      stock: { create: { quantity: 28 } },
    },
  });

  const product12 = await prisma.product.create({
    data: {
      name: "Tênis Puma Cali",
      price: 299.99,
      categoryId: category1.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Tênis Puma Cali feminino",
      stock: { create: { quantity: 18 } },
    },
  });

  const product13 = await prisma.product.create({
    data: {
      name: "Tênis Under Armour Charged",
      price: 389.99,
      categoryId: category1.id,
      brandId: brand9.id,
      freeShipping: true,
      description: "Tênis Under Armour Charged para treino",
      stock: { create: { quantity: 16 } },
    },
  });

  const product14 = await prisma.product.create({
    data: {
      name: "Tênis Fila Disruptor",
      price: 319.99,
      categoryId: category1.id,
      brandId: brand6.id,
      freeShipping: false,
      description: "Tênis Fila Disruptor chunky",
      stock: { create: { quantity: 24 } },
    },
  });

  const product15 = await prisma.product.create({
    data: {
      name: "Tênis Lacoste Graduate",
      price: 459.99,
      categoryId: category1.id,
      brandId: brand14.id,
      freeShipping: true,
      description: "Tênis Lacoste Graduate premium",
      stock: { create: { quantity: 14 } },
    },
  });

  // CAMISETAS (10 produtos)
  const product16 = await prisma.product.create({
    data: {
      name: "Camiseta Nike Dri-FIT",
      price: 89.99,
      categoryId: category3.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Camiseta Nike com tecnologia Dri-FIT",
      stock: { create: { quantity: 50 } },
    },
  });

  const product17 = await prisma.product.create({
    data: {
      name: "Camiseta Adidas Essentials",
      price: 79.99,
      categoryId: category3.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Camiseta Adidas Essentials básica",
      stock: { create: { quantity: 60 } },
    },
  });

  const product18 = await prisma.product.create({
    data: {
      name: "Camiseta Puma Sport",
      price: 69.99,
      categoryId: category3.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Camiseta Puma para esportes",
      stock: { create: { quantity: 45 } },
    },
  });

  const product19 = await prisma.product.create({
    data: {
      name: "Camiseta Under Armour Tech",
      price: 99.99,
      categoryId: category3.id,
      brandId: brand9.id,
      freeShipping: false,
      description: "Camiseta Under Armour Tech respirável",
      stock: { create: { quantity: 38 } },
    },
  });

  const product20 = await prisma.product.create({
    data: {
      name: "Camiseta Reebok Training",
      price: 74.99,
      categoryId: category3.id,
      brandId: brand7.id,
      freeShipping: false,
      description: "Camiseta Reebok para treino",
      stock: { create: { quantity: 42 } },
    },
  });

  const product21 = await prisma.product.create({
    data: {
      name: "Camiseta Fila Classic",
      price: 59.99,
      categoryId: category3.id,
      brandId: brand6.id,
      freeShipping: false,
      description: "Camiseta Fila clássica",
      stock: { create: { quantity: 55 } },
    },
  });

  const product22 = await prisma.product.create({
    data: {
      name: "Camiseta Lacoste Polo",
      price: 329.99,
      categoryId: category3.id,
      brandId: brand14.id,
      freeShipping: true,
      description: "Camiseta Polo Lacoste premium",
      stock: { create: { quantity: 20 } },
    },
  });

  const product23 = await prisma.product.create({
    data: {
      name: "Camiseta Vans Logo",
      price: 64.99,
      categoryId: category3.id,
      brandId: brand4.id,
      freeShipping: false,
      description: "Camiseta Vans com logo",
      stock: { create: { quantity: 48 } },
    },
  });

  const product24 = await prisma.product.create({
    data: {
      name: "Camiseta New Balance Graphic",
      price: 84.99,
      categoryId: category3.id,
      brandId: brand8.id,
      freeShipping: false,
      description: "Camiseta New Balance com estampa",
      stock: { create: { quantity: 36 } },
    },
  });

  const product25 = await prisma.product.create({
    data: {
      name: "Camiseta Oakley Performance",
      price: 109.99,
      categoryId: category3.id,
      brandId: brand5.id,
      freeShipping: false,
      description: "Camiseta Oakley de alta performance",
      stock: { create: { quantity: 30 } },
    },
  });

  // MOCHILAS (8 produtos)
  const product26 = await prisma.product.create({
    data: {
      name: "Mochila Nike Brasilia",
      price: 159.99,
      categoryId: category4.id,
      brandId: brand1.id,
      freeShipping: true,
      description: "Mochila Nike Brasilia esportiva",
      stock: { create: { quantity: 25 } },
    },
  });

  const product27 = await prisma.product.create({
    data: {
      name: "Mochila Adidas Classic",
      price: 179.99,
      categoryId: category4.id,
      brandId: brand2.id,
      freeShipping: true,
      description: "Mochila Adidas Classic para uso diário",
      stock: { create: { quantity: 20 } },
    },
  });

  const product28 = await prisma.product.create({
    data: {
      name: "Mochila Vans Old Skool",
      price: 199.99,
      categoryId: category4.id,
      brandId: brand4.id,
      freeShipping: true,
      description: "Mochila Vans Old Skool resistente",
      stock: { create: { quantity: 18 } },
    },
  });

  const product29 = await prisma.product.create({
    data: {
      name: "Mochila Puma Phase",
      price: 129.99,
      categoryId: category4.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Mochila Puma Phase básica",
      stock: { create: { quantity: 30 } },
    },
  });

  const product30 = await prisma.product.create({
    data: {
      name: "Mochila Under Armour Hustle",
      price: 249.99,
      categoryId: category4.id,
      brandId: brand9.id,
      freeShipping: true,
      description: "Mochila Under Armour Hustle grande capacidade",
      stock: { create: { quantity: 15 } },
    },
  });

  const product31 = await prisma.product.create({
    data: {
      name: "Mochila Oakley Kitchen Sink",
      price: 399.99,
      categoryId: category4.id,
      brandId: brand5.id,
      freeShipping: true,
      description: "Mochila Oakley Kitchen Sink tática",
      stock: { create: { quantity: 10 } },
    },
  });

  const product32 = await prisma.product.create({
    data: {
      name: "Mochila Fila Utility",
      price: 139.99,
      categoryId: category4.id,
      brandId: brand6.id,
      freeShipping: false,
      description: "Mochila Fila Utility versátil",
      stock: { create: { quantity: 22 } },
    },
  });

  const product33 = await prisma.product.create({
    data: {
      name: "Mochila Reebok Training",
      price: 169.99,
      categoryId: category4.id,
      brandId: brand7.id,
      freeShipping: true,
      description: "Mochila Reebok Training para academia",
      stock: { create: { quantity: 17 } },
    },
  });

  // CALÇAS (6 produtos)
  const product34 = await prisma.product.create({
    data: {
      name: "Calça Nike Tech Fleece",
      price: 349.99,
      categoryId: category6.id,
      brandId: brand1.id,
      freeShipping: true,
      description: "Calça Nike Tech Fleece premium",
      stock: { create: { quantity: 20 } },
    },
  });

  const product35 = await prisma.product.create({
    data: {
      name: "Calça Adidas Tiro",
      price: 279.99,
      categoryId: category6.id,
      brandId: brand2.id,
      freeShipping: true,
      description: "Calça Adidas Tiro para treino",
      stock: { create: { quantity: 25 } },
    },
  });

  const product36 = await prisma.product.create({
    data: {
      name: "Calça Puma Essentials",
      price: 189.99,
      categoryId: category6.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Calça Puma Essentials básica",
      stock: { create: { quantity: 28 } },
    },
  });

  const product37 = await prisma.product.create({
    data: {
      name: "Calça Fila Training",
      price: 149.99,
      categoryId: category6.id,
      brandId: brand6.id,
      freeShipping: false,
      description: "Calça Fila para treino",
      stock: { create: { quantity: 30 } },
    },
  });

  const product38 = await prisma.product.create({
    data: {
      name: "Calça Levi's 501",
      price: 399.99,
      categoryId: category6.id,
      brandId: brand10.id,
      freeShipping: true,
      description: "Calça jeans Levi's 501 original",
      stock: { create: { quantity: 18 } },
    },
  });

  const product39 = await prisma.product.create({
    data: {
      name: "Calça Under Armour Jogger",
      price: 299.99,
      categoryId: category6.id,
      brandId: brand9.id,
      freeShipping: true,
      description: "Calça jogger Under Armour",
      stock: { create: { quantity: 22 } },
    },
  });

  // SHORTS (5 produtos)
  const product40 = await prisma.product.create({
    data: {
      name: "Short Nike Dri-FIT",
      price: 129.99,
      categoryId: category11.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Short Nike Dri-FIT para corrida",
      stock: { create: { quantity: 35 } },
    },
  });

  const product41 = await prisma.product.create({
    data: {
      name: "Short Adidas 3-Stripes",
      price: 119.99,
      categoryId: category11.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Short Adidas 3-Stripes clássico",
      stock: { create: { quantity: 40 } },
    },
  });

  const product42 = await prisma.product.create({
    data: {
      name: "Short Puma Active",
      price: 99.99,
      categoryId: category11.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Short Puma Active esportivo",
      stock: { create: { quantity: 38 } },
    },
  });

  const product43 = await prisma.product.create({
    data: {
      name: "Short Mizuno Run",
      price: 139.99,
      categoryId: category11.id,
      brandId: brand12.id,
      freeShipping: false,
      description: "Short Mizuno para corrida",
      stock: { create: { quantity: 26 } },
    },
  });

  const product44 = await prisma.product.create({
    data: {
      name: "Short Speedo Swim",
      price: 89.99,
      categoryId: category11.id,
      brandId: brand15.id,
      freeShipping: false,
      description: "Short Speedo para natação",
      stock: { create: { quantity: 32 } },
    },
  });

  // ACESSÓRIOS (8 produtos)
  const product45 = await prisma.product.create({
    data: {
      name: "Óculos Oakley Radar",
      price: 499.99,
      categoryId: category5.id,
      brandId: brand5.id,
      freeShipping: true,
      description: "Óculos esportivo Oakley Radar",
      stock: { create: { quantity: 12 } },
    },
  });

  const product46 = await prisma.product.create({
    data: {
      name: "Relógio Nike Sport",
      price: 299.99,
      categoryId: category15.id,
      brandId: brand1.id,
      freeShipping: true,
      description: "Relógio Nike Sport digital",
      stock: { create: { quantity: 15 } },
    },
  });

  const product47 = await prisma.product.create({
    data: {
      name: "Luvas Nike Gym",
      price: 79.99,
      categoryId: category14.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Luvas Nike para academia",
      stock: { create: { quantity: 28 } },
    },
  });

  const product48 = await prisma.product.create({
    data: {
      name: "Garrafa Puma Hydration",
      price: 49.99,
      categoryId: category5.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Garrafa Puma de hidratação",
      stock: { create: { quantity: 45 } },
    },
  });

  const product49 = await prisma.product.create({
    data: {
      name: "Toalha Adidas Sport",
      price: 59.99,
      categoryId: category5.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Toalha Adidas para esportes",
      stock: { create: { quantity: 40 } },
    },
  });

  const product50 = await prisma.product.create({
    data: {
      name: "Boné Nike Featherlight",
      price: 89.99,
      categoryId: category9.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Boné Nike Featherlight leve",
      stock: { create: { quantity: 35 } },
    },
  });

  const product51 = await prisma.product.create({
    data: {
      name: "Boné Under Armour Flex",
      price: 79.99,
      categoryId: category9.id,
      brandId: brand9.id,
      freeShipping: false,
      description: "Boné flexível Under Armour",
      stock: { create: { quantity: 30 } },
    },
  });

  const product52 = await prisma.product.create({
    data: {
      name: "Meias Nike Cushion",
      price: 39.99,
      categoryId: category8.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Meias Nike com amortecimento - Kit com 3 pares",
      stock: { create: { quantity: 60 } },
    },
  });

  // JAQUETAS (4 produtos)
  const product53 = await prisma.product.create({
    data: {
      name: "Jaqueta Nike Windrunner",
      price: 449.99,
      categoryId: category7.id,
      brandId: brand1.id,
      freeShipping: true,
      description: "Jaqueta Nike Windrunner corta-vento",
      stock: { create: { quantity: 15 } },
    },
  });

  const product54 = await prisma.product.create({
    data: {
      name: "Jaqueta Adidas Own The Run",
      price: 389.99,
      categoryId: category7.id,
      brandId: brand2.id,
      freeShipping: true,
      description: "Jaqueta Adidas para corrida",
      stock: { create: { quantity: 18 } },
    },
  });

  const product55 = await prisma.product.create({
    data: {
      name: "Jaqueta Reebok Wind",
      price: 299.99,
      categoryId: category7.id,
      brandId: brand7.id,
      freeShipping: true,
      description: "Jaqueta corta-vento Reebok",
      stock: { create: { quantity: 20 } },
    },
  });

  const product56 = await prisma.product.create({
    data: {
      name: "Jaqueta Puma Evostripe",
      price: 329.99,
      categoryId: category7.id,
      brandId: brand3.id,
      freeShipping: true,
      description: "Jaqueta Puma Evostripe warm-up",
      stock: { create: { quantity: 16 } },
    },
  });

  // CHINELOS/SANDÁLIAS (4 produtos)
  const product57 = await prisma.product.create({
    data: {
      name: "Chinelo Nike Benassi",
      price: 79.99,
      categoryId: category13.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Chinelo Nike Benassi slide",
      stock: { create: { quantity: 50 } },
    },
  });

  const product58 = await prisma.product.create({
    data: {
      name: "Chinelo Adidas Adilette",
      price: 69.99,
      categoryId: category13.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Chinelo Adidas Adilette confortável",
      stock: { create: { quantity: 55 } },
    },
  });

  const product59 = await prisma.product.create({
    data: {
      name: "Sandália Oakley Operative",
      price: 199.99,
      categoryId: category2.id,
      brandId: brand5.id,
      freeShipping: true,
      description: "Sandália Oakley Operative esportiva",
      stock: { create: { quantity: 20 } },
    },
  });

  const product60 = await prisma.product.create({
    data: {
      name: "Chinelo Puma Popcat",
      price: 59.99,
      categoryId: category13.id,
      brandId: brand3.id,
      freeShipping: false,
      description: "Chinelo Puma Popcat slide",
      stock: { create: { quantity: 48 } },
    },
  });

  // BOLSAS (3 produtos)
  const product61 = await prisma.product.create({
    data: {
      name: "Bolsa Nike Heritage",
      price: 149.99,
      categoryId: category10.id,
      brandId: brand1.id,
      freeShipping: true,
      description: "Bolsa transversal Nike Heritage",
      stock: { create: { quantity: 25 } },
    },
  });

  const product62 = await prisma.product.create({
    data: {
      name: "Bolsa Adidas Festival",
      price: 129.99,
      categoryId: category10.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Bolsa Adidas Festival pequena",
      stock: { create: { quantity: 30 } },
    },
  });

  const product63 = await prisma.product.create({
    data: {
      name: "Bolsa Levi's Casual",
      price: 179.99,
      categoryId: category10.id,
      brandId: brand10.id,
      freeShipping: true,
      description: "Bolsa casual Levi's",
      stock: { create: { quantity: 18 } },
    },
  });

  // REGATAS (3 produtos)
  const product64 = await prisma.product.create({
    data: {
      name: "Regata Nike Miler",
      price: 69.99,
      categoryId: category12.id,
      brandId: brand1.id,
      freeShipping: false,
      description: "Regata Nike Miler para corrida",
      stock: { create: { quantity: 40 } },
    },
  });

  const product65 = await prisma.product.create({
    data: {
      name: "Regata Adidas Own The Run",
      price: 64.99,
      categoryId: category12.id,
      brandId: brand2.id,
      freeShipping: false,
      description: "Regata Adidas Own The Run respirável",
      stock: { create: { quantity: 38 } },
    },
  });

  const product66 = await prisma.product.create({
    data: {
      name: "Regata Under Armour Tech",
      price: 79.99,
      categoryId: category12.id,
      brandId: brand9.id,
      freeShipping: false,
      description: "Regata Under Armour Tech performance",
      stock: { create: { quantity: 35 } },
    },
  });

  console.log(`✅ ${66} produtos criados!`);

  // ============================================
  // USUÁRIOS
  // ============================================
  console.log("👤 Criando usuários...");

  const user1 = await prisma.user.create({
    data: {
      name: "João Silva",
      cpf: "12345678901",
      email: "joao@teste.com",
      password: bcrypt.hashSync("123456", 10),
      role: "CUSTOMER",
      phone: "11999999999",
      address: "Rua das Flores, 123, São Paulo - SP",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Maria Santos",
      cpf: "98765432100",
      email: "maria@teste.com",
      password: bcrypt.hashSync("123456", 10),
      role: "CUSTOMER",
      phone: "11988888888",
      address: "Av. Paulista, 1000, São Paulo - SP",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Pedro Oliveira",
      cpf: "45678912300",
      email: "pedro@teste.com",
      password: bcrypt.hashSync("123456", 10),
      role: "CUSTOMER",
      phone: "11977777777",
      address: "Rua Oscar Freire, 500, São Paulo - SP",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin Sistema",
      cpf: "11111111111",
      email: "admin@teste.com",
      password: bcrypt.hashSync("123456", 10),
      role: "ADMIN",
      phone: "11999999991",
      address: "Rua Admin, 1, São Paulo - SP",
    },
  });

  console.log(`✅ ${4} usuários criados!`);

  // ============================================
  // VENDAS E ORDERS (MOCKS)
  // ============================================
  console.log("💰 Criando vendas e orders...");

  // VENDA 1 - João (PAID)
  const sale1 = await prisma.sale.create({
    data: {
      userId: user1.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 779.98,
      shippingAddress: "Rua das Flores, 123, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_1",
      stripePaymentId: "pi_mock_1",
      paidAt: new Date("2025-11-20T14:30:00"),
      createdAt: new Date("2025-11-20T14:25:00"),
      orders: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            priceUnit: 399.99,
            subtotal: 399.99,
          },
          {
            productId: product16.id,
            quantity: 2,
            priceUnit: 89.99,
            subtotal: 179.98,
          },
          {
            productId: product26.id,
            quantity: 1,
            priceUnit: 159.99,
            subtotal: 159.99,
          },
          {
            productId: product50.id,
            quantity: 1,
            priceUnit: 89.99,
            subtotal: 89.99,
          },
        ],
      },
    },
  });

  // VENDA 2 - Maria (PAID)
  const sale2 = await prisma.sale.create({
    data: {
      userId: user2.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 1249.96,
      shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_2",
      stripePaymentId: "pi_mock_2",
      paidAt: new Date("2025-11-21T10:15:00"),
      createdAt: new Date("2025-11-21T10:10:00"),
      orders: {
        create: [
          {
            productId: product2.id,
            quantity: 1,
            priceUnit: 599.99,
            subtotal: 599.99,
          },
          {
            productId: product34.id,
            quantity: 1,
            priceUnit: 349.99,
            subtotal: 349.99,
          },
          {
            productId: product22.id,
            quantity: 1,
            priceUnit: 329.99,
            subtotal: 329.99,
          },
        ],
      },
    },
  });

  // VENDA 3 - Pedro (PROCESSING)
  const sale3 = await prisma.sale.create({
    data: {
      userId: user3.id,
      status: "PROCESSING",
      paymentMethod: "CREDIT_CARD",
      totalValue: 999.95,
      shippingAddress: "Rua Oscar Freire, 500, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_3",
      stripePaymentId: "pi_mock_3",
      paidAt: new Date("2025-11-22T09:00:00"),
      createdAt: new Date("2025-11-22T08:55:00"),
      orders: {
        create: [
          {
            productId: product5.id,
            quantity: 1,
            priceUnit: 699.99,
            subtotal: 699.99,
          },
          {
            productId: product53.id,
            quantity: 1,
            priceUnit: 449.99,
            subtotal: 449.99,
          },
        ],
      },
    },
  });

  // VENDA 4 - João (PENDING)
  const sale4 = await prisma.sale.create({
    data: {
      userId: user1.id,
      status: "PENDING",
      paymentMethod: "CREDIT_CARD",
      totalValue: 649.97,
      shippingAddress: "Rua das Flores, 123, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_4",
      createdAt: new Date("2025-11-23T11:00:00"),
      orders: {
        create: [
          {
            productId: product9.id,
            quantity: 2,
            priceUnit: 199.99,
            subtotal: 399.98,
          },
          {
            productId: product40.id,
            quantity: 1,
            priceUnit: 129.99,
            subtotal: 129.99,
          },
          {
            productId: product52.id,
            quantity: 3,
            priceUnit: 39.99,
            subtotal: 119.97,
          },
        ],
      },
    },
  });

  // VENDA 5 - Maria (PAID)
  const sale5 = await prisma.sale.create({
    data: {
      userId: user2.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 319.96,
      shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_5",
      stripePaymentId: "pi_mock_5",
      paidAt: new Date("2025-11-19T16:45:00"),
      createdAt: new Date("2025-11-19T16:40:00"),
      orders: {
        create: [
          {
            productId: product18.id,
            quantity: 2,
            priceUnit: 69.99,
            subtotal: 139.98,
          },
          {
            productId: product58.id,
            quantity: 2,
            priceUnit: 69.99,
            subtotal: 139.98,
          },
          {
            productId: product41.id,
            quantity: 1,
            priceUnit: 119.99,
            subtotal: 119.99,
          },
        ],
      },
    },
  });

  // VENDA 6 - Pedro (CANCELLED)
  const sale6 = await prisma.sale.create({
    data: {
      userId: user3.id,
      status: "CANCELLED",
      paymentMethod: "CREDIT_CARD",
      totalValue: 489.98,
      shippingAddress: "Rua Oscar Freire, 500, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_6",
      createdAt: new Date("2025-11-18T13:20:00"),
      orders: {
        create: [
          {
            productId: product28.id,
            quantity: 1,
            priceUnit: 199.99,
            subtotal: 199.99,
          },
          {
            productId: product35.id,
            quantity: 1,
            priceUnit: 279.99,
            subtotal: 279.99,
          },
        ],
      },
    },
  });

  // ============================================
  // VENDAS DE OUTUBRO
  // ============================================
  
  // VENDA 7 - João (PAID) - Outubro
  const sale7 = await prisma.sale.create({
    data: {
      userId: user1.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 889.96,
      shippingAddress: "Rua das Flores, 123, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_7",
      stripePaymentId: "pi_mock_7",
      paidAt: new Date("2025-10-25T15:30:00"),
      createdAt: new Date("2025-10-25T15:25:00"),
      orders: {
        create: [
          {
            productId: product6.id,
            quantity: 1,
            priceUnit: 549.99,
            subtotal: 549.99,
          },
          {
            productId: product19.id,
            quantity: 2,
            priceUnit: 99.99,
            subtotal: 199.98,
          },
          {
            productId: product41.id,
            quantity: 1,
            priceUnit: 119.99,
            subtotal: 119.99,
          },
        ],
      },
    },
  });

  // VENDA 8 - Maria (PAID) - Outubro
  const sale8 = await prisma.sale.create({
    data: {
      userId: user2.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 1099.97,
      shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_8",
      stripePaymentId: "pi_mock_8",
      paidAt: new Date("2025-10-20T11:00:00"),
      createdAt: new Date("2025-10-20T10:55:00"),
      orders: {
        create: [
          {
            productId: product5.id,
            quantity: 1,
            priceUnit: 699.99,
            subtotal: 699.99,
          },
          {
            productId: product30.id,
            quantity: 1,
            priceUnit: 249.99,
            subtotal: 249.99,
          },
          {
            productId: product47.id,
            quantity: 2,
            priceUnit: 79.99,
            subtotal: 159.98,
          },
        ],
      },
    },
  });

  // VENDA 9 - Pedro (PAID) - Outubro
  const sale9 = await prisma.sale.create({
    data: {
      userId: user3.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 579.97,
      shippingAddress: "Rua Oscar Freire, 500, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_9",
      stripePaymentId: "pi_mock_9",
      paidAt: new Date("2025-10-15T14:20:00"),
      createdAt: new Date("2025-10-15T14:15:00"),
      orders: {
        create: [
          {
            productId: product14.id,
            quantity: 1,
            priceUnit: 319.99,
            subtotal: 319.99,
          },
          {
            productId: product37.id,
            quantity: 1,
            priceUnit: 149.99,
            subtotal: 149.99,
          },
          {
            productId: product50.id,
            quantity: 1,
            priceUnit: 89.99,
            subtotal: 89.99,
          },
        ],
      },
    },
  });

  // VENDA 10 - João (PAID) - Outubro
  const sale10 = await prisma.sale.create({
    data: {
      userId: user1.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 419.96,
      shippingAddress: "Rua das Flores, 123, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_10",
      stripePaymentId: "pi_mock_10",
      paidAt: new Date("2025-10-10T09:45:00"),
      createdAt: new Date("2025-10-10T09:40:00"),
      orders: {
        create: [
          {
            productId: product17.id,
            quantity: 3,
            priceUnit: 79.99,
            subtotal: 239.97,
          },
          {
            productId: product42.id,
            quantity: 1,
            priceUnit: 99.99,
            subtotal: 99.99,
          },
          {
            productId: product57.id,
            quantity: 1,
            priceUnit: 79.99,
            subtotal: 79.99,
          },
        ],
      },
    },
  });

  // VENDA 11 - Maria (REFUNDED) - Outubro
  const sale11 = await prisma.sale.create({
    data: {
      userId: user2.id,
      status: "REFUNDED",
      paymentMethod: "CREDIT_CARD",
      totalValue: 649.98,
      shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_11",
      stripePaymentId: "pi_mock_11",
      paidAt: new Date("2025-10-05T16:30:00"),
      createdAt: new Date("2025-10-05T16:25:00"),
      orders: {
        create: [
          {
            productId: product12.id,
            quantity: 1,
            priceUnit: 299.99,
            subtotal: 299.99,
          },
          {
            productId: product34.id,
            quantity: 1,
            priceUnit: 349.99,
            subtotal: 349.99,
          },
        ],
      },
    },
  });

  // ============================================
  // VENDAS DE SETEMBRO
  // ============================================

  // VENDA 12 - Pedro (PAID) - Setembro
  const sale12 = await prisma.sale.create({
    data: {
      userId: user3.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 1249.96,
      shippingAddress: "Rua Oscar Freire, 500, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_12",
      stripePaymentId: "pi_mock_12",
      paidAt: new Date("2025-09-28T13:15:00"),
      createdAt: new Date("2025-09-28T13:10:00"),
      orders: {
        create: [
          {
            productId: product2.id,
            quantity: 1,
            priceUnit: 599.99,
            subtotal: 599.99,
          },
          {
            productId: product53.id,
            quantity: 1,
            priceUnit: 449.99,
            subtotal: 449.99,
          },
          {
            productId: product26.id,
            quantity: 1,
            priceUnit: 159.99,
            subtotal: 159.99,
          },
        ],
      },
    },
  });

  // VENDA 13 - João (PAID) - Setembro
  const sale13 = await prisma.sale.create({
    data: {
      userId: user1.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 849.96,
      shippingAddress: "Rua das Flores, 123, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_13",
      stripePaymentId: "pi_mock_13",
      paidAt: new Date("2025-09-22T10:30:00"),
      createdAt: new Date("2025-09-22T10:25:00"),
      orders: {
        create: [
          {
            productId: product15.id,
            quantity: 1,
            priceUnit: 459.99,
            subtotal: 459.99,
          },
          {
            productId: product54.id,
            quantity: 1,
            priceUnit: 389.99,
            subtotal: 389.99,
          },
        ],
      },
    },
  });

  // VENDA 14 - Maria (PAID) - Setembro
  const sale14 = await prisma.sale.create({
    data: {
      userId: user2.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 379.95,
      shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_14",
      stripePaymentId: "pi_mock_14",
      paidAt: new Date("2025-09-18T15:45:00"),
      createdAt: new Date("2025-09-18T15:40:00"),
      orders: {
        create: [
          {
            productId: product4.id,
            quantity: 1,
            priceUnit: 279.99,
            subtotal: 279.99,
          },
          {
            productId: product40.id,
            quantity: 1,
            priceUnit: 129.99,
            subtotal: 129.99,
          },
        ],
      },
    },
  });

  // VENDA 15 - Pedro (PAID) - Setembro
  const sale15 = await prisma.sale.create({
    data: {
      userId: user3.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 579.96,
      shippingAddress: "Rua Oscar Freire, 500, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_15",
      stripePaymentId: "pi_mock_15",
      paidAt: new Date("2025-09-12T11:20:00"),
      createdAt: new Date("2025-09-12T11:15:00"),
      orders: {
        create: [
          {
            productId: product22.id,
            quantity: 1,
            priceUnit: 329.99,
            subtotal: 329.99,
          },
          {
            productId: product36.id,
            quantity: 1,
            priceUnit: 189.99,
            subtotal: 189.99,
          },
          {
            productId: product51.id,
            quantity: 1,
            priceUnit: 79.99,
            subtotal: 79.99,
          },
        ],
      },
    },
  });

  // VENDA 16 - João (PAID) - Setembro
  const sale16 = await prisma.sale.create({
    data: {
      userId: user1.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 299.97,
      shippingAddress: "Rua das Flores, 123, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_16",
      stripePaymentId: "pi_mock_16",
      paidAt: new Date("2025-09-08T14:00:00"),
      createdAt: new Date("2025-09-08T13:55:00"),
      orders: {
        create: [
          {
            productId: product18.id,
            quantity: 2,
            priceUnit: 69.99,
            subtotal: 139.98,
          },
          {
            productId: product58.id,
            quantity: 1,
            priceUnit: 69.99,
            subtotal: 69.99,
          },
          {
            productId: product16.id,
            quantity: 1,
            priceUnit: 89.99,
            subtotal: 89.99,
          },
        ],
      },
    },
  });

  // VENDA 17 - Maria (PAID) - Setembro
  const sale17 = await prisma.sale.create({
    data: {
      userId: user2.id,
      status: "PAID",
      paymentMethod: "CREDIT_CARD",
      totalValue: 729.97,
      shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
      stripeCheckoutId: "cs_test_mock_17",
      stripePaymentId: "pi_mock_17",
      paidAt: new Date("2025-09-03T09:30:00"),
      createdAt: new Date("2025-09-03T09:25:00"),
      orders: {
        create: [
          {
            productId: product8.id,
            quantity: 1,
            priceUnit: 379.99,
            subtotal: 379.99,
          },
          {
            productId: product35.id,
            quantity: 1,
            priceUnit: 279.99,
            subtotal: 279.99,
          },
        ],
      },
    },
  });

  console.log(`✅ ${17} vendas criadas com orders!`);

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log(`📊 Resumo:`);
  console.log(`   - ${15} Categorias`);
  console.log(`   - ${15} Marcas`);
  console.log(`   - ${66} Produtos`);
  console.log(`   - ${4} Usuários (3 clientes + 1 admin)`);
  console.log(`   - ${17} Vendas`);
  console.log(`   - ${45} Orders`);
  console.log(`\n📅 Distribuição de vendas por mês:`);
  console.log(`   - Novembro 2025: 6 vendas`);
  console.log(`   - Outubro 2025: 6 vendas`);
  console.log(`   - Setembro 2025: 5 vendas`);
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
