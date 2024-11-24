const express = require('express'); // Importa Express para crear el enrutador
const router = express.Router(); // Crea un nuevo enrutador de Express
const { upload } = require('../config/cloudinaryConfig'); // Importa la configuración de carga para Cloudinary

// Importación de controladores para manejar las distintas rutas
const register = require('../controllers/sesion/registerControler'); // Controlador para registrar usuarios
const login = require('../controllers/sesion/loginController'); // Controlador para iniciar sesión
const userDetails = require('../controllers/profiles/userdetailsController'); // Controlador para obtener detalles del usuario
const updateProfile = require('../controllers/profiles/updateProfileController'); // Controlador para actualizar perfiles
const center = require('../controllers/center/centerController'); // Controlador para gestionar centros educativos
const getKidParents = require('../controllers/linkeds/getKidParentsCotroller'); // Controlador para obtener padres de un niño
const getKidTeachers = require('../controllers/linkeds/getKidTeachersController'); // Controlador para obtener educadores de un niño
const getKid = require('../controllers/profiles/getKidController'); // Controlador para obtener información de un niño
const linkedKidParents = require('../controllers/linkeds/linkedKidParentsController'); // Controlador para vincular niños y padres
const linkedKidTeachers = require('../controllers/linkeds/linkedKidTeachersController'); // Controlador para vincular niños y educadores
const addKidProfile = require('../controllers/profiles/addKidProfileController'); // Controlador para añadir perfil de niño
const updateKidProfile = require('../controllers/profiles/updateKidProfileController'); // Controlador para actualizar perfil de niño
const insertParentsDiarys = require('../controllers/diary/insertParentsDiaryController'); // Controlador para insertar diario de padres
const insertTeachersDiary = require('../controllers/diary/insertTeachersDiaryController'); // Controlador para insertar diario de educadores
const getDiaryForteachers = require('../controllers/diary/getDiaryForTeachersController'); // Controlador para obtener diario de educadores
const getDiaryForParents = require('../controllers/diary/getDiaryForParentsController'); // Controlador para obtener diario de padres
const getEventsForKid = require('../controllers/events/getEventsForKidController'); // Controlador para obtener eventos de un niño
const getEventsForTeacher = require('../controllers/events/getEventsForTeacherController'); // Controlador para obtener eventos de un educador
const addEvent = require('../controllers/events/addEventController'); // Controlador para añadir eventos
const linkedEventsKids = require('../controllers/events/linkedEventsKidsController'); // Controlador para vincular eventos a niños
const addBook = require('../controllers/books/addBookController'); // Controlador para añadir libros
const getBooks = require('../controllers/books/getBooksController'); // Controlador para obtener libros
const getDevelopmentalMilestones = require('../controllers/milestones/getDevelopmentalMilestonesController'); // Controlador para obtener hitos de desarrollo
const getMilestonesForKid = require('../controllers/milestones/getMilestonesForKidController'); // Controlador para obtener hitos de un niño específico
const saveMilestonesForKid = require('../controllers/milestones/saveMilestonesForKidController'); // Controlador para guardar hitos de un niño
const saveGoal = require('../controllers/goals/saveGoalController'); // Controlador para guardar objetivos
const getGoalsForKid = require('../controllers/goals/getGoalsForKidController'); // Controlador para obtener objetivos de un niño
const updateGoalState = require('../controllers/goals/updateGoalsController'); // Controlador para actualizar el estado de un objetivo
const addAssessmentForKid = require('../controllers/assessment/addAssessmentController'); // Controlador para añadir evaluaciones para un niño
const getAssessmentForKid = require('../controllers/assessment/getAssessmentController'); // Controlador para obtener evaluaciones de un niño
const saveHeight = require('../controllers/growthCharts/saveNewHeightController'); // Controlador para guardar altura
const saveWeight = require('../controllers/growthCharts/saveNewWeightController'); // Controlador para guardar peso
const getHeight = require('../controllers/growthCharts/getHeightForKidController'); // Controlador para obtener altura de un niño
const getWeight = require('../controllers/growthCharts/getWeightForKidController'); // Controlador para obtener peso de un niño
const deleteHeight = require('../controllers/growthCharts/deleteHeightController'); // Controlador para eliminar altura
const deleteWeight = require('../controllers/growthCharts/deteleWeightController'); // Controlador para eliminar peso
const addAllergies = require('../controllers/allergies/addAllergiesController'); // Controlador para añadir alergias
const getAllergies = require('../controllers/allergies/getAllergiesController'); // Controlador para obtener alergias
const addCondition = require('../controllers/medicalConditions/addConditionController'); // Controlador para añadir condiciones médicas
const getConditions = require('../controllers/medicalConditions/getConditionsController'); // Controlador para obtener condiciones médicas
const addFood = require('../controllers/feeding/addFoodController'); // Controlador para añadir alimentos
const getFoods = require('../controllers/feeding/getFoodController'); // Controlador para obtener alimentos
const addImageForKid = require('../controllers/gallery/saveImageForKidController'); // Controlador para añadir imagen de un niño
const getImagesForKid = require('../controllers/gallery/getImagesForKidController'); // Controlador para obtener imágenes de un niño
const uploadFile = require('../controllers/adminDocuments/uploadDocumentController'); // Controlador para cargar documentos administrativos
const uploadKidFile = require('../controllers/adminDocuments/uploadKidDocumentController'); // Controlador para cargar documentos de un niño
const getDocumentById = require('../controllers/adminDocuments/getDocumentByIdController'); // Controlador para obtener documento por ID
const getDocumentByLink = require('../controllers/adminDocuments/getDocumentByLinkController'); // Controlador para obtener documento por enlace
const deleteDocument = require('../controllers/adminDocuments/deleteDocumentController'); // Controlador para eliminar documentos
const virtualAssintant = require('../controllers/virtualAssistant/virtualAssistantController'); // Controlador para asistente virtual
const getPotentialRecipients = require('../controllers/messaging/getRecipientController'); // Controlador para obtener destinatarios potenciales
const saveMessage = require('../controllers/messaging/addMessageController'); // Controlador para guardar mensajes
const getInbox = require('../controllers/messaging/getInboxController'); // Controlador para obtener mensajes de entrada
const getOutbox = require('../controllers/messaging/getOutboxController'); // Controlador para obtener mensajes enviados
const updateMessage = require('../controllers/messaging/updateMessageController'); // Controlador para actualizar mensajes

