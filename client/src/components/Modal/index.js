import "./modal.css"
import { SettingsGrid } from "../SettingsGrid"

export const Modal = ({highlight,userId,setModalOpen,modalInput,handleDelete,dataId,handlePrioritize,handleSettings,notes,children,onDash})=>{
    

    const handleModalClose = ()=>{
        setModalOpen(false)
    }

    return(<div className={`modal ${onDash?"on-dash":""}`}>
        <header className="modal-header">
        <button className={`close-modal ${highlight==="close-modal"?"highlight":""}`} onClick={handleModalClose}>&#10005;</button>
        <h3>{modalInput.name}</h3>
        </header>
        <div className="modal-buttons">
        </div>
        {/* {handleSettings?(<>
        <h3>Settings</h3>
        <SettingsGrid userId={userId} dataId={dataId}/>
        </>
    ):null} */}
        {children}
        {notes&&notes.length>0&&(<div>There are notes</div>)}
        <div className="modal-buttons-cont">

    {handlePrioritize?<button onClick={handlePrioritize} data-id={dataId} className="modal-button">Prioritize</button>:null}
    {handleDelete&&<button onClick={handleDelete} data-id={dataId} className="modal-button danger">Delete</button>}
        </div>
        </div>)
}

