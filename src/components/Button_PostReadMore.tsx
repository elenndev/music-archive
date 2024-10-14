import { Link } from "react-router-dom";

import React from "react"

const Button_PostReadMore: React.FC<{id: number}> = ({ id }) =>{
    return( 
        <Link to={`/read/${id}`} className="btn btn-primary">Ler mais</Link>
    )
}

export default Button_PostReadMore