import "./index.css"


const MainTallCenter = ({title,className,children})=>{
    return(
        <main className={`main-tall-center ${className}`}>
            <h1>
                {title}
            </h1>
            <section>
                {children}
            </section>
        </main>
    )
}

export default MainTallCenter