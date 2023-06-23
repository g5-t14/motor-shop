import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { PurpleButton } from "../Button"
import { useUser } from "../../hooks/useUser"

export const ForgotModal = () => {
  const ref = useRef<HTMLDivElement>(null)

  const {toggleForgotModal} = useUser()
  
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if(!ref.current){
        return
      }

      if(!event.target){
        return
      }

      if(!ref.current.contains(event.target as HTMLDivElement)){
        toggleForgotModal()
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
        <h2>Em alguns instantes você receberá um email com informações para criar uma nova senha!</h2>
        <PurpleButton onClick={toggleForgotModal} type="button" size="big">Fechar</PurpleButton>
      </div>
    </div>
  ,document.body)
}