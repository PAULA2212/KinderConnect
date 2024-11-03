import { Tabs, Tab } from 'react-bootstrap';
import MilestonesTable from './MilestonesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStairs } from '@fortawesome/free-solid-svg-icons';
import useDevelopmentalMilestones from './useDevelopmentalMilestones'; // Importar el custom hook

/**
 * Componente para mostrar los hitos de desarrollo de un niño.
 * Utiliza el custom hook useDevelopmentalMilestones para manejar la lógica de obtención de hitos.
 */
export default function DevelopmentalMilestones() {
    // Utilizar el custom hook para obtener los hitos, el estado de carga y la función de filtrado
    const { kid, loading, filterMilestonesByAge } = useDevelopmentalMilestones();

    // Si no hay un niño seleccionado, mostrar un mensaje
    if (!kid) {
        return (
            <>
                <h3 className='kinder-title'><FontAwesomeIcon icon={faStairs} />  Hitos del desarrollo</h3>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }

    // Si el estado de carga es verdadero, mostrar un mensaje de carga
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <h3 className='kinder-title'><FontAwesomeIcon icon={faStairs} />  Hitos del desarrollo de {kid.nombre}</h3>
            <Tabs defaultActiveKey="0-3 meses" id="developmental-milestones-tabs" className='m-3'>
                <Tab eventKey="0-3 meses" title="0-3 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('0-3 meses')} />
                </Tab>
                <Tab eventKey="4-6 meses" title="4-6 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('4-6 meses')} />
                </Tab>
                <Tab eventKey="7-9 meses" title="7-9 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('7-9 meses')} />
                </Tab>
                <Tab eventKey="10-12 meses" title="10-12 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('10-12 meses')} />
                </Tab>
                <Tab eventKey="13-18 meses" title="13-18 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('13-18 meses')} />
                </Tab>
                <Tab eventKey="19-24 meses" title="19-24 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('19-24 meses')} />
                </Tab>
                <Tab eventKey="25-36 meses" title="25-36 meses">
                    <MilestonesTable milestones={filterMilestonesByAge('25-36 meses')} />
                </Tab>
            </Tabs>
        </>
    );
}
