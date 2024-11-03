import React from 'react';
import { Table } from 'react-bootstrap';
import useAllergiesTable from './useAllergiesTable';  // Importamos el custom hook
import './allergies.css';  // Importamos el archivo de estilos CSS

// Componente principal para mostrar la tabla de alergias
export default function AllergiesTable({ type, values }) {
    // Usamos el custom hook para obtener las funciones y datos necesarios
    const { getRowClass, normalizedValues, allergenIcons } = useAllergiesTable(type, values);

    // Si no hay valores de alergias, mostramos un mensaje en el centro
    if (values.length === 0) {
        return (
            <div className="text-center">
                <p>No hay ninguna alergia {type} registrada.</p>
            </div>
        );
    }

    // Retornamos la tabla con las alergias, aplicando clases y mostrando íconos si están disponibles
    return (
        <Table className={getRowClass(type)} >
            <thead>
                <tr>
                    <th className={getRowClass(type)}>Alergia {type}</th>
                </tr>
            </thead>
            <tbody>
                {normalizedValues.map((value) => (
                    <tr key={value.id_registro}>
                        <td>
                            {value.iconName ? (
                                <img 
                                    src={allergenIcons[value.iconName]}  // Muestra el ícono si está disponible
                                    alt={value.iconName} 
                                    className="allergen-icon" 
                                    style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                                />
                            ) : (
                                <span>{value.alergeno}</span>  // Si no hay ícono, muestra solo el nombre del alérgeno
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
