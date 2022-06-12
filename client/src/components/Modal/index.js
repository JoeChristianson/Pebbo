import "./modal.css"


export const Modal = ({setModalOpen,modalInput,handleDelete,dataId})=>{
    

    const handleModalClose = ()=>{
        setModalOpen(false)
    }

    return(<div className="modal">
        <button className="close-modal" onClick={handleModalClose}>x</button>
        <h3>{modalInput.name}</h3>
        <div className="modal-buttons">
        <button onClick={handleDelete} data-id={dataId} className="modal-button">Delete</button>
        </div>
        </div>)
}

