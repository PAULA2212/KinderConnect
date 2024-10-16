import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faSearch } from "@fortawesome/free-solid-svg-icons"
import { KidContext } from "../../Context/KidContext"
import { UserContext } from "../../Context/UserContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getFoods } from "../../services/Feeding/getFoodService"
import FeedingModal from "./FeedingModal"
import FeedingList from "./FeedingList"

export default function Feeding (){
    const {kid} = useContext(KidContext);
    const {profileType} = useContext(UserContext);
    const [foods, setFoods] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const fetchFoods = async()=>{
        if (kid && kid.id_niño){
            try{
                const  response = await getFoods(kid.id_niño)
                setFoods(response)
            } catch (error){
                console.log('Error al obtener los alimentos:', error)
            }
        }
    }
     const handleAddFood = async () => {
        await fetchFoods();
     }
    
    useEffect(()=>{
        fetchFoods()
    },[kid])
    useEffect(() => {
        const filtered = foods.filter(food => 
            food?.alimento?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(filtered);
    }, [searchTerm, foods]);
    if (kid === null) {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faUtensils} />  Alimentación</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    <Link to="/layout/elegirniño">Seleccionar niño</Link>
                </div>
            </>
        );
    }
    return(
        <>
        <h1 className="kinder-title"><FontAwesomeIcon icon={faUtensils} />  Alimentación de {kid.nombre}</h1>
        {profileType === 'progenitor' && (
            <FeedingModal kid={kid}  onAddFood={handleAddFood} />
        )}
        <div style={{ position: 'relative', marginBottom: '20px', marginTop: '20px'}}>
                <input
                    type="text"
                    placeholder="Buscar alimentos..."
                    value={searchTerm}
                    onChange={(e)=> {setSearchTerm(e.target.value)}}
                    className="form-input"
                    style={{
                        padding: '8px 40px 8px 30px', // Ajusta el padding para espacio del ícono
                        width: '100%',
                    }}
                />
                <FontAwesomeIcon 
                    icon={faSearch} 
                    style={{ 
                        position: 'absolute', 
                        left: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: '#888' 
                    }} 
                />
            </div>
        {console.log('Foods antes de pasar al componente:', foods)}
        <FeedingList foods={filteredFoods}/>
        
        </>
        
    )
}