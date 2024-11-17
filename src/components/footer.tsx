export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jacqueline food</h3>
            <p className="text-green-200">
              Des jus frais et naturels pour votre bien-être quotidien.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-green-200">Email: maisonjacqueline@gmail.com</p>
            <p className="text-green-200">Tél: +243 978 095 720</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <p className="text-green-200">Lun-Ven: 9h-19h</p>
            <p className="text-green-200">Sam: 10h-18h</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200">
          <p>&copy; 2024 Jus Nature. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
