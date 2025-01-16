import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookingComponent } from "../atoms/booking";
import { Modal } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";

export default function Hero() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
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
              Des produits 100% Naturels
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              {/* Découvrez nos jus pasteurisés, sans additifs ni conservateurs */}
              choisissez la sante !
            </p>
            <div className="flex gap-5 max-md:flex-col w-full justify-center">
              <button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="w-full border-2 border-white bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition duration-300"
              >
                reserver une degustation
              </button>
              <button
                onClick={() => {
                  router.push("products");
                }}
                className="w-full border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-[#f0fdf473] transition duration-300"
              >
                Découvrir nos produits
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="flex justify-center items-center"
      >
        <div className="bg-white rounded-xl w-1/2 h-fit p-5 max-md:w-4/5">
          <span
            className="cursor-pointer flex justify-end"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <MdOutlineClose size={30} />
          </span>

          <BookingComponent />
        </div>
      </Modal>
    </div>
  );
}
