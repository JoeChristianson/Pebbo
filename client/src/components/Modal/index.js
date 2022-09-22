import "./modal.css"
import { SettingsGrid } from "../SettingsGrid"

export const Modal = ({userId,setModalOpen,modalInput,handleDelete,dataId,handlePrioritize,handleSettings,notes,children,onDash})=>{
    

    const handleModalClose = ()=>{
        setModalOpen(false)
    }

    return(<div className={`modal ${onDash?"on-dash":""}`}>
        <button className="close-modal" onClick={handleModalClose}>x</button>
        <h3>{modalInput.name}</h3>
        <div className="modal-buttons">
        {handlePrioritize?<button onClick={handlePrioritize} data-id={dataId} className="modal-button">Prioritize</button>:null}
        <button onClick={handleDelete} data-id={dataId} className="modal-button">Delete</button>
        </div>
        {handleSettings?(<>
        <h3>Settings</h3>
        <SettingsGrid userId={userId} dataId={dataId}/>
        </>
        ):null}
        {children}
        {notes&&notes.length>0&&(<div>There are notes</div>)}
        </div>)
}

