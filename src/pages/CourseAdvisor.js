import React from "react";
import styles from "../styles/pages/courseAdvisor.module.scss";

export default function CourseAdvisorPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [creditsPerSemester, setCreditsPerSemester] = React.useState(16);

  // Dummy Data until Database Setup.
  const programData = ["CIIC", "INSO", "INME", "ICOM"]
  const courseData = [
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
    { curso: "SOCI 3315", descripcion: "Matrimonio y Familia", crs: 3, prerequisitos: "" }
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
  React.useState(() => {
    setFilteredCourses(courseData);
  }, []);

  // Calculate index of the last entry on the current page
  const indexOfLastEntry = currentPage * creditsPerSemester;
  // Calculate index of the first entry on the current page
  const indexOfFirstEntry = indexOfLastEntry - creditsPerSemester;
  // Get the current entries for the current page
  const currentEntries = filteredCourses.slice(indexOfFirstEntry, indexOfLastEntry);

  // Function to handle changing the number of entries per page
  const handleCreditsPerPageSemester = (event) => {
    setCreditsPerSemester(parseInt(event.target.value));
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
    <div>
      <h1>Course Advisor</h1>
      <div className={styles.Contents}>
        <div className={styles.InfoBox}>
          <p className={styles.Text}>
            Course Advisor offers a comprehensive list of recommended courses
            provided your major/degree and desired amount of credits per
            semester. Please note that it'll be recommended to take courses and
            its corequisites at the same time. If you do not wish to specify a
            certain amount of credits per semester and just be able to see the
            the recommended sequence for your courses, select "any" in the
            credits selector. 
          </p>
        </div>
        <div className={styles.ControlBox}>
          <div className={styles.leftBox}>
            <h5>Select Study Program: </h5>
            <div className={styles.ProgramSelector}>
              <select className={styles.Input}>
                {programData.map((program, index) => (
                  <option key={index} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
            <h5>Enter Amount of Credits per Semester: </h5>
            <div className={styles.CreditSelector}>
              <input
                type="number"
                min="0"
                max="21"
                placeholder="0-21"
                value={creditsPerSemester}
                onChange={handleCreditsPerPageSemester}
              />
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.PageControl}>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span> Semester: {currentPage} </span>
              <button onClick={handleNextPage} disabled={currentEntries.length < creditsPerSemester}>
                Next
              </button>
            </div>
          </div>
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
      </div>
    </div>
  );
}
