import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { PurpleButton } from "../Button"
import { useUser } from "../../hooks/useUser"

export const ErrorForgotModal = () => {
  const ref = useRef<HTMLDivElement>(null)

  const {toggleErrorForgotModal} = useUser()
  
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if(!ref.current){
        return
      }

      if(!event.target){
        return
      }

      if(!ref.current.contains(event.target as HTMLDivElement)){
        toggleErrorForgotModal()
      }
    }
    window.addEventListener("mousedown",handleClick)

    return () => {
      window.removeEventListener("mousedown",handleClick)
    }
  },[])

  return createPortal(
    <div className="w-[100vw] h-[100vh] z-50 overflow-hidden flex items-center justify-center fixed top-0 bg-[rgba(0,0,0,0.5)]">
      <div ref={ref} className="box-border flex flex-col gap-3 w-full bg-whiteFixed px-[49px] py-[44px] rounded-4 max-w-[412px]">
        <h2>Aconteceu algum erro! Verifique se o e-mail foi digitado corretamente e tente novamente mais tarde.</h2>
        <PurpleButton onClick={toggleErrorForgotModal} type="button" size="big">Fechar</PurpleButton>
      </div>
    </div>
  ,document.body)
}