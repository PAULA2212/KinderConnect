import KidProfileParents from "./KidProfileParents";
import KidProfileTeachers from "./KidProfileTeachers";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function KidProfile() {
    const { profileType } = useContext(UserContext);

    return (
        <>
            {profileType === 'progenitor' && <KidProfileParents />}
            {profileType === 'educador' && <KidProfileTeachers />}
        </>
    );
}
