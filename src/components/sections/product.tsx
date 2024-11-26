import Image from "next/image";
import mangue33cl from "@/../public/images/jus/mangue.jpg";
import tanagawizi33cl from "@/../public/images/jus/tangawizi-33cl.jpg";
import ananas33cl from "@/../public/images/jus/ananas-33cl.jpg";

type ProductType = {
  id: number;
  name: string;
  price: string;
  description: string;
  litrage: string;
  url: string;
};

const products: ProductType[] = [
  {
    id: 1,
    name: "Jus de tangawizi",
    price: "1.7 $",
    description: "Tangawizi, citron et menthe",
    litrage: "33cl",
    url: tanagawizi33cl.src,
  },
  {
    id: 2,
    name: "Jus de mange",
    price: "1.7 $",
    description: "Épinards, céleri, pomme et gingembre",
    litrage: "33cl",
    url: mangue33cl.src,
  },
  {
    id: 3,
    name: "Jus d'ananas",
    price: "1.7 $",
    description: "100% Ananas",
    litrage: "33cl",
    url: ananas33cl.src,
  },
];

const ProductCard = (product: ProductType) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="h-60 bg-green-100 rounded-lg mb-4 overflow-hidden">
        {product.url && product.url.length > 0 ? (
          <Image
            height={200}
            width={200}
            src={product.url}
            alt={"image d'un jus"}
            className="w-full h-auto"
          />
        ) : (
          false
        )}
      </div>
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
