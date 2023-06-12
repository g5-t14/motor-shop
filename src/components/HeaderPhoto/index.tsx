import photoCar from "../../assets/photoCar.svg"

export const HeaderPhoto = () => {
    return (
      <div className="relative w-full">
        <img
          className="top-0 left-0 w-full h-full object-cover brightness-50"
          src={photoCar}
          alt="Header Photo Motors Shop"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-white text-4xl font-semibold font-inter max-sm:text-base">
            Motor Shop
          </h2>
          <h3 className="text-white text-2xl font-normal font-inter mt-4 max-sm:text-base">
            A melhor plataforma de anúncios de carros do país
          </h3>
        </div>
      </div>
    );
  };