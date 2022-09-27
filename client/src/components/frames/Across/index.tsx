import "./index.css"

const Across = ({children,className})=>{
    return(
        <div className={`across ${className}`}>
            {children.map(child=>{
                return(
                    <div>
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default Across