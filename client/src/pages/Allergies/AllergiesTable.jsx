import { Table } from 'react-bootstrap';
import './allergies.css';

export default function AllergiesTable({ type, values }) {
    const getRowClass = (type) => {
        switch (type) {
            case 'grave':
                return ' bg-danger';
            case 'moderada':
                return 'bg-warning';
            case 'leve':
                return 'bg-info';
            default:
                return '';
        }
    };
    if (values.length === 0) {
        return (
            <div className="text-center">
                <p>No hay ninguna alergia {type} registrada.</p>
            </div>
        );
    }
    return (
        <Table className={getRowClass(type)} >
            <thead>
                <tr>
                    <th className={getRowClass(type)}>Alergia {type}</th>
                </tr>
            </thead>
            <tbody>
                {values.map((value) => (
                    <tr key={value.id_registro}  >
                        <td >{value.alergeno}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
