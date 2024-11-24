type ProductType = {
  id: number;
  name: string;
  price: string;
  description: string;
};

const products = [
  {
    id: 1,
    name: "Jus de tangawizi",
    price: "1.7 $",
    description: "Tangawizi, citron et menthe",
  },
  {
    id: 2,
    name: "Jus Vert Détox",
    price: "6.99€",
    description: "Épinards, céleri, pomme et gingembre",
  },
  {
    id: 3,
    name: "Smoothie Fruits Rouges",
    price: "6.49€",
    description: "Mélange de fruits rouges antioxydants",
  },
];

const ProductCard = (product: ProductType) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="h-48 bg-green-100 rounded-lg mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-600 font-bold text-lg">
          {product.price}
        </span>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Commander
        </button>
      </div>
    </div>
  );
};
export default function Products() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Nos Jus Frais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
