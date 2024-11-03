import { Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { KidContext } from '../../Context/KidContext';
import WeightCharts from './WeightCharts';
import HeightCharts from './HeightCharts';
import { UserContext } from '../../Context/UserContext';
import useGrowthCharts from './useGrowthCharts'; // Importa el hook personalizado

/**
 * Componente principal para mostrar las gráficas de crecimiento (peso y altura) del niño seleccionado.
 * Utiliza pestañas para permitir la visualización de datos de peso y altura de manera separada.
 */
export default function GrowthCharts() {
    const { kid } = useContext(KidContext); // Obtiene el objeto niño seleccionado del contexto
    const { profileType } = useContext(UserContext); // Obtiene el tipo de perfil del usuario desde el contexto

    // Utiliza el hook personalizado para obtener y gestionar los datos de crecimiento del niño
    const {
        valuesWeight, // Estado que almacena los datos de peso
        setValuesWeight, // Función para actualizar los datos de peso
        valuesHeight, // Estado que almacena los datos de altura
        setValuesHeight, // Función para actualizar los datos de altura
        getWeightsforKid, // Función para obtener datos de peso del niño
        getHeightsforKid, // Función para obtener datos de altura del niño
    } = useGrowthCharts(kid); // Llama al hook con el niño seleccionado

    // Verifica si se ha seleccionado un niño antes de renderizar las gráficas
    if (kid === null) {
        return (
            <>
                <h3 className='kinder-title'>
                    <FontAwesomeIcon icon={faChartLine} />  Curvas de crecimiento
                </h3>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <h3 className='kinder-title'>
                <FontAwesomeIcon icon={faChartLine} />  Curvas de crecimiento de {kid.nombre}
            </h3>
            <Tabs defaultActiveKey="peso" className='m-3'> {/* Tabs para mostrar peso y altura */}
                <Tab eventKey="peso" title="Curvas de peso"> {/* Pestaña para las gráficas de peso */}
                    <WeightCharts 
                        kid={kid} 
                        profileType={profileType} 
                        values={valuesWeight} 
                        setValues={setValuesWeight} 
                        onAddData={getWeightsforKid} 
                    />
                </Tab>
                <Tab eventKey="altura" title="Curvas de altura"> {/* Pestaña para las gráficas de altura */}
                    <HeightCharts 
                        kid={kid} 
                        profileType={profileType} 
                        values={valuesHeight} 
                        setValues={setValuesHeight} 
                        onAddData={getHeightsforKid} 
                    />
                </Tab>
            </Tabs>
        </>
    );
}
