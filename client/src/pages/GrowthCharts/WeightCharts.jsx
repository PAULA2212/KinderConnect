import GrowthChartLine from "./GrowthChartsLine"
import GrowthTable from "./GrowthTable"
import ModalChart from "./ModalCharts"
import './chartsstyles.css'

export default function WeightCharts({ kid, profileType, values, setValues, onAddData }) {
  return (
    <>

      <div className="data-Charts">
        <div className="table-Charts">
          <GrowthTable className='growth-table' values={values} setValues={setValues} kid={kid} type={'peso'} />
          {profileType === 'progenitor' && (
            <ModalChart type={'peso'} kid={kid} onAddData={onAddData} />
          )}
        </div>

        <GrowthChartLine data={values} type={'peso'} kid={kid} />

      </div>

    </>
  )
}