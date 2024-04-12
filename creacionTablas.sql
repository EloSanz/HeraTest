-- Crear tabla Educational_Level
CREATE TABLE Educational_Level (
    id SERIAL PRIMARY KEY,
    level_name VARCHAR(100) NOT NULL
);

-- Crear tabla Multimedial
CREATE TABLE Multimedial (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    birthdate DATE,
    educational_level_id INTEGER REFERENCES Educational_Level(id),
    graduation_institution VARCHAR(255),
    profile_photo TEXT
);
-- Crear tabla Tipo de competencias
CREATE TABLE Tipo_competencia (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);
-- Crear tabla Competencias
CREATE TABLE Competencias (
    id SERIAL PRIMARY KEY,
    multimedial_id INTEGER REFERENCES Multimedial(id),
    tipo_competencia INTEGER REFERENCES Tipo_competencia(id),
    nombre_competencia VARCHAR(100) NOT NULL,
    nivel_destreza INTEGER CHECK (nivel_destreza >= 10 AND nivel_destreza <= 50)
);


---------- Inserts de prueba ----------------------------------

-- Inserts para Educational_Level
INSERT INTO Educational_Level (level_name) VALUES 
    ('UNIVERSITARIO_COMP'),
    ('UNIVERSITARIO_INCOMP'),
    ('TERCIARIO_COMP'),
    ('TERCIARIO_INCOMP');

-- Inserts para Multimedial
INSERT INTO Multimedial (username, password, email, address, birthdate, educational_level_id, graduation_institution, profile_photo) VALUES
    ('usuario1', 'contraseña1', 'usuario1@example.com', 'Dirección 1', '1990-01-01', 1, 'Universidad A', 'url_foto1'),
    ('usuario2', 'contraseña2', 'usuario2@example.com', 'Dirección 2', '1995-05-15', 2, 'Universidad B', 'url_foto2'),
    ('usuario3', 'contraseña3', 'usuario3@example.com', 'Dirección 3', '2000-10-30', 3, 'Universidad C', 'url_foto3');

--ALTER SEQUENCE multimedial_id_seq RESTART WITH 1;



INSERT INTO Tipo_competencia (nombre) VALUES
    ('EDICION_VIDEO'),
    ('EDICION_IMAGEN'),
    ('EDICION_TEXTO'),
    ('EDICION_PPT');
-- Inserts para Competencias
INSERT INTO Competencias (multimedial_id, tipo_competencia, nombre_competencia, nivel_destreza) VALUES
    (1, 1, 'Adobe Premiere', 40),
    (1, 1, 'Final Cut Pro', 45),
    (2, 1, 'DaVinci Resolve', 50),
    (2, 2, 'Adobe Photoshop', 45),
    (3, 2, 'GIMP', 35),
    (3, 2, 'CorelDRAW', 40);

------------------------
---------------------------------- Vista para mostrar las competencias de cada multimedial junto con su nivel de destreza: ----------------------------------
CREATE VIEW Multimedial_Competencias AS
SELECT m.id AS multimedial_id, m.username, e.level_name AS educational_level,
       c.tipo_competencia, c.nombre_competencia, c.nivel_destreza
FROM Multimedial m
JOIN Educational_Level e ON m.educational_level_id = e.id
JOIN Competencias c ON m.id = c.multimedial_id;
---------------------------------- Vista para mostrar la cantidad de multimedials por nivel educativo: ----------------------------------
CREATE VIEW Multimedial_Por_Nivel_Educativo AS
SELECT e.level_name AS educational_level, COUNT(m.id) AS cantidad_multimedials
FROM Multimedial m
JOIN Educational_Level e ON m.educational_level_id = e.id
GROUP BY e.level_name;
---------------------------------- Vista para mostrar el promedio de destreza por tipo de competencia: ----------------------------------
CREATE VIEW Promedio_Destreza_Por_Competencia AS
SELECT tipo_competencia, AVG(nivel_destreza) AS promedio_destreza
FROM Competencias
GROUP BY tipo_competencia;
-- Llamados 
SELECT * FROM Multimedial_Competencias;
SELECT * FROM Multimedial_Por_Nivel_Educativo;
SELECT * FROM Promedio_Destreza_Por_Competencia;
---------------------------------- ObtenerMaxPromedioPorTipoCompetencia: ----------------------------------
CREATE OR REPLACE PROCEDURE ObtenerMaxPromedioPorTipoCompetencia(IN p_tipo_competencia VARCHAR, OUT max_multimedial_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT multimedial_id
    INTO max_multimedial_id
    FROM (
        SELECT multimedial_id, AVG(nivel_destreza) AS promedio_destreza
        FROM Competencias
        WHERE tipo_competencia = p_tipo_competencia
        GROUP BY multimedial_id
        ORDER BY promedio_destreza DESC
        LIMIT 1
    ) AS subquery;
END;
$$;
DO $$
DECLARE
    max_multimedial_id INTEGER;
BEGIN
    CALL ObtenerMaxPromedioPorTipoCompetencia('EDICION_VIDEO', max_multimedial_id);
    RAISE NOTICE 'El ID del multimedial con el mayor promedio de destreza para EDICION_VIDEO es %', max_multimedial_id;
END $$;
SELECT * FROM Multimedial_Competencias;
