export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Notre Histoire
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Depuis 2019, nous nous engageons à produire des jus de fruits et
            légumes de la plus haute qualité. Nos ingrédients sont soigneusement
            sélectionnés auprès de producteurs locaux et biologiques.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">100% Bio</h3>
              <p className="text-gray-600">
                Ingrédients issus de l&apos;agriculture biologique
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">🍎</div>
              <h3 className="text-xl font-semibold mb-2">Pressé à Froid</h3>
              <p className="text-gray-600">
                Préservation maximale des nutriments
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Local</h3>
              <p className="text-gray-600">
                Partenariat avec des producteurs locaux
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
