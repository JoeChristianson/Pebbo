function Nav({setCurrentSection,dropDownOpen,handleDropDown}){

    const handleSectionChange = (e)=>{
        setCurrentSection(e.target.dataset.value)
        handleDropDown()
    }

    return(
        <ul className={dropDownOpen?"open":"closed"}>
            <li data-value="dash" onClick={handleSectionChange}>Dash</li>
            <li data-value="queue" onClick={handleSectionChange}>Queue</li>
            <li data-value="toDos" onClick={handleSectionChange}>To Dos</li>
            <li data-value="habits" onClick={handleSectionChange}>Habits</li>
            <li data-value="assessments" onClick={handleSectionChange}>Assessments</li>
        </ul>
    )
}

export default Nav