import "./modal.css"


export const Modal = ({setModalOpen,modalInput})=>{
    

    const handleModalClose = ()=>{
        setModalOpen(false)
    }

    return(<div className="modal">
        <button className="close-modal" onClick={handleModalClose}>x</button>
        <h3>{modalInput.name}</h3>
        <div className="modal-buttons">
        <button className="modal-button">Delete</button>
        </div>
        </div>)
}

