import { useNavigate } from "react-router-dom"
import { Modal } from "../Modal"

interface ModalErrorProps {
    toggleModal: () => void
}



export const ModalError = ({ toggleModal }: ModalErrorProps) => {

    const navigate = useNavigate()

    const handleCloseAndRedirect = () => {

        toggleModal()
        
        navigate("/")
    }

    return (
        <Modal toggleModal={toggleModal} blockClosgin>
            Você não está autenticado!
            <button onClick={handleCloseAndRedirect}>Ir para o login</button>
        </Modal>
    )

}