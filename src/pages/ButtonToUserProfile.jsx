import React from "react"
import { Link } from "react-router-dom"
export default function ButtonToUserProfile(){
    return(
        <button>
            <Link to="/users/profile">
            Link to</Link></button>
    )
}