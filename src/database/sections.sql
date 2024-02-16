CREATE TABLE courseSections (
    CourseCode VARCHAR(10),
    SectionNumber VARCHAR(10),
    Capacity INT,
    TimeSlot VARCHAR(255),
    Professor VARCHAR(255),
    PRIMARY KEY (CourseCode, SectionNumber)
);

INSERT INTO courseSections (CourseCode, SectionNumber, Capacity, TimeSlot, Professor) VALUES
('CIIC 3015', '096', 120, '3:30pm - 4:45pm | MJ', 'Heidy Sierra GIl'),
('CIIC 3015', '070L', 29, '1:30 pm - 3:20 pm | W', '(KEVIN NINO TEJADA) Heidy Sierra Gil'),
('CIIC 3015', '071L', 27, '1:30 pm - 3:20 pm | W', '(JHON JAIRO HERRERA PEREZ) Heidy Sierra Gil'),
('CIIC 3015', '090L', 27, '3:30 pm - 5:20 pm | W', '(PAULINA NUNEZ-MENDOZA) Heidy Sierra Gil'),
('CIIC 3015', '091L', 23, '3:30 pm - 5:20 pm | W', '(KEVIN NINO TEJADA) Heidy Sierra Gil'),
('CIIC 3015', '110L', 15, '5:30 pm - 7:20 pm | W', NULL),
('CIIC 3075', '050', 48, '11:30 am - 12:20 pm | LWV', 'Kejie Lu'),
('CIIC 3075', '080', 36, '2:30 pm - 3:20 pm | LWV', 'Keije Lu'),
('CIIC 3081', '120', 42, '6:00 pm - 7:15 pm | LW', 'JUAN PATARROYO MONTENEGRO'),
('CIIC 4010', '120', 104, '6:00 pm - 7:15 pm | LW', 'Bienvenido Velez Rivera'),
('CIIC 4010', '120E', 27, '6:00 pm - 7:15 pm | LW', 'Bienvenido Velez Rivera'),
('CIIC 4010', '030L', 24, '9:30 am - 11:20 am | V', '(ALANIS NEGRONI SANTIAGO) Bienvenido Velez Rivera'),
('CIIC 4010', '031L', 24, '9:30 am - 11:20 am | V', '(JESUS LOPEZ SEGRERA) Bienvenido Velez Rivera'),
('CIIC 4010', '050L', 21, '11:30 am - 1:20 pm | V', '(Jann Garcia Pagan) Bienvenido Velez Rivera'),
('CIIC 4010', '051L', 16, '11:30 am - 1:20 pm | V', '(Jose Ortiz Baez) Bienvenido Velez Rivera'),
('CIIC 4010', '070L', 23, '1:30 pm - 3:20 pm | V', '(Jose Cordero Velez) Bienvenido Velez Rivera'),
('CIIC 4010', 'CIIC4010', 23, '1:30 pm - 3:20 pm | V', '(ROBDIEL A MELENDEZ ROSADO) Bienvenido Velez Rivera');
