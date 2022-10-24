

const Slide = ({title,img,paragraphs,handleClick})=>{

    const handleBlocker = (e)=>{
        handleClick()
        e.stopPropagation()
    }

    return <div>
        <div id="blocker" onClick={handleBlocker}></div>
        <h1>{title}</h1>
        {img&&
            <>
            <iframe src={img} width="480" height="401" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href={img}>
            {/* I might need this below for fair use???? */}
            {/* via GIPHY */}
            </a></p>
        </>
        }

        {paragraphs.map((content,index)=>{
            return (
                <p key={index}>{content}</p>
            )
        })}
    </div>
}

export default Slide