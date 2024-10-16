import { Tabs, Tab } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { KidContext } from '../../Context/KidContext';
import { Link } from 'react-router-dom';
import WeightCharts from './WeightCharts';
import HeightCharts from './HeightCharts';
import { UserContext } from '../../Context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
export default function GrowthCharts() {
    const {kid} = useContext(KidContext)
    const {profileType} = useContext(UserContext)

    const [valuesWeight, setValuesWeight] = useState([])
    const [valuesHeight, setValuesHeight] = useState([])

    const getWeightsforKid = async () => {
        const idKid = kid.id_niño;
        try {
            const response = await axiosInstance.get(`/getWeightsForKid/${idKid}`);
            console.log('Response for Weights:', response.data);  // Debug log
            if (Array.isArray(response.data)) {  // Verificar si response.data es un array
                setValuesWeight(response.data);
            } else {
                console.error('Los datos recibidos no son un array:', response.data);
            }
        } catch (error) {
            console.log('No se han podido obtener los datos del niño');
        }
    };
    
    const getHeightsforKid = async () => {
        const idKid = kid.id_niño;
        try {
            const response = await axiosInstance.get(`/getHeightsForKid/${idKid}`);
            console.log('Response for Heights:', response.data);  // Debug log
            if (Array.isArray(response.data)) {  // Verificar si response.data es un array
                setValuesHeight(response.data);
            } else {
                console.error('Los datos recibidos no son un array:', response.data);
            }
        } catch (error) {
            console.log('No se han podido obtener los datos del niño');
        }
    };

    
    useEffect(() => {
        if (kid && kid.id_niño) {
            getWeightsforKid();
            getHeightsforKid();
        }
    }, [kid]);

    const handleWeightDataChange = () => {
        getWeightsforKid();
    };

    const handleHeightDataChange = () => {
        getHeightsforKid();
    };

    if (kid === null) {
        return (
          <>
            <h3 className='kinder-title'><FontAwesomeIcon icon={faChartLine} />  Curvas de crecimiento</h3>
            <div>
              <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
              <Link to="/layout/elegirniño">Seleccionar niño</Link>
            </div>
          </>
        );
      }
    return (
        <>
            <h3 className='kinder-title'><FontAwesomeIcon icon={faChartLine} />  Curvas de crecimiento de {kid.nombre}</h3>
            <Tabs defaultActiveKey="peso"  className='m-3'>
                <Tab eventKey="peso" title="Curvas de peso">
                    <WeightCharts kid={kid} profileType={profileType} values={valuesWeight} setValues={setValuesWeight} onAddData={handleWeightDataChange}/>
                </Tab>
                <Tab eventKey="altura" title="Curvas de altura">
                    <HeightCharts kid={kid} profileType={profileType} values={valuesHeight} setValues={setValuesHeight} onAddData={handleHeightDataChange}/>
                </Tab>
            </Tabs>







        </>

    )
}