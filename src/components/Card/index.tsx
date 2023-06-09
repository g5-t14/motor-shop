export const Card = () => {
  return(
    <li className="w-[312px] h-[350px] flex flex-col gap-4"> 
      <div className="relative w-full border-2 border-transparent hover:border-2 hover:border-brand1">
        <div className="font-medium text-14 leading-6 absolute top-[11px] left-4 pr-2 pl-2 bg-grey4 text-white">Inativo</div>
        <div className="font-medium text-14 leading-6 absolute top-[11px] left-4 pr-2 pl-2 bg-brand1 text-white">Ativo</div>
        <div className="font-medium text-14 leading-6 absolute top-[1px] right-0 bg-random7  rounded-[2px] w-4 h-[27px] text-white text-center">$</div>
        <img className="w-full" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Cars Photo" />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="truncate font-semibold text-[16px] leading-5 text-grey1">Título</h3>
        <p className="text-grey2 font-normal text-[14px] leading-6 truncate whitespace-normal line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tenetur quam voluptas, vel quaerat sint deserunt! Minus non reprehenderit, quod praesentium rem dolor nesciunt aperiam consequatur voluptate dolore error vel?</p>
        <div className="flex items-center gap-2 ">
          <div className="rounded-full bg-purple-600 w-8 h-8 flex items-center justify-center">
            <span className="text-white font-medium text-[14px]">G</span>
          </div>
          <span className="text-grey2 font-medium text-[14px] leading-6">
            Giovanni Perotto de Morais
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">0 KM</span>
            <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">2019</span>
          </div>
          <span className="text-[16px] leading-5 font-medium">R$ 50.000,00</span>
        </div>
      </div>
    </li>
  )
}