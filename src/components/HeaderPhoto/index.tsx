export const HeaderPhoto = () => {
  return (
    <div className="relative w-full h-56 md:h-96 bg-black maxsm:h-[600px]">
      <img
        className="top-0 left-0 w-full h-full object-cover  opacity-[50%]"
        src="https://wallpapercave.com/wp/wp2619685.jpg"
        alt="Header Photo Motors Shop"
      />
      <div className="absolute top-1/2 left-1/2 maxsm:top-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center w-[90%] ">
        <h2 className="text-white text-4xl font-semibold maxsm:text-[32px] lexend">
          Motor Shop
        </h2>
        <h3 className="text-white text-2xl font-normal mt-[30px] maxsm:text-[24px] lexend">
          A melhor plataforma de anúncios de carros do país
        </h3>
      </div>
    </div>
  );
};
