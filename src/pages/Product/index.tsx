import { BlackButton, PurpleButton } from "../../components/Button"
import { Footer } from "../../components/Footer"

export const Product = () => {
  return (
    <div className="bg-duo md:bg-duo-big">
    <main className="py-[45px] px-3 flex flex-wrap max-w-[1240px] mx-auto justify-center midson:justify-between">
      <div className="md:max-w-[750px]">
        <div className="md:max-w-[750px] md:h-[355px] max-h-[355px] w-full h-[355px] rounded flex items-center bg-grey10 mb-[17px] bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')] bg-cover bg-center" >
        </div>

        <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[15px]">
          <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200 </h2>
          <div className="flex gap-3">
            <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">1500 KM</span>
            <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">2013</span>
          </div>
          <span className="font-lexend text-[16px] leading-5 font-medium">{(65000).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
          <PurpleButton children="Comprar" size="medium"/>
        </section>

        <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[15px]">
          <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">Descrição</h2>
          <p className="text-grey2 font-normal text-[16px] leading-[28px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nostrum distinctio ipsum dolore iusto, delectus at minima ex? Ipsa ipsam molestias beatae obcaecati assumenda, dicta incidunt minus iusto eligendi neque.</p>
        </section>
      </div>

      <div className="md:max-w-[440px]">
        <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[52px]">
          <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">Fotos</h2>
          <ul className="flex flex-wrap justify-between h-[230px]">
            <li className="w-[90px] h-[90px] rounded">
              <img className="w-full h-full rounded" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
            </li>
            <li className="w-[90px] h-[90px] rounded">
              <img className="w-full h-full rounded" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
            </li>
            <li className="w-[90px] h-[90px] rounded">
              <img className="w-full h-full rounded" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
            </li>
            <li className="w-[90px] h-[90px] rounded">
              <img className="w-full h-full rounded" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
            </li>
            <li className="w-[90px] h-[90px] rounded">
              <img className="w-full h-full rounded" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
            </li>
            <li className="w-[90px] h-[90px] rounded">
              <img className="w-full h-full rounded" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-7 px-7 py-10 items-center rounded bg-grey10 mb-[18px]">
          <div className="rounded-full bg-purple-600 w-[77px] h-[77px] flex items-center justify-center">
            {
            // seller.charAt(0).toUpperCase()
            }
            <span className="text-white font-medium text-[27px] leading-[40px]">SL</span>
          </div>
          <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">Samuel Leão</h2>
          <p className="text-grey2 font-normal text-[16px] leading-[28px] truncate whitespace-normal line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum doloribus a, ullam velit dolorum consequatur vel, dolores, distinctio provident excepturi voluptas. Atque dolores ipsam tempore corporis consequatur quia assumenda voluptatum.</p>
          <BlackButton children="Ver todos anúncios" size="big"/>
        </section>
      </div>

      <div className="md:max-w-[750px]">
        <section className="flex flex-col gap-6 px-7 py-9 rounded bg-grey10 mb-[42px]">
          <h1 className="font-semibold text-[20px] leading-[25px] font-lexend">Comentários</h1>
          <ul className="flex flex-col gap-11">
            <li className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-purple-600 w-8 h-8 flex items-center justify-center">
                  {
                  // seller.charAt(0).toUpperCase()
                  }
                  <span className="text-white font-medium text-[14px]">G</span>
                </div>
                <span className="text-grey2 font-medium text-[14px] leading-6">
                  {
                  //seller
                  }
                  Giovanni Perotto
                </span>
                <div className="bg-grey4 w-1 h-1 rounded-full"></div>
                <span className="text-grey3 text-[12px] leading-6 font-normal">há 3 dias</span>
              </div>
              <p className="font-normal text-[14px] leading-6 text-grey2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ab tempore maxime earum esse, atque libero nostrum suscipit voluptatem possimus temporibus tenetur numquam consequatur cupiditate doloremque perspiciatis nesciunt ratione voluptate!</p>
            </li>
          </ul>
        </section>

        <section className="px-[26px] py-10 bg-grey10 rounded">
          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                  
              <div className="rounded-full bg-purple-600 w-8 h-8 flex items-center justify-center">
                <span className="text-white font-medium text-[14px]">G</span>
              </div>
              <span className="text-grey2 font-medium text-[14px] leading-6">
                Giovanni Perotto
              </span>
            </div>
            <textarea className="border-[1.5px] rounded border-grey7 px-4 py-3 min-h-[128px]" placeholder="Digite seu comentário" />
            <PurpleButton children="Comentar" size="medium"/>
            <ul className="flex flex-wrap gap-2">
              <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">Gostei muito!</li>
              <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">Incrível!</li>
              <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">Recomendarei para meus amigos!</li>
            </ul>
          </form>
        </section>
      </div>
    </main>
    <Footer/>
    </div>
  )
}