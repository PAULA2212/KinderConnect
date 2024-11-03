import { useMemo } from 'react';
import allergenIcons from './AllergenIcons'; // Importamos el archivo que contiene los íconos de alérgenos

// Custom hook para manejar la lógica del componente AllergiesTable
export default function useAllergiesTable(type, values) {
    
    // Función que determina la clase CSS según el tipo de alergia
    const getRowClass = (type) => {
        switch (type) {
            case 'grave':
                return 'bg-danger';  // Alergias graves usan clase bg-danger (rojo)
            case 'moderada':
                return 'bg-warning';  // Alergias moderadas usan clase bg-warning (amarillo)
            case 'leve':
                return 'bg-info';  // Alergias leves usan clase bg-info (azul)
            default:
                return '';  // Si no se encuentra un tipo válido, no aplica ninguna clase
        }
    };

    // Usamos useMemo para evitar recalcular iconos y clases innecesariamente si los valores no cambian
    const normalizedValues = useMemo(() => {
        return values.map(value => {
            const normalizedAllergen = value.alergeno.trim().toLowerCase();  // Normalizamos el nombre del alérgeno
            const iconName = Object.keys(allergenIcons).find(icon => icon.toLowerCase() === normalizedAllergen);  // Buscamos si existe un ícono para ese alérgeno

            return {
                ...value,
                iconName,  // Agregamos el nombre del ícono, si existe
            };
        });
    }, [values]);  // Solo recalcula si los valores cambian

    return {
        getRowClass,  // Retorna la función para asignar clases
        normalizedValues, // Retorna los valores con la información del ícono normalizado
        allergenIcons  
    };
}
