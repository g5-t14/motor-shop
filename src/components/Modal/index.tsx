import { createPortal } from "react-dom"
import { ReactNode, useEffect, useRef } from "react"


interface ModalProps {
    toggleModal: () => void
    blockClosgin?: boolean
    children: ReactNode
}


export  const Modal = ({ toggleModal, children, blockClosgin }: ModalProps) => {


    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const handleClick = ( event:MouseEvent ) => {

            if(!ref.current) {
                return
            }

            if(!event.target){
                return
            }

            if(!ref.current.contains(event.target as HTMLElement)){

                toggleModal()

            }

        }

        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }

    }, [toggleModal])


    return createPortal(
    <div className="fixed top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
        <div ref={blockClosgin ? null : ref} className="bg-gray-200 p-20 shadow-lg max-w-250">
            {children}
        </div>
    </div>,
    document.body
    )


}