import styles from "../styles/pages/free-electives.module.scss";
import React, { useState } from "react";

export default function FreeElectives() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

  const courseData = [
    { curso: "ADMI 3017", descripcion: "Introducción al Desarrollo Empresarial", crs: 2, prerequisitos: "" },
    { curso: "ALEM 3041", descripcion: "Alemán I", crs: 3, prerequisitos: "" },
    { curso: "ALEM 3042", descripcion: "Alemán II", crs: 3, prerequisitos: "ALEM 3041" },
    { curso: "ALEM 3043", descripcion: "Alemán III", crs: 3, prerequisitos: "ALEM 3042" },
    { curso: "ALEM 3044", descripcion: "Alemán IV", crs: 3, prerequisitos: "ALEM 3043" },
    { curso: "ALEM 4001", descripcion: "Literatura Alemana I", crs: 3, prerequisitos: "ALEM 3044" },
    { curso: "ALEM 4002", descripcion: "Literatura Alemana II", crs: 3, prerequisitos: "ALEM 4001" },
    { curso: "ALEM 4007", descripcion: "Temas Especiales", crs: 3, prerequisitos: "Director" },
    { curso: "ALEM 4008", descripcion: "Temas Especiales", crs: 3, prerequisitos: "Director" },
    { curso: "ARTE 3007", descripcion: "Fotografía Artística", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3055", descripcion: "Caligrafía", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3131", descripcion: "Perspectiva en Arte", crs: 3, prerequisitos: "ARTE 3121" },
    { curso: "ARTE 3151", descripcion: "Fundamentos de Teoría del Arte", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3152", descripcion: "Fundamentos Teóricos del Arte Contemporaneo", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3121", descripcion: "Dibujo", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3122", descripcion: "Pintura", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3141", descripcion: "Diseño Artístico", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3161", descripcion: "Taller de Vitrales", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3200", descripcion: "Estudio de la Figura Humana", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3132", descripcion: "Color", crs: 3, prerequisitos: "ARTE 3121 o ARTE 3122" },
    { curso: "ARTE 3226", descripcion: "Historia de Arte en Puerto Rico", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3276", descripcion: "Apreciacion del Arte", crs: 3, prerequisitos: "" },
    { curso: "ARTE 3531", descripcion: "Microcompu en Artes Visuales", crs: 3, prerequisitos: "ADMI 3007 o COMP 3010 o ECAG 3007 o INGE 3011 o Director" },
    { curso: "ARTE 3532", descripcion: "Computadoras en la Artes Visuales II", crs: 3, prerequisitos: "ARTE 3531" },
    { curso: "ARTE 4021", descripcion: "Cerámica", crs: 3, prerequisitos: "" },
    { curso: "ARTE 4206", descripcion: "Arquitedtura de Puerto Rico", crs: 3, prerequisitos: "" },
    { curso: "ARTE 4022", descripcion: "Alfareria", crs: 3, prerequisitos: "" },
    { curso: "ARTE 4259", descripcion: "Historia del Arte Moderno", crs: 3, prerequisitos: "ARTE 4272 o Director" },
    { curso: "ARTE 4272", descripcion: "Historia del Arte Paleocrist-Barr", crs: 3, prerequisitos: "ARTE 4271" },
    { curso: "ARTE 4291", descripcion: "Escultura Elemental", crs: 3, prerequisitos: "ARTE 3121" },
    { curso: "ARTE 4292", descripcion: "Escultura Intermedia", crs: "", prerequisitos: "ARTE 4291" },
    { curso: "ARTE 4301", descripcion: "Diseño Industrial", crs: 3, prerequisitos: "" },
    { curso: "ARTE 4311", descripcion: "Crítica del Arte I", crs: 3, prerequisitos: "" },
    { curso: "ARTE 4312", descripcion: "Crítica del Arte II", crs: 3, prerequisitos: "ARTE 4311" },
    { curso: "ARTE 4331", descripcion: "Artes Comparadas I", crs: 3, prerequisitos: "" },
    { curso: "ARTE 4332", descripcion: "Artes Comparadas II", crs: 3, prerequisitos: "ARTE 4331" },
    { curso: "ARTE 4335", descripcion: "Historia del Arte Contemporaneo", crs: 3, prerequisitos: "ARTE 4259 o Director" },
    { curso: "ARTE 4995", descripcion: "Temas Especiales", crs: 3, prerequisitos: "Director" },
    { curso: "ARTE 4996", descripcion: "Temas Especiales II", crs: 3, prerequisitos: "Director" },
    { curso: "CHINO 3051", descripcion: "Chino Mandarin I", crs: 3, prerequisitos: "" },
    { curso: "MUSI 3135", descripcion: "Apreciación de Música", crs: 3, prerequisitos: "" },
    { curso: "MUSI 3161", descripcion: "Historia de Musica", crs: 3, prerequisitos: "" },
    { curso: "MUSI 3162", descripcion: "Historia de Musica", crs: 3, prerequisitos: "" },
    { curso: "MUSI 3167", descripcion: "Introducción a la Opera", crs: 3, prerequisitos: "" },
    { curso: "MUSI 3171", descripcion: "Fund. De la Musica I", crs: 3, prerequisitos: "" },
    { curso: "MUSI 3172", descripcion: "Fund. De la Musica II", crs: 3, prerequisitos: "MUSI 3171 o Director" },
    { curso: "MUSI 4995", descripcion: "Temas Especiales", crs: "", prerequisitos: "" },
    { curso: "TEAT 3051", descripcion: "Introducción al Arte Teatral I", crs: 3, prerequisitos: "" },
    { curso: "TEAT 3052", descripcion: "Introducción al Arte Teatral II", crs: 3, prerequisitos: "TEAT 3051" },
    { curso: "TEAT 3061", descripcion: "Diseño de Escenarios I", crs: 3, prerequisitos: "" },
    { curso: "TEAT 3081", descripcion: "Actuación I", crs: 3, prerequisitos: "" },
    { curso: "TEAT 3082", descripcion: "Actuación II", crs: 3, prerequisitos: "TEAT 3081" },
    { curso: "CINE 3005", descripcion: "Writing The Short Film", crs: 3, prerequisitos: "24 cr approved in undergraduate courses" },
    { curso: "CINE 4001", descripcion: "Historia del Cine hasta el 1950", crs: 3, prerequisitos: "" },
    { curso: "CINE 4002", descripcion: "Historia del Cine desde el 1950", crs: 3, prerequisitos: "" },
    { curso: "CINE 4005", descripcion: "Teoría del Cine", crs: 3, prerequisitos: "" },
    { curso: "CINE 4015", descripcion: "Creacion de Videos Digitales", crs: 3, prerequisitos: "" },
    { curso: "CINE 4025", descripcion: "Temas Especiales", crs: 3, prerequisitos: "" },
    { curso: "FILO 3001", descripcion: "Introducción a la Filosofía: Enfoque Temático", crs: 3, prerequisitos: "" },
    { curso: "FILO 3002", descripcion: "Introducción a la Filosofía: Enfoque Histórico", crs: 3, prerequisitos: "" },
    { curso: "FILO 3155", descripcion: "Introducción a la Etica", crs: 3, prerequisitos: "" },
    { curso: "FILO 3156", descripcion: "Etica Moderna y Contemporanea", crs: 3, prerequisitos: "" },
    { curso: "FILO 3157", descripcion: "Introducción a la Lógica", crs: 3, prerequisitos: "" },
    { curso: "FILO 3158", descripcion: "Filosofía Antigua", crs: 3, prerequisitos: "" },
    { curso: "FILO 3159", descripcion: "Filosofía Medieval", crs: 3, prerequisitos: "FILO 3001 o 3002 o FILO 3158" },
    { curso: "FILO 3165", descripcion: "Filosofía Moderna", crs: 3, prerequisitos: "FILO 3001 o 3002 o FILO 3158 o 3159" },
    { curso: "FILO 3166", descripcion: "Filosofía Contemporanea", crs: 3, prerequisitos: "FILO 3001 o 3002 o 3165" },
    { curso: "FILO 3167", descripcion: "Logica Simbólica I", crs: 3, prerequisitos: "" },
    { curso: "FILO 3168", descripcion: "Filosofía de la Ciencia", crs: 3, prerequisitos: "FISI 3171 o 3161 o 3151 o FISI 3091 o FISI 3012" },
    { curso: "FILO 3169", descripcion: "Existencialismo", crs: 3, prerequisitos: "" },
    { curso: "FILO 3175", descripcion: "Filosofía de la Historia", crs: 3, prerequisitos: "" },
    { curso: "FILO 3178", descripcion: "Etica Empresarial", crs: 3, prerequisitos: "" },
    { curso: "FILO 3185", descripcion: "La Etica y la Computadora", crs: 3, prerequisitos: "" },
    { curso: "FILO 3195", descripcion: "Etica Perspectiva Global", crs: 3, prerequisitos: "" },
    { curso: "FILO 4025", descripcion: "Etica Medica", crs: 3, prerequisitos: "" },
    { curso: "FILO 4027", descripcion: "Bioética", crs: 3, prerequisitos: "" },
    { curso: "FILO 4041", descripcion: "Metafísica I", crs: 3, prerequisitos: "FILO 3001 o 3002 o FILO 3158" },
    { curso: "FILO 4042", descripcion: "Metafísica II", crs: 3, prerequisitos: "FILO 4041" },
    { curso: "FILO 4045", descripcion: "Etica Profesional de la Inge", crs: 3, prerequisitos: "" },
    { curso: "FILO 4046", descripcion: "Etica Ambiental", crs: 3, prerequisitos: "" },
    { curso: "FILO 4051", descripcion: "Principios de Estética", crs: 3, prerequisitos: "" },
    { curso: "FILO 4052", descripcion: "Estética Contemporanea", crs: 3, prerequisitos: "" },
    { curso: "FILO 4115", descripcion: "Filosofía de la Religión", crs: 3, prerequisitos: "" },
    { curso: "FILO 4125", descripcion: "Filosofía del Derecho", crs: 3, prerequisitos: "" },
    { curso: "FILO 4145", descripcion: "Lógica Simbólica II", crs: 3, prerequisitos: "FILO 3167" },
    { curso: "FILO 4146", descripcion: "Epistomología I", crs: 3, prerequisitos: "FILO 3165 Correquisito: FILO 3166" },
    { curso: "FILO 4147", descripcion: "Filosofía de la Psicología", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "FILO 4148", descripcion: "Filosofía del Marxismo", crs: 3, prerequisitos: "" },
    { curso: "FILO 4149", descripcion: "Temas Especiales", crs: 3, prerequisitos: "" },
    { curso: "FILO 4155", descripcion: "Etica Avanzada", crs: 3, prerequisitos: "FILO 3155" },
    { curso: "FILO 4156", descripcion: "Epistemología y Ciencia", crs: 3, prerequisitos: "FILO 3165" },
    { curso: "FILO 4157", descripcion: "Fenomenología", crs: 3, prerequisitos: "FILO 3166" },
    { curso: "FILO 4158", descripcion: "Filosofía Analítica", crs: 3, prerequisitos: "FILO 3165 y 3166" },
    { curso: "FILO 4159", descripcion: "Pragmatismo", crs: 3, prerequisitos: "FILO 3165 y 3166" },
    { curso: "FILO 4160", descripcion: "Filosofía de la Tecnología", crs: 3, prerequisitos: "" },
    { curso: "FILO 4995", descripcion: "Temas Especiales en Filosofía", crs: "", prerequisitos: "Director" },
    { curso: "FILO 4996", descripcion: "Temas Especiales en Filosofía II", crs: "", prerequisitos: "Director" },
    { curso: "FRAN 3060", descripcion: "Fonética del Francés", crs: 3, prerequisitos: "FRAN 3141" },
    { curso: "FRAN 3135", descripcion: "Prog. De Estudios Verano en París", crs: 3, prerequisitos: "" },
    { curso: "FRAN 3141", descripcion: "Francés I", crs: 3, prerequisitos: "" },
    { curso: "FRAN 3142", descripcion: "Francés II", crs: 3, prerequisitos: "FRAN 3141" },
    { curso: "FRAN 3143", descripcion: "Francés III", crs: 3, prerequisitos: "FRAN 3142" },
    { curso: "FRAN 3144", descripcion: "Francés IV", crs: 3, prerequisitos: "FRAN 3143" },
    { curso: "FRAN 3151", descripcion: "Francés Comercial I", crs: 3, prerequisitos: "FRAN 3143" },
    { curso: "FRAN 3155", descripcion: "Conversacional I", crs: 2, prerequisitos: "FRAN 3141" },
    { curso: "FRAN 4036", descripcion: "Francés Comercial II", crs: 3, prerequisitos: "FRAN 3144 o FRAN 3151" },
    { curso: "FRAN 4115", descripcion: "Composición", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4116", descripcion: "Conversacional II", crs: 3, prerequisitos: "FRAN 3155" },
    { curso: "FRAN 4141", descripcion: "Poesía Francesa", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4142", descripcion: "Poesía Francesa", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4151", descripcion: "Cultura y Civilización Francesa I", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4152", descripcion: "Cultura y Civilización Francesa II", crs: 3, prerequisitos: "FRAN 4151" },
    { curso: "FRAN 4181", descripcion: "Panorama Lit. Francesa I", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4182", descripcion: "Panorama Lit. Francesa II", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4191", descripcion: "Panorama Lit. Francesa III", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "FRAN 4192", descripcion: "Panorama Lit. Francesa IV", crs: 3, prerequisitos: "FRAN 3144" },
    { curso: "LITE 3025", descripcion: "Teoría Literaria", crs: 3, prerequisitos: "" },
    { curso: "LITE 3035", descripcion: "Mitología en la Literatura Occidental", crs: 3, prerequisitos: "" },
    { curso: "LITE 3041", descripcion: "Intro. A la Literatura Comparada I", crs: 3, prerequisitos: "" },
    { curso: "LITE 3042", descripcion: "Intro. A la Literatura Comparada II", crs: 3, prerequisitos: "LITE 3041" },
    { curso: "LITE 4011", descripcion: "Evolución de la Novela I", crs: 3, prerequisitos: "LITE 3042 Correquisito: LITE 3025" },
    { curso: "LITE 4012", descripcion: "Evolución de la Novela II", crs: 3, prerequisitos: "LITE 4011" },
    { curso: "LITE 4021", descripcion: "Drama Comparado I", crs: 3, prerequisitos: "LITE 3042 Correquisito: LITE 3025" },
    { curso: "LITE 4022", descripcion: "Drama Comparado II", crs: 3, prerequisitos: "LITE 4021" },
    { curso: "LITE 4035", descripcion: "Literatura Medieval Europea", crs: 3, prerequisitos: "" },
    { curso: "LITE 4045", descripcion: "Literatura de Renacimiento", crs: 3, prerequisitos: "" },
    { curso: "LITE 4051", descripcion: "Poesía Comparada", crs: 3, prerequisitos: "LITE 3042 Correquisito: LITE 3025" },
    { curso: "LITE 4052", descripcion: "Poesía Comparada", crs: 3, prerequisitos: "LITE 4051" },
    { curso: "LITE 4075", descripcion: "Crítica Literaria", crs: 3, prerequisitos: "ESPA 3212 o 3022 o LITE 3041" },
    { curso: "LITE 4081", descripcion: "Romantisismo en Literatura I", crs: 3, prerequisitos: "" },
    { curso: "LITE 4082", descripcion: "Romantisismo en Literatura II", crs: 3, prerequisitos: "" },
    { curso: "LITE 4990", descripcion: "Tópicos Especiales", crs: 3, prerequisitos: "6 crs. LITE o ESPA" },
    { curso: "LITE 5995", descripcion: "Temas Especiales en Lit. Comparada", crs: 3, prerequisitos: "Director" },
    { curso: "HUMA 3111", descripcion: "Introducción a la Cultura de Occidente", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3112", descripcion: "Introducción a la Cultura de Occidente II", crs: 3, prerequisitos: "HUMA 3111" },
    { curso: "HUMA 3115", descripcion: "Viajes de Estudios a Europa", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3116", descripcion: "Viajes de Estudios a Israel", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3271", descripcion: "La Biblia como Documento Literario e Histórico: Antiguo Testamento", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3272", descripcion: "La Biblia como Documento Literario e Histórico: Nuevo Testamento", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3391", descripcion: "Civilización Clásica I", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3392", descripcion: "Civilización Clásica II", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3401", descripcion: "Cultura y Civilización en A.L I", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3402", descripcion: "Cultura y Civilización en A.L II", crs: 3, prerequisitos: "HUMA 3401" },
    { curso: "HUMA 3411", descripcion: "Introducción a la Cultura de Asia del Sur", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3412", descripcion: "Introducción a la Cultura de Asia del Este", crs: 3, prerequisitos: "" },
    { curso: "HUMA 3425", descripcion: "Pensamiento Puertorriqueño", crs: 3, prerequisitos: "" },
    { curso: "HUMA 4995", descripcion: "Temas Especiales", crs: 3, prerequisitos: "HUMA 3111" },
    { curso: "HUMA 4996", descripcion: "Temas Especiales", crs: 3, prerequisitos: "HUMA 3111" },
    { curso: "ITAL 3071", descripcion: "Italiano I", crs: 3, prerequisitos: "" },
    { curso: "ITAL 3072", descripcion: "Italiano II", crs: 3, prerequisitos: "ITAL 3071" },
    { curso: "ITAL 3073", descripcion: "Italiano III", crs: 3, prerequisitos: "ITAL 3072" },
    { curso: "ITAL 3074", descripcion: "Italiano IV", crs: 3, prerequisitos: "ITAL 3073" },
    { curso: "ITAL 3085", descripcion: "El Cine Italiano (Dictado en Español)", crs: 3, prerequisitos: "" },
    { curso: "ITAL 3086", descripcion: "Conversación en Italiano", crs: 3, prerequisitos: "ITAL 3072" },
    { curso: "ITAL 3087", descripcion: "Cultura Italiana", crs: 3, prerequisitos: "" },
    { curso: "ITAL 3090", descripcion: "Viajes de Estudio a Italia", crs: 3, prerequisitos: "Director" },
    { curso: "ITAL 4011", descripcion: "Literatura Italiana I", crs: 3, prerequisitos: "ITAL 3074" },
    { curso: "ITAL 4012", descripcion: "Literatura Italiana II", crs: 3, prerequisitos: "ITAL 4011" },
    { curso: "GRIE 3011", descripcion: "Griego Elemental I", crs: 3, prerequisitos: "" },
    { curso: "GRIE 3012", descripcion: "Griego Elemental II", crs: 3, prerequisitos: "GRIE 3011" },
    { curso: "JAPO 3111", descripcion: "Japones I", crs: 3, prerequisitos: "" },
    { curso: "JAPO 3112", descripcion: "Japones II", crs: 3, prerequisitos: "JAPO 3111 o 3101" },
    { curso: "JAPO 3211", descripcion: "Japones III", crs: 3, prerequisitos: "JAPO 3112 o 3102" },
    { curso: "JAPO 3212", descripcion: "Japones IV", crs: 3, prerequisitos: "JAPO 3211 o 3201" },
    { curso: "LATI 3011", descripcion: "Latín Elemental I", crs: 3, prerequisitos: "" },
    { curso: "LATI 3012", descripcion: "Latín Elemental II", crs: 3, prerequisitos: "LATI 3011" },
    { curso: "LATI 3013", descripcion: "Latín Intermedio I", crs: 3, prerequisitos: "LATI 3012" },
    { curso: "LATI 3014", descripcion: "Latín Intermedio II", crs: 3, prerequisitos: "LATI 3013" },
    { curso: "PSIC 3001", descripcion: "Principios de Psicología", crs: 3, prerequisitos: "" },
    { curso: "PSIC 3002", descripcion: "Principios de Psicología", crs: 3, prerequisitos: "PSIC 3001" },
    { curso: "PSIC 3006", descripcion: "Psicología Social", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3015", descripcion: "Teoría de la Personalidad", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3016", descripcion: "Psicología Patológica", crs: 3, prerequisitos: "" },
    { curso: "PSIC 3027", descripcion: "Psicología de los Niños", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3028", descripcion: "Psicología del Adulto", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3035", descripcion: "Psicología Aplicada", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3036", descripcion: "Psicología de la Educación", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3037", descripcion: "Psicología de la Educación", crs: 3, prerequisitos: "PSIC 3036" },
    { curso: "PSIC 3039", descripcion: "Psicología del Adolescente", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3040", descripcion: "Desarrollo Personal", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3045", descripcion: "Higiene Mental", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3060", descripcion: "Psicología Ambiental", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3070", descripcion: "Psicología Cognositiva", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 3117", descripcion: "Sistema de Ayuda Folklorica", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 4009", descripcion: "Psicología Industrial", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 4088", descripcion: "Temas Especiales en Psicología", crs: 3, prerequisitos: "Director" },
    { curso: "PSIC 4116", descripcion: "Psicología de la Sexualidad", crs: 3, prerequisitos: "PSIC 3002" },
    { curso: "PSIC 5016", descripcion: "Psicología Analítica", crs: 3, prerequisitos: "12 créditos en PSIC" },
    { curso: "CIPO 3011", descripcion: "Pricipios de Ciencias Políticas", crs: 3, prerequisitos: "" },
    { curso: "CIPO 3025", descripcion: "Sistema Político de Estados Unidos", crs: 3, prerequisitos: "" },
    { curso: "CIPO 3035", descripcion: "Sistema Político Puertorriqueño", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 3045", descripcion: "Organizaciones Internacionales", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 3065", descripcion: "Relaciones Internacionales", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 3095", descripcion: "Gobierno Municipal", crs: 3, prerequisitos: "" },
    { curso: "CIPO 3175", descripcion: "Introducción al Derecho", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4005", descripcion: "Derecho Constitucional de E.U.", crs: 3, prerequisitos: "CIPO 3011 y CIPO 3025" },
    { curso: "CIPO 4015", descripcion: "Sistemas Políticos Comparados", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4016", descripcion: "Política y Gobierno del Medio Oriente", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4035", descripcion: "Partidos Políticos", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4036", descripcion: "Gobierno y Política de Estados Comunistas", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4045", descripcion: "Administración Pública", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4046", descripcion: "Temas Especiales en Ciencias Políticas", crs: 3, prerequisitos: "Director" },
    { curso: "CIPO 4051", descripcion: "Teoría Política I", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4052", descripcion: "Teoría Política II", crs: 3, prerequisitos: "CIPO 4051" },
    { curso: "CIPO 4056", descripcion: "Introducción al Derecho Penal", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4065", descripcion: "Ley Internacional", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4085", descripcion: "Política Exterior de E.U.", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4095", descripcion: "Sistemas Políticos de Caribe", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4105", descripcion: "Política y Gobierno en América Latina", crs: 3, prerequisitos: "CIPO 3014" },
    { curso: "CIPO 4115", descripcion: "Relaciones Internacionales de America Latina", crs: 3, prerequisitos: "CIPO 3011" },
    { curso: "CIPO 4125", descripcion: "Ideologia Comunista", crs: 3, prerequisitos: "CIPO 4052" },
    { curso: "CIPO 4127", descripcion: "Comercio Internacional y Política Mundial", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4160", descripcion: "Introducción al Derecho", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4236", descripcion: "Revolución Siglo XX en América Latina", crs: 3, prerequisitos: "" },
    { curso: "CIPO 4735", descripcion: "Modelo de las Naciones Unidas", crs: 3, prerequisitos: "Director" },
    { curso: "HIST 3201", descripcion: "Historia del Mundo Moderno I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3202", descripcion: "Historia del Mundo Moderno II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3091", descripcion: "Historia de Francia I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3092", descripcion: "Historia de Francia II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3111", descripcion: "Historia de los Estados Unidos I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3112", descripcion: "Historia de los Estados Unidos II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3121", descripcion: "Historia de Política Exterior de E.U. I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3122", descripcion: "Historia de Política Exterior de E.U. II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3141", descripcion: "Historia de España I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3142", descripcion: "Historia de España II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3155", descripcion: "Historia de Europa Siglo XIX", crs: 3, prerequisitos: "" },
    { curso: "HIST 3158", descripcion: "Historia de Europa Siglo XX", crs: 3, prerequisitos: "" },
    { curso: "HIST 3165", descripcion: "Historia del Renacimiento", crs: 3, prerequisitos: "" },
    { curso: "HIST 3185", descripcion: "Historia Medieval", crs: 3, prerequisitos: "" },
    { curso: "HIST 3195", descripcion: "Historia Antigua", crs: 3, prerequisitos: "" },
    { curso: "HIST 3211", descripcion: "Historia Hispanoamericana I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3212", descripcion: "Historia Hispanoamericana II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3221", descripcion: "Historia de las Antillas I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3222", descripcion: "Historia de las Antillas II", crs: 3, prerequisitos: "" },
    { curso: "HIST 3241", descripcion: "Historia de Puerto Rico I", crs: 3, prerequisitos: "" },
    { curso: "HIST 3242", descripcion: "Historia de Puerto Rico II", crs: 3, prerequisitos: "" },
    { curso: "HIST 4005", descripcion: "Historia de México", crs: 3, prerequisitos: "" },
    { curso: "HIST 4055", descripcion: "Temas en la Historia de Europa", crs: 3, prerequisitos: "HIST 4222" },
    { curso: "HIST 4111", descripcion: "Historia Social de Estados Unidos I", crs: 3, prerequisitos: "" },
    { curso: "HIST 4112", descripcion: "Historia Social de Estados Unidos II", crs: 3, prerequisitos: "HIST 4111" },
    { curso: "HIST 4117", descripcion: "Historia Laboral de Estados Unidos", crs: 3, prerequisitos: "" },
    { curso: "HIST 4165", descripcion: "Historia de Brazil", crs: 3, prerequisitos: "" },
    { curso: "HIST 4171", descripcion: "Historia de Rusia I", crs: 3, prerequisitos: "" },
    { curso: "HIST 4172", descripcion: "Historia de Rusia II", crs: 3, prerequisitos: "" },
    { curso: "HIST 4220", descripcion: "History of Germany Since 1871", crs: 3, prerequisitos: "" },
    { curso: "HIST 4235", descripcion: "Revolución en Latinoamérica", crs: 3, prerequisitos: "" },
    { curso: "HIST 4345", descripcion: "Temas en la Historia de Puerto Rico", crs: 3, prerequisitos: "" },
    { curso: "HIST 4381", descripcion: "Historia de Inglaterra I", crs: 3, prerequisitos: "" },
    { curso: "HIST 4382", descripcion: "Histiria de Inglaterra II", crs: 3, prerequisitos: "" },
    { curso: "CISO 3017", descripcion: "Introducción a las masculinidades", crs: 3, prerequisitos: "" },
    { curso: "CISO 3026/CIPO 3026", descripcion: "Introducción al Análisis de Política Pública", crs: 3, prerequisitos: "" },
    { curso: "CISO 3027/CIPO 3027", descripcion: "Participación Ciudadana en los Procesos de Toma de Decisiones Públicas", crs: 3, prerequisitos: "" },
    { curso: "CISO 3121", descripcion: "Introducción a las CiSo", crs: 3, prerequisitos: "" },
    { curso: "CISO 3122", descripcion: "Introducción a las CiSo", crs: 3, prerequisitos: "CISO 3121" },
    { curso: "CISO 3126", descripcion: "Diversidad Cultural", crs: 3, prerequisitos: "" },
    { curso: "CISO 3145", descripcion: "Investigación Bibliográfica en las CiSo", crs: 3, prerequisitos: "" },
    { curso: "CISO 4056", descripcion: "Aspectos Psicosociales del Género", crs: 3, prerequisitos: "CISO 3121" },
    { curso: "SOCI 3007", descripcion: "Introducción a la Sociología Ambiental", crs: 3, prerequisitos: "" },
    { curso: "SOCI 3261", descripcion: "Introducción a la Sociología I", crs: 3, prerequisitos: "" },
    { curso: "SOCI 3262", descripcion: "Introducción a la Sociología II", crs: 3, prerequisitos: "SOCI 3261" },
    { curso: "SOCI 3265", descripcion: "Método de Investigación en CiSo", crs: 3, prerequisitos: "SOCI 3262 o PSIC 3002 o CIPO 3011 o CISO 3122 o ANTR 3015 o ENCON 3021" },
    { curso: "SOCI 3285", descripcion: "Dinámica de Grupo", crs: 3, prerequisitos: "SOCI 3262 o PSIC 3002 o CIPO 3011 o CISO 3122 o ANTR 3015 o ENCON 3021" },
    { curso: "SOCI 3295", descripcion: "Historia del Pensamiento Social", crs: 3, prerequisitos: "" },
    { curso: "SOCI 3305", descripcion: "Demografía", crs: 3, prerequisitos: "CISO 3122 o PSIC 3002 o SOCI 3262" },
    { curso: "SOCI 3315", descripcion: "Matrimonio y Familia", crs: 3, prerequisitos: "" },
    { curso: "SOCI 3325", descripcion: "Sociología Urbana", crs: 3, prerequisitos: "CISO 3122 o PSIC 3002 o SOCI 3262" },
    { curso: "SOCI 3335", descripcion: "Desorganización Social", crs: 3, prerequisitos: "CISO 3122 o PSIC 3002 o ANTR 3015" },
    { curso: "SOCI 3337", descripcion: "Delincuencia Juvenil", crs: 3, prerequisitos: "CISO 3121 o SOCI 3261" },
    { curso: "SOCI 3345", descripcion: "Organización Social", crs: 3, prerequisitos: "CISO 3121 o SOCI 3262 o PSIC 3002 o ANTR 3015 o ECON 3021 o HIST 3202" },
    { curso: "SOCI 3355", descripcion: "Población y Problemas de América Latina", crs: 3, prerequisitos: "" },
    { curso: "SOCI 4095", descripcion: "Introducción al Trabajo Social", crs: 3, prerequisitos: "CISO 3122" },
    { curso: "SOCI 4101", descripcion: "Criminología I", crs: 3, prerequisitos: "CISO 3122 o SOCI 3262 o PSIC 3002" },
    { curso: "SOCI 4115", descripcion: "Teoría Social Contemporánea", crs: 3, prerequisitos: "SOCI 3262" },
    { curso: "SOCI 4125", descripcion: "Estudio de la Sociedad Puertorriqueña", crs: 3, prerequisitos: "PSIC 3002 o SOCI 3262 o CIPO 3011 o ANTR 3015" },
    { curso: "SOCI 4135", descripcion: "Socilogía Comparada", crs: 3, prerequisitos: "12 Créditos en SOCI" },
    { curso: "SOCI 4145", descripcion: "Planificación Social", crs: 3, prerequisitos: "" },
    { curso: "SOCI 4155", descripcion: "Cambio Cultural y Social", crs: 3, prerequisitos: "PSIC 3002 o SOCI 3262 o CIPO 3011 o ANTR 3015" },
    { curso: "SOCI 4157", descripcion: "Tecnologia y Sociedad", crs: 3, prerequisitos: "" },
    { curso: "SOCI 4991", descripcion: "Estudio Independiente I", crs: 3, prerequisitos: "12 Créditos en SOCI y Director" },
    { curso: "SOCI 5015", descripcion: "Energia, Ambiente y Sociedad", crs: 3, prerequisitos: "" },
    { curso: "ANTR 3005", descripcion: "Introducción a la Antropología Cultural", crs: 3, prerequisitos: "" },
    { curso: "ANTR 3015", descripcion: "Introducción a la Antropología Física", crs: 3, prerequisitos: "" },
    { curso: "ECON 3021", descripcion: "Principios de Economía I", crs: 3, prerequisitos: "" },
    { curso: "ECON 3022", descripcion: "Principios de Economía II", crs: 3, prerequisitos: "" },
    { curso: "ECON 3061", descripcion: "Historia Econ. Del Mundo Occidental I", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 3075", descripcion: "Teoría de Distribución de Ingresos", crs: 3, prerequisitos: "ECON 3021 y 3022 y ECON 3091" },
    { curso: "ECON 3085", descripcion: "Economía de Puerto Rico", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 3086", descripcion: "Probl. Contemporáneos en la Econ. De Puerto Rico", crs: 3, prerequisitos: "ECON 3085" },
    { curso: "ECON 3091", descripcion: "Teoría Microeconómica", crs: 3, prerequisitos: "ECON 3021" },
    { curso: "ECON 3092", descripcion: "Teoria Marcoeconómica", crs: 3, prerequisitos: "ECON 3022" },
    { curso: "ECON 3095", descripcion: "Mercado de Valores", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4006", descripcion: "Fluctuaciones Económicas", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4007", descripcion: "Metodos Cuantitativos en Economía", crs: 3, prerequisitos: "ECON 3021 y 3022 y ESMA3101 o MATE 3101" },
    { curso: "ECON 4009", descripcion: "Economía de la Regulación y Antimonopolio", crs: 3, prerequisitos: "" },
    { curso: "ECON 4015", descripcion: "Desarrollo Económico", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4016", descripcion: "Economía Gerencial", crs: 3, prerequisitos: "ECON 3091" },
    { curso: "ECON 4017", descripcion: "Introducción a la Econometría", crs: 3, prerequisitos: "ECON 3091 y 3092 y MATE 3049 y (MATE 3102 y ESMA 3102)" },
    { curso: "ECON 4025", descripcion: "Teoría y Política Monetaria", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4026", descripcion: "Política Fiscal y Monetaria", crs: 3, prerequisitos: "ECON 4025 y 3092 y ECON 3091" },
    { curso: "ECON 4027", descripcion: "Economía de la Transportación", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4028", descripcion: "Economía de los Recursos Naturales", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4045", descripcion: "Sistemas Económicos Comparados", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4046", descripcion: "Análisis Insumo Producto", crs: 3, prerequisitos: "ECON 3021 y 3022 y MATE 3000" },
    { curso: "ECON 4047", descripcion: "Economia del Comercio Electrónico y la Industria", crs: 3, prerequisitos: "ECON 3021" },
    { curso: "ECON 4055", descripcion: "Historia del Pensamiento Económico", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4056", descripcion: "Economía Ambiental", crs: 3, prerequisitos: "ECON 3021" },
    { curso: "ECON 4065", descripcion: "Finanzas Públicas", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4085", descripcion: "Economía Internacional", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4185", descripcion: "Problemas Económicos de Latinoamérica", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4196", descripcion: "Economía en Organizaciones Industriales", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4225", descripcion: "Economía del Trabajo", crs: 3, prerequisitos: "ECON 3021 y 3022" },
    { curso: "ECON 4307", descripcion: "Evaluación de Proyecto", crs: 3, prerequisitos: "ECON 3022 y ECON 3091" },
    { curso: "ECON 4405", descripcion: "Análisis Contemporáneo de Problemas Eco.", crs: 3, prerequisitos: "ECON 3091 y 3092 y (MATE 3102 y ESMA 3102)" },
    { curso: "ECON 4425", descripcion: "Práctica en la Industria", crs: 3, prerequisitos: "" },
    { curso: "ECON 4995", descripcion: "Temas Especiales", crs: 3, prerequisitos: "Director" },
    { curso: "ESPA 3021", descripcion: "Obras Maestras de la Literatura Hisp. I", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3022", descripcion: "Obras Maestras de la Literatura Hisp. II", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3208", descripcion: "Redacción y Estilo", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3211", descripcion: "Literatura Española I", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3212", descripcion: "Literatura Española II", crs: 3, prerequisitos: "ESPA 3211" },
    { curso: "ESPA 3295", descripcion: "Gramática", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3305", descripcion: "Cine y Literatura", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3315", descripcion: "Mujer y Literatura", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 3406", descripcion: "Redacción Creativa: La Narrativa Corta", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4011", descripcion: "Diaconía del Español", crs: 3, prerequisitos: "(ESPA 4201 y 4202) o INGL 3225" },
    { curso: "ESPA 4012", descripcion: "El Español en Hispanoamérica", crs: 3, prerequisitos: "(ESPA 4201 y 4202) o INGL 3225" },
    { curso: "ESPA 4021", descripcion: "Cervantes I", crs: 3, prerequisitos: "ESPA 3212" },
    { curso: "ESPA 4022", descripcion: "Cervantes II", crs: 3, prerequisitos: "ESPA 4021" },
    { curso: "ESPA 4051", descripcion: "Literatura Española Siglo XIX", crs: 3, prerequisitos: "ESPA 3212" },
    { curso: "ESPA 4056", descripcion: "Modernismo en Hispanoamérica", crs: 3, prerequisitos: "ESPA 3212" },
    { curso: "ESPA 4061", descripcion: "Poesía Española I", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4062", descripcion: "Poesía Española II", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4071", descripcion: "El Cuento en Hispanoamérica", crs: 3, prerequisitos: "" },
    { curso: "ESPA 4105", descripcion: "Poesia Puertorriqueña(1930 S al S.XIX)", crs: "3", prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4201", descripcion: "Introducción a la Lingüística I", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4202", descripcion: "Introducción a la Lingüística II", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4221", descripcion: "Literatura Hispanoamericana I", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4222", descripcion: "Literatura Hispanoamericana II", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4231", descripcion: "Literatura Puertorriqueña I", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4232", descripcion: "Literatura Puertorriqueña II", crs: 3, prerequisitos: "ESPA 3102" },
    { curso: "ESPA 4251", descripcion: "Literatura del Siglo de Oro I", crs: 3, prerequisitos: "ESPA 3212" },
    { curso: "ESPA 4252", descripcion: "Literatura del Siglo de Oro II", crs: 3, prerequisitos: "ESPA 4251" },
    { curso: "ESPA 4405", descripcion: "Informes Técnicos", crs: 3, prerequisitos: "ESPA 3102 y 18 crs. Especialidad" },
    { curso: "ESPA 4995", descripcion: "Tópicos Especiales", crs: 3, prerequisitos: "Director" },
    { curso: "ESPA 4996", descripcion: "Tópicos Especiales", crs: 3, prerequisitos: "Director" },
    { curso: "INGL 3001", descripcion: "Survey of English Literature to 1600", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 3002", descripcion: "Survey of English Literature from 1600 to them Modern Period", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 3175", descripcion: "Poetry Writing", crs: 3, prerequisitos: "INGL 3103 and 3104 or INGL 3211 and INGL 3212" },
    { curso: "INGL 3191", descripcion: "Conversational English", crs: 3, prerequisitos: "INGL 3202" },
    { curso: "INGL 3225", descripcion: "Introduction to Study of Language", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3238", descripcion: "Creative Writing", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3236", descripcion: "Technical Report Writing", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3250", descripcion: "Oratoria", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3289", descripcion: "Ingles Conversacional", crs: 3, prerequisitos: "INGL 3202" },
    { curso: "INGL 3300", descripcion: "Studies in Literature and Languages", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3305", descripcion: "Modern American Literature", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3312", descripcion: "The Novel in English Literature", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3318", descripcion: "Literature of English Speaking Caribbean", crs: 3, prerequisitos: "INGL 320 o ,3104 0 3112" },
    { curso: "INGL 3325", descripcion: "Modern Poetry", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3326", descripcion: "Literatura de Minorias en los EU", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3345", descripcion: "Temas en Cine", crs: 3, prerequisitos: "" },
    { curso: "INGL 3351", descripcion: "American Literature 1860", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 3352", descripcion: "American Literature from 1860 the Early Modern Period", crs: 3, prerequisitos: "INGL 3202 o 3104 o 3012 o 3212" },
    { curso: "INGL 4000", descripcion: "English Literature of the 17th Century", crs: 3, prerequisitos: "3 crs. 4000 level y Director" },
    { curso: "INGL 4008", descripcion: "Creative Nonfiction Writing", crs: 3, prerequisitos: "INGL 3231 y INGl 3238 o Director" },
    { curso: "INGL 4009", descripcion: "Literature of the English Renaissance", crs: 3, prerequisitos: "6 crs. Of English at level 3300 y Director" },
    { curso: "INGL 4017", descripcion: "The Romantic Movement Literature", crs: 3, prerequisitos: "3 crs. 4000 level" },
    { curso: "INGL 4025", descripcion: "Shakespeare Literature", crs: 3, prerequisitos: "6 crs. Of English at level 3300 y Director" },
    { curso: "INGL 4026", descripcion: "Sociolinguistics", crs: 3, prerequisitos: "INGL 3225 o Director" },
    { curso: "INGL 4027", descripcion: "Old and Middle English Literature", crs: 3, prerequisitos: "6 crs. Of English at level 3300 y Director" },
    { curso: "INGL 4045", descripcion: "Literature of English Speaking Caribbean", crs: 3, prerequisitos: "6 crs. INGL e (INGL 3202 o INGL 3104 o 3012)" },
    { curso: "INGL 4047", descripcion: "English Phonology", crs: 3, prerequisitos: "(INGL 3227 e INLG 3225) y Director" },
    { curso: "INGL 4095", descripcion: "The Victorian Period", crs: 3, prerequisitos: "6 crs. Of English at level 3300" },
    { curso: "INGL 4096", descripcion: "Modern Poetry", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4097", descripcion: "English Literature of the 20th Century", crs: 3, prerequisitos: "6 crs. Of English at level 3300 y Director" },
    { curso: "INGL 4107", descripcion: "Rhetorical Theory", crs: 3, prerequisitos: "INGL 3231" },
    { curso: "INGL 4125", descripcion: "Semantics English", crs: 3, prerequisitos: "INGL 3225" },
    { curso: "INGL 4205", descripcion: "Morphology and Syntax", crs: 3, prerequisitos: "INGL 3225" },
    { curso: "INGL 4206", descripcion: "The Structure of English", crs: 3, prerequisitos: "INGL 3225 o Director" },
    { curso: "INGL 4208", descripcion: "History of the English Language", crs: 3, prerequisitos: "INGL 3225" },
    { curso: "INGL 4216", descripcion: "Modern Drama in English since 1890", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4300", descripcion: "Studies in Literaure and Languages", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4305", descripcion: "Modern American Lit. Surv. Of English", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4306", descripcion: "The Structure of English", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4308", descripcion: "The Novel in English Literature", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4309", descripcion: "The Novel in America Literature", crs: 3, prerequisitos: "6 crs. Of English at level 3300 e (INGL 3202 o 3104 o INGL 3012)" },
    { curso: "INGL 4316", descripcion: "American Romanticism", crs: 3, prerequisitos: "3 crs. 4000 level y Director" },
    { curso: "INGL 4317", descripcion: "American Realism and Naturalism", crs: 3, prerequisitos: "3 crs. 4000 level y Director" },
    { curso: "INGL 5009", descripcion: "Constrastive Grammar", crs: 3, prerequisitos: "Director" },
    { curso: "INGL 5015", descripcion: "English and American Literary Criticisms", crs: 3, prerequisitos: "Director" },
    { curso: "INGL 5025", descripcion: "Current Approaches in Linguistics Theory", crs: 3, prerequisitos: "Director" },
    { curso: "EDFU 3001/3011", descripcion: "Crecimiento y Desarrollo Humano I", crs: 3, prerequisitos: "" },
    { curso: "EDFU 3012", descripcion: "Fundamentos de la Psicologia Educativa", crs: 3, prerequisitos: "" },
    { curso: "EDFU 3007", descripcion: "Fundamentos Sociales de la Educación", crs: 3, prerequisitos: "" },
    { curso: "EDFU 3055", descripcion: "Fundamentos Legales de la Educación", crs: 3, prerequisitos: "" },
    { curso: "EDFU 4006", descripcion: "El niño y su Ambiente Social", crs: 3, prerequisitos: "" },
    { curso: "EDFU 4019", descripcion: "Fundamentos Filosóficos de Educación", crs: 3, prerequisitos: "" },
    { curso: "INGE 3007", descripcion: "Historia de la Tecnología", crs: 3, prerequisitos: "HIST 3202" },
    { curso: "INTD 3990", descripcion: "Temas Selectos", crs: "1 a 9", prerequisitos: "" },
    { curso: "INTD 3355", descripcion: "Metodos de Investigación Bibliográfica", prerequisitos: "" },
    { curso: "INTD 4210", descripcion: "Problemas Filosóficos en la Ciencia Cognitiva", crs: 3, prerequisitos: "" },
    { curso: "EDES 3205", descripcion: "Assistive Technology in Special Education", crs: 3, prerequisitos: "" },
    { curso: "EDES 4006", descripcion: "Nature and Needs of Exceptional Learners", crs: 3, prerequisitos: "" },
    { curso: "EDES 4048", descripcion: "Behavior Modification Applied to Classroom Setting", crs: 3, prerequisitos: "EDES 4006" },
    { curso: "EDES 4055", descripcion: "Educational Strategies for the Inclusion of Students with Special Needs in the Regular Classroom", crs: 3, prerequisitos: "EDES 4006" },
    { curso: "EDES 4077", descripcion: "Communication Techniques for the Hearing Impaired", crs: 3, prerequisitos: "" },
    { curso: "EDES 4096", descripcion: "Methods in Teaching, Reading and Writing in Special Education K-12", crs: 3, prerequisitos: "EDES 4006" },
    { curso: "EDES 4097", descripcion: "Language Art Methods in Special Education K-12", crs: 3, prerequisitos: "EDES 4006" },
    { curso: "EDES 4098", descripcion: "Methodology of Teaching Mathematics in Special Education K-12", crs: 3, prerequisitos: "" },
    { curso: "EDES 4125", descripcion: "Autism : Psychological & Neuro-Biochemical Aspects", crs: 3, prerequisitos: "EDES 4006" },
    { curso: "LING 4010", descripcion: "El Lenguaje en la mente humana: una introducción a la lingüística", crs: 3, prerequisitos: "" },
    { curso: "LING 4020", descripcion: "Variación y cambio lingüístico", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 4040", descripcion: "Fonética articulatoria y acústica", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5030", descripcion: "Introducción a la Sintaxis Generativa", crs: 3, prerequisitos: "LING 4010 o dir" },
    { curso: "LING 5040", descripcion: "Introducción a la Fonología Generativa", crs: 3, prerequisitos: "LING 4010 o dir" },
    { curso: "LING 5050", descripcion: "Teoría Morfológica", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5060", descripcion: "Semántica Composicional", crs: 3, prerequisitos: "LING 4010 o dir" },
    { curso: "LING 5075", descripcion: "Adquisición y desarrollo Lingüístico", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5080", descripcion: "Lingüística computacional", crs: 3, prerequisitos: "LING 4010 o dir" },
    { curso: "LING 5090", descripcion: "Fundamentos formales de la teoría lingüística", crs: 3, prerequisitos: "LING 4010 o MATE 3171 o dir" },
    { curso: "LING 5100", descripcion: "Fundamentos filosóficos de la teoría lingüística", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5110", descripcion: "Problemas fundacionales en biolingüística", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5120", descripcion: "Psicolingüística", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5130", descripcion: "Neurolingüistica", crs: 3, prerequisitos: "LING 4010" },
    { curso: "LING 5170", descripcion: "Bilingüismo y adquisición de segundas lenguas en niños", crs: 3, prerequisitos: "LING 4010" },
    { curso: "CCOG 4010/INTD4110", descripcion: "Introducción a la ciencia cognitiva", crs: 3, prerequisitos: "" },
    { curso: "CCOG 4210/INTD4210", descripcion: "Problemas filosóficos en la ciencia cognitiva", crs: 3, prerequisitos: "" },
    { curso: "CCOG 5010/INTD 5010", descripcion: "Introducción a la neurociencia", crs: 3, prerequisitos: "" },
  ];


  // Function to handle search input
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    
    const filteredCourses = courseData.filter((course) =>
      course.curso.toLowerCase().includes(searchTerm) ||
      course.descripcion.toLowerCase().includes(searchTerm) ||
      course.prerequisitos.toLowerCase().includes(searchTerm)
    );
    
    setFilteredCourses(filteredCourses);
  };

  // Initialize filteredCourses with all courses on initial render
  useState(() => {
    setFilteredCourses(courseData);
  }, []);

  // Calculate index of the last entry on the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  // Calculate index of the first entry on the current page
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  // Get the current entries for the current page
  const currentEntries = filteredCourses.slice(indexOfFirstEntry, indexOfLastEntry);

  // Function to handle changing the number of entries per page
  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  // Function to handle clicking next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle clicking previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={styles.Home}>
      <h1>Free Electives</h1>
      <div className={styles.TopControls}>
        <input
          type="text"
          placeholder="Search course..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.SearchBar}
        />
        <label htmlFor="showEntries">Show entries:</label>
        <select
          id="showEntries"
          value={entriesPerPage}
          onChange={handleEntriesPerPageChange}
          className={styles.ShowEntries}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className={styles.TableContainer}>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>CURSO</th>
              <th>DESCRIPCION</th>
              <th>CRS</th>
              <th>PREREQUISITOS</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((course, index) => (
              <tr key={index}>
                <td>{course.curso}</td>
                <td>{course.descripcion}</td>
                <td>{course.crs}</td>
                <td>{course.prerequisitos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.Pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentEntries.length < entriesPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}