import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Categorias
  const category1 = await prisma.category.create({ data: { name: "Tênis" } });
  const category2 = await prisma.category.create({
    data: { name: "Sandálias" },
  });
  const category3 = await prisma.category.create({
    data: { name: "Camisetas" },
  });
  const category4 = await prisma.category.create({
    data: { name: "Mochilas" },
  });
  const category5 = await prisma.category.create({
    data: { name: "Acessórios" },
  });
  const category6 = await prisma.category.create({ data: { name: "Calças" } });
  const category7 = await prisma.category.create({
    data: { name: "Jaquetas" },
  });
  const category8 = await prisma.category.create({ data: { name: "Meias" } });
  const category9 = await prisma.category.create({ data: { name: "Bonés" } });
  const category10 = await prisma.category.create({ data: { name: "Bolsas" } });

  // Marcas
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

  // Produtos
  await prisma.product.create({
    data: {
      name: "Tênis Nike Air",
      price: 399.99,
      categoryId: category1.id,
      brandId: brand1.id,
      freeShipping: true,
      photo: "https://imgnike-a.akamaihd.net/360x360/029489INA1.jpg",
      description: "Tênis Nike Air confortável",
      stock: { create: { quantity: 10 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Tênis Adidas Run",
      price: 299.99,
      categoryId: category1.id,
      brandId: brand2.id,
      freeShipping: false,
      photo: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/eb71f51488f04e78952ad8c0fb5fe58e_9366/Tenis_Corrida_Adistar_4_Azul_JR0310_HM1.jpg",
      description: "Tênis Adidas para corrida",
      stock: { create: { quantity: 15 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Camiseta Puma Sport",
      price: 99.99,
      categoryId: category3.id,
      brandId: brand3.id,
      freeShipping: false,
      photo: "https://magicfeet.vtexassets.com/arquivos/ids/181664-1200-auto?v=637493414687670000&width=1200&height=auto&aspect=true",
      description: "Camiseta Puma para esportes",
      stock: { create: { quantity: 20 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Mochila Vans Classic",
      price: 199.99,
      categoryId: category4.id,
      brandId: brand4.id,
      freeShipping: true,
      photo: "https://secure-static.vans.com.br/medias/sys_master/vans/vans/h86/hc6/h00/h00/11972024238110/5000301080001U-01-BASEIMAGE-Hires.jpg",
      description: "Mochila Vans resistente",
      stock: { create: { quantity: 8 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Óculos Oakley Radar",
      price: 499.99,
      categoryId: category5.id,
      brandId: brand5.id,
      freeShipping: true,
      photo: "https://assets2.oakley.com/cdn-record-files-pi/6cff2a30-7b39-4d58-ab3f-a82300c6a6e3/6ec8cba8-efcc-4f25-8ac9-ad7901598e5f/0OO9208__920855__P21__shad__qt.png?impolicy=OO_ratio&width=3000",
      description: "Óculos esportivo Oakley",
      stock: { create: { quantity: 5 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Calça Fila Training",
      price: 149.99,
      categoryId: category6.id,
      brandId: brand6.id,
      freeShipping: false,
      photo: "https://fila.vteximg.com.br/arquivos/ids/920097-2000-2000/F11AT00906_1587.jpg?v=638513721183270000",
      description: "Calça Fila para treino",
      stock: { create: { quantity: 12 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Jaqueta Reebok Wind",
      price: 249.99,
      categoryId: category7.id,
      brandId: brand7.id,
      freeShipping: true,
      photo: "https://imgcentauro-a.akamaihd.net/400x400/M08UVD02A1.jpg",
      description: "Jaqueta corta-vento Reebok",
      stock: { create: { quantity: 7 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Meia New Balance Comfort",
      price: 29.99,
      categoryId: category8.id,
      brandId: brand8.id,
      freeShipping: false,
      photo: "https://static.prospin.com.br/media/catalog/product/cache/405628f615b5edf579edd0ef4cc16c7a/n/b/nb32a-002-39a43-meia-new-balance-lifestyle-basic-pack-com-03-unidades.jpg",
      description: "Meia confortável New Balance",
      stock: { create: { quantity: 30 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Boné Under Armour Flex",
      price: 59.99,
      categoryId: category9.id,
      brandId: brand9.id,
      freeShipping: false,
      photo: "https://underarmourbr.vtexassets.com/arquivos/ids/349880-1600-auto?v=638669471163830000&width=1600&height=auto&aspect=true",
      description: "Boné flexível Under Armour",
      stock: { create: { quantity: 18 } },
    },
  });
  await prisma.product.create({
    data: {
      name: "Bolsa Levi's Casual",
      price: 129.99,
      categoryId: category10.id,
      brandId: brand10.id,
      freeShipping: true,
      photo: "https://t-static.dafiti.com.br/I75h3-9e8VM_dBmag9m0oimil-U=/fit-in/430x623/static.dafiti.com.br/p/levis-bolsa-levis-ninny-marrom-1216-5524941-1-zoom.jpg",
      description: "Bolsa casual Levi's",
      stock: { create: { quantity: 6 } },
    },
  });

  // Usuário
  const user1 = await prisma.user.create({
    data: {
      name: "João Silva",
      cpf: "12345678901",
      email: "joao@example.com",
      password: "senha123",
      role: "CUSTOMER",
      phone: "11999999999",
      address: "Rua das Flores, 123",
    },
  });

  // Venda
  // const sale1 = await prisma.sale.create({
  //   data: {
  //     userId: user1.id,
  //     status: 'PAGO',
  //     value: 399.99
  //   }
  // });

  // Pedido
  //   await prisma.order.create({
  //     data: {
  //       saleId: sale1.id,
  //       productId: product1.id,
  //       quantity: 1,
  //       priceUnit: 399.99
  //     }
  //   });
  // }
}
main()
  .catch((e) => {
    console.log("lol");
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