// Rutas de la API
router.post('/register', register); // Ruta para registrar un nuevo usuario
router.post('/login', login); // Ruta para iniciar sesión
router.get('/detalleUsuario/:userId/:perfil', userDetails); // Ruta para obtener detalles de usuario
router.post('/updateProfile', updateProfile); // Ruta para actualizar perfil de usuario
router.get('/centros', center); // Ruta para obtener centros educativos
router.get('/ninos_padres/:idProgenitor', getKidParents); // Ruta para obtener niños vinculados a un progenitor
router.get('/ninos_educadores/:idEducador', getKidTeachers); // Ruta para obtener niños vinculados a un educador
router.get('/contextokid/:kidId', getKid); // Ruta para obtener contexto de un niño
router.post('/linkednino_progenitor', linkedKidParents); // Ruta para vincular un niño a un progenitor
router.post('/linkednino_educador', linkedKidTeachers); // Ruta para vincular un niño a un educador
router.post('/addProfileKid', addKidProfile); // Ruta para añadir un perfil de niño
router.put('/updateProfileKid/:id', updateKidProfile); // Ruta para actualizar un perfil de niño
router.post('/diario_progenitores/insertar', insertParentsDiarys); // Ruta para insertar en el diario de progenitores
router.post('/diario_educadores/insertar', insertTeachersDiary); // Ruta para insertar en el diario de educadores
router.get('/diario_para_educadores/:idKid', getDiaryForteachers); // Ruta para obtener diario para educadores
router.get('/diario_para_progenitores/:idKid', getDiaryForParents); // Ruta para obtener diario para progenitores
router.get('/eventos_nino/:idNino', getEventsForKid); // Ruta para obtener eventos de un niño
router.get('/eventos_educador/:id_educador', getEventsForTeacher); // Ruta para obtener eventos de un educador
router.post('/events', addEvent); // Ruta para añadir un evento
router.post('/eventos_nino', linkedEventsKids); // Ruta para vincular eventos a niños
router.post('/addBook', upload.single('imagen_url'), addBook); // Ruta para añadir un libro, con imagen
router.get('/books', getBooks); // Ruta para obtener todos los libros
router.get('/getmilestones', getDevelopmentalMilestones); // Ruta para obtener hitos de desarrollo
router.get('/getMilestonesForKid/:idKid', getMilestonesForKid); // Ruta para obtener hitos de un niño
router.post('/saveMilestoneForKid', saveMilestonesForKid); // Ruta para guardar hitos de un niño
router.post('/saveGoal', saveGoal); // Ruta para guardar un objetivo
router.get('/getGoals/:idKid', getGoalsForKid); // Ruta para obtener objetivos de un niño
router.put('/updateGoal/:goalId', updateGoalState); // Ruta para actualizar el estado de un objetivo
router.post('/addAssessment', addAssessmentForKid); // Ruta para añadir evaluación de un niño
router.get('/getAssessment/:idKid', getAssessmentForKid); // Ruta para obtener evaluación de un niño
router.post('/addWeight', saveWeight); // Ruta para añadir peso
router.post('/addHeight', saveHeight); // Ruta para añadir altura
router.get('/getWeightsForKid/:idKid', getWeight); // Ruta para obtener peso de un niño
router.get('/getHeightsForKid/:idKid', getHeight); // Ruta para obtener altura de un niño
router.delete('/deleteHeight/:id', deleteHeight); // Ruta para eliminar altura
router.delete('/deleteWeight/:id', deleteWeight); // Ruta para eliminar peso
router.post('/addAllergen', addAllergies); // Ruta para añadir alergias
router.get('/getAllergens/:id', getAllergies); // Ruta para obtener alergias
router.post('/addMedicalCondition', addCondition); // Ruta para añadir condiciones médicas
router.get('/getConditions/:id', getConditions); // Ruta para obtener condiciones médicas
router.post('/addFood', addFood); // Ruta para añadir alimentos
router.get('/getFoods/:id', getFoods); // Ruta para obtener alimentos
router.post('/addImage', upload.single('imagen'), addImageForKid); // Ruta para añadir imagen de un niño
router.get('/getImages/:idKid', getImagesForKid); // Ruta para obtener imágenes de un niño
router.post('/addDocument', upload.single('documento'), uploadFile); // Ruta para cargar un documento administrativo
router.post('/addDocumentForKid', upload.single('documento'), uploadKidFile); // Ruta para cargar un documento de un niño
router.get('/getDocumentById/:id/:type', getDocumentById); // Ruta para obtener un documento por ID
router.get('/getDocumentByLink/:id/:type', getDocumentByLink); // Ruta para obtener un documento por enlace
router.delete('/deleteDocument/:id/:type', deleteDocument); // Ruta para eliminar un documento
router.post('/virtualAssistant', virtualAssintant); // Ruta para interactuar con el asistente virtual
router.get('/getPotentialRecipients/:id/:type', getPotentialRecipients); // Ruta para obtener destinatarios potenciales
router.post('/savemessage', saveMessage); // Ruta para guardar un mensaje
router.get('/getInbox/:id', getInbox); // Ruta para obtener la bandeja de entrada
router.get('/getOutbox/:id', getOutbox); // Ruta para obtener la bandeja de salida
router.put('/markMessageAsRead/:id', updateMessage); // Ruta para marcar un mensaje como leído

module.exports = router; // Exporta el enrutador para su uso en la aplicación principal
