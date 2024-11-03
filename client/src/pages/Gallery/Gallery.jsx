import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSearch } from '@fortawesome/free-solid-svg-icons';
import ModalGallery from "./ModalGallery";
import { Carousel } from 'react-bootstrap';
import './gallery.css';
import { useGallery } from "./useGallery"; // Importa el custom hook

/**
 * Componente `Gallery`
 * 
 * Este componente renderiza la galería de imágenes del niño seleccionado, incluyendo:
 * - Input de búsqueda para filtrar por fecha.
 * - Modal para agregar nuevas imágenes (disponible solo para educadores).
 * - Carrusel para mostrar imágenes filtradas.
 * - Galería general de todas las imágenes.
 * 
 * @returns JSX del componente `Gallery`.
 */
export default function Gallery() {
    const {
        kid,
        profileType,
        images,
        filteredImages,
        searchTerm,
        setSearchTerm,
        handleAddImage,
    } = useGallery(); // Usa el hook personalizado para manejar el estado

    // Si no hay un niño seleccionado, muestra un mensaje informativo
    if (kid === null) {
        return (
            <>
                <h3 className='kinder-title'><FontAwesomeIcon icon={faImages} /> Galería de imágenes</h3>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <h3 className='kinder-title'><FontAwesomeIcon icon={faImages} /> Galería de imágenes de {kid.nombre}</h3>

            {/* Modal de subida de imágenes, solo visible para educadores */}
            {profileType === "educador" && (
                <ModalGallery kid={kid} onAddImage={handleAddImage} />
            )}

            {/* Input de búsqueda por fecha */}
            <div style={{ position: 'relative', marginBottom: '20px', marginTop: '20px'}}>
                <input
                    type="date"
                    placeholder="Buscar por fecha..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input"
                    style={{
                        padding: '8px 40px 8px 30px',
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

            {/* Carrusel de imágenes filtradas por fecha */}
            {filteredImages.length > 0 && (
                <div className="carousel-container">
                    <Carousel>
                        {filteredImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image.URL}
                                    alt={`Imagen ${index}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            )}

            {/* Galería de todas las imágenes */}
            <div className="gallery-grid">
                {images.length === 0 ? (
                    <p>No hay imágenes disponibles.</p>
                ) : (
                    images.map((image, index) => (
                        <div className="gallery-item" key={index}>
                            <img src={image.URL} alt={`Imagen ${index}`} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
