

const Slide = ({title,img,paragraphs})=>{
    return <div>
        <h1>{title}</h1>
        <img src={img}></img>
        {paragraphs.map((content,index)=>{
            return (
                <p key={index}>{content}</p>
            )
        })}
    </div>
}

export default Slide