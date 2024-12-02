import DOMPurify from "dompurify"

const Title_Post: React.FC<{title: string, isH1: boolean}> = ({title, isH1}) => {
    const TitleString = title
    const TitleHtml = DOMPurify.sanitize(TitleString)


    return(
        <>
            {isH1?
            ( <h1 className="post_title" dangerouslySetInnerHTML={{__html: TitleHtml}}></h1>)

            : (<h2 className="post_title" dangerouslySetInnerHTML={{__html: TitleHtml}}></h2>)}
        </>
    )
}


export default Title_Post