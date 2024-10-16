import ModalChart from "./ModalCharts";
import GrowthTable from "./GrowthTable";
import GrowthChartLine from "./GrowthChartsLine";
import './chartsstyles.css'

export default function HeightCharts({ kid, profileType, values, setValues, onAddData }) {
    // Verificamos los valores que se están pasando a GrowthChartLine
    console.log('Values passed to GrowthChartLine:', values);


    return (
        <>
            <div className='data-Charts'>
                <div className="table-Charts">
                    <GrowthTable className='growth-table' values={values} setValues={setValues} kid={kid} type={'altura'} />
                    {profileType === 'progenitor' && (
                        <ModalChart type={'altura'} kid={kid} onAddData={onAddData} />
                    )}
                </div>
                <GrowthChartLine data={values} type={'altura'} kid={kid} /> {/* Asegúrate de que el tipo está bien especificado */}
            </div>

        </>
    );
}
