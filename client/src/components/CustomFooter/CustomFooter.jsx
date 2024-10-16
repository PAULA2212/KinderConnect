/* eslint-disable react/prop-types */
import { UserContext } from '../../Context/UserContext';
import { useContext } from "react"
export default function CustomFooter(props){
    const {user} = useContext(UserContext)
    console.log(user)
    return(
        <div className={props.className}>
            <h1>Hola desde el pie de pagina</h1>
        </div>
        
    )
}