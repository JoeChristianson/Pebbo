import React from "react";


export default function FormElement({formInputs,formInputValues,formOptions=[],externalLabels,handleFormInputChange,handleFormSubmit,handleFormReset,hiddenFields=[],disabledFields=[],formClass="",submitButtonText}){
  return(
    <form onSubmit={handleFormSubmit}  className={`generic-form ${formClass}`}>
      {formInputs.map((input,index)=>{
        if(hiddenFields.includes(input.name)){
          return (<></>)
        }

        const value = formInputValues[input.name];



        const options = formOptions.find((formOption)=>{
          return formOption.property===input.name
        })?.options||null;



        return(
          <div key={index} className="form-group">
          {externalLabels?(

            <div className="">
            <label className="form-label" >
              {input.label}
            </label>
          </div>
            ):null}

          <div className={externalLabels?"md:w-2/3":"w-full"}>

            {input.valueType==="boolean"||options?(
            <select
            disabled={disabledFields.includes(input.name)}
             name={input.name} value={value||undefined} onChange={handleFormInputChange}>
                  <option value="" disabled selected>Select your {input.name}</option>
              <Options options={input.valueType==="boolean"?["true","false"]:options} value={value}></Options>
            </select>):(<input
            disabled={disabledFields.includes(input.name)}
            type={input.valueType?input.valueType:"text"}
            id={input.name}
            name={input.name}
            placeholder={externalLabels?(input.placeholder||""):input.label}
            value={value||undefined}
            onChange={handleFormInputChange}
            className="form-input" />)
          }
          </div>
        </div>
        )
      })}
      <div className="flex justify-center">
      <input className="" type="submit" value={submitButtonText||"Submit"} />
      {handleFormReset?<button onClick={handleFormReset} className="shadow bg-red-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-1">Reset</button>:null}
      </div>
    </form>
  )
}

const Options =({options,value})=>{

  return (
    <>
    {options.map((option,index)=>{
      return(
        <option key={index} value={option}>{option}</option>
      )
    })}
    </>
  )
}
