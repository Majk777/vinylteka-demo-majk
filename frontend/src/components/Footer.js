import React from "react";
{
  /* <div className="footer h-32 bg-black bottom-1.5 mb-10  w-full">Footer</div> */
}
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Left section */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2 max-lg:text-center">
              O nas
            </h2>
            <p className="text-gray-400">
              Podziel się z innymi swoją audioteką. Znajdź nowe albumy i dziel
              się swoimi ulubionymi utworami z innymi.
            </p>
          </div>
          {/* Center section */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h2 className="text-2xl font-bold mb-2">Kontakt</h2>
            <p className="text-gray-400">Email: menclickowski@gmail.com</p>
            <p className="text-gray-400">Telefon: +48 123 456 789</p>
          </div>
          {/* Right section */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h2 className="text-2xl font-bold mb-2">Śledź nas</h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          &copy; 2024 Audioteka. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
