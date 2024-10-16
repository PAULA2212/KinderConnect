/* eslint-disable react/prop-types */
import CustomDropdown from "../CustomDropdown/CustomDropdown"
export default function CustomSidebar (props){
    return(
        <div className={props.className}>
            <CustomDropdown location="sidebar"/>
        </div>
        
    )
}