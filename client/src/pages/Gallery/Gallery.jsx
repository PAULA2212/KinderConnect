import { useContext, useEffect, useState } from "react";
import { KidContext } from "../../Context/KidContext";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSearch } from '@fortawesome/free-solid-svg-icons';
import ModalGallery from "./ModalGallery";
import { getImagesForKid } from "../../services/Gallery/getImagesForKidService";
import { Carousel } from 'react-bootstrap'; // Bootstrap Carousel
import './gallery.css';

export default function Gallery() {
    const { kid } = useContext(KidContext);
    const { profileType } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]); // Imágenes filtradas por fecha
    const [searchTerm, setSearchTerm] = useState("");

    // Función para obtener las imágenes del niño
    const fetchImages = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getImagesForKid(kid.id_niño);
                setImages(data);
            } catch (error) {
                console.error('Error al obtener imágenes:', error);
            }
        }
    };

    useEffect(() => {
        fetchImages();
    }, [kid]);

    const handleAddImage = async () => {
        await fetchImages(); // Actualiza la lista de imágenes después de agregar una
    };

    // Filtrar imágenes por fecha para el carrusel
    useEffect(() => {
        if (searchTerm) {
            const filtered = images.filter(image => 
                new Date(image.fecha_subida).toISOString().slice(0, 10) === searchTerm
            );
            setFilteredImages(filtered); // Establece las imágenes filtradas
        } else {
            setFilteredImages([]); // No hay filtro, no mostrar nada en el carrusel
        }
    }, [searchTerm, images]);

    if (kid === null) {
        return (
            <>
                <h3 className='kinder-title'><FontAwesomeIcon icon={faImages} /> Galería de imágenes</h3>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    <Link to="/layout/elegirniño">Seleccionar niño</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <h3 className='kinder-title'><FontAwesomeIcon icon={faImages} /> Galería de imágenes de {kid.nombre}</h3>

            {/* Mostrar el modal para agregar imágenes si es educador */}
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
