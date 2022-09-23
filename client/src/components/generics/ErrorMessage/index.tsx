import "./index.css"
type ErrorPropType={
    messages:[String]
}

const ErrorMessage = ({messages}:ErrorPropType)=>{
    
    if(messages.length<1){
        return null
    }
    return(
        <div className="error-field">
            {messages.map(message=>{
                return<span>{message}</span>
            })}
        </div>
    )

}

export default ErrorMessage