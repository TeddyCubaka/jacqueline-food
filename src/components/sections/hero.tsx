export default function Hero() {
  return (
    <div id="home" className="relative pt-16">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/images/product-presentation.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)",
        }}
      />
      <div className="relative h-screen bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Des Jus 100% Naturels
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Découvrez nos jus pressés à froid, sans additifs ni conservateurs
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition duration-300">
              Découvrir nos produits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}