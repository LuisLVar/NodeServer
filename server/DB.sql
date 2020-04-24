ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

CREATE DATABASE VOLUNTARIADO;

USE VOLUNTARIADO;


CREATE TABLE ESCUELA(
    idescuela      INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(80) NOT NULL,
    direccion   VARCHAR(100) NULL,
    telefono    VARCHAR(8) NULL
);

CREATE TABLE TIPO_PERSONAL(
    idtipo_personal     INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre              VARCHAR(50) NOT NULL
);

CREATE TABLE PERSONAL(
    idpersonal              INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre                  VARCHAR(80) NOT NULL,
    apellido                VARCHAR(80) NOT NULL,
    direccion               VARCHAR(100) NULL,
    telefono                VARCHAR(8) NULL,
    id_personal             INTEGER NULL,
    estado                  CHAR(1) NOT NULL,
    ESCUELA_escuela         INTEGER NOT NULL,
    TIPO_PERSONAL_tipo      INTEGER NOT NULL,
    CONSTRAINT personal_escuela_fk FOREIGN KEY ( ESCUELA_escuela )
        REFERENCES ESCUELA ( idescuela ),
    CONSTRAINT personal_tipo_personal_fk FOREIGN KEY ( TIPO_PERSONAL_tipo )
        REFERENCES TIPO_PERSONAL ( idtipo_personal )
);

CREATE TABLE GRADO(
    idgrado     INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(50) NOT NULL
);

CREATE TABLE SECCION(
    idseccion              	INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre                  VARCHAR(50) NOT NULL,
    anio                	INTEGER NOT NULL,
    estado               	CHAR(1) NOT NULL,
    GRADO_grado             INTEGER NOT NULL,
    PERSONAL_personal       INTEGER NOT NULL,
    CONSTRAINT seccion_grado_fk FOREIGN KEY ( GRADO_grado )
        REFERENCES GRADO ( idgrado ),
    CONSTRAINT seccion_personal_fk FOREIGN KEY ( PERSONAL_personal )
        REFERENCES PERSONAL ( idpersonal )
);

CREATE TABLE ALUMNO(
	idalumno 			INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre      		VARCHAR(80) NOT NULL,
    apellido			VARCHAR(80) NOT NULL,
    direccion   		VARCHAR(100) NULL,
    telefono    		VARCHAR(8) NULL,
    id_alumno 			INTEGER NULL,
    encargado 			VARCHAR(80) NULL,
    fecha_nacimiento 	DATE NULL,
    estado 				CHAR(1) NULL 
);

CREATE TABLE INSCRIPCION(
	fecha 				DATE NOT NULL,
    SECCION_seccion		INTEGER NOT NULL,
    ALUMNO_alumno		INTEGER NOT NULL,
	CONSTRAINT inscripcion_pk PRIMARY KEY (SECCION_seccion, ALUMNO_alumno),
    CONSTRAINT inscripcion_seccion_fk FOREIGN KEY ( SECCION_seccion )
        REFERENCES SECCION ( idseccion ),
    CONSTRAINT inscripcion_alumno_fk FOREIGN KEY ( ALUMNO_alumno )
        REFERENCES ALUMNO ( idalumno )
);

CREATE TABLE BLOQUE(
	idbloque 	INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre		VARCHAR(50) NOT NULL
);

CREATE TABLE INSCRIPCION_BLOQUE(
	INSCRIPCION_seccion 	INTEGER NOT NULL,
    INSCRIPCION_alumno		INTEGER NOT NULL,
    BLOQUE_bloque			INTEGER NOT NULL,
	CONSTRAINT inscripcion_bloque_pk PRIMARY KEY (INSCRIPCION_seccion, INSCRIPCION_alumno, BLOQUE_bloque),
    CONSTRAINT inscripcion_seccion_fk1 FOREIGN KEY ( INSCRIPCION_seccion )
        REFERENCES INSCRIPCION ( SECCION_seccion ),
    CONSTRAINT inscripcion_alumno_fk1 FOREIGN KEY ( INSCRIPCION_alumno )
        REFERENCES INSCRIPCION ( ALUMNO_alumno ),
	CONSTRAINT inscripcion_bloque_fk FOREIGN KEY ( BLOQUE_bloque )
        REFERENCES BLOQUE ( idbloque )
);

CREATE TABLE MATERIA(
	idmateria 	INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre		VARCHAR(70) NOT NULL,
    contenido 	VARCHAR(70) NULL
);

CREATE TABLE COLOR(
	idcolor 		INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre			VARCHAR(70) NOT NULL,
    significado 	VARCHAR(70) NULL
);

CREATE TABLE ASIGNACION(
    zona              			FLOAT NOT NULL,
    proyecto                  	FLOAT NULL,
    nota_final                	FLOAT NULL,
    INSCRIPCION_BLOQUE_seccion  INTEGER NOT NULL,
    INSCRIPCION_BLOQUE_alumno	INTEGER NOT NULL,
    INSCRIPCION_BLOQUE_bloque	INTEGER NOT NULL,
    MATERIA_materia				INTEGER NOT NULL,
    COLOR_color					INTEGER NOT NULL,
    CONSTRAINT asignacion_pk PRIMARY KEY (INSCRIPCION_BLOQUE_seccion, INSCRIPCION_BLOQUE_alumno, INSCRIPCION_BLOQUE_bloque),
    CONSTRAINT asignacion_inscripcion_bloque_fk1 FOREIGN KEY ( INSCRIPCION_BLOQUE_seccion )
        REFERENCES INSCRIPCION_BLOQUE ( INSCRIPCION_seccion ),
    CONSTRAINT asignacion_inscripcion_bloque_fk2 FOREIGN KEY ( INSCRIPCION_BLOQUE_alumno )
        REFERENCES INSCRIPCION_BLOQUE ( INSCRIPCION_alumno ),
	CONSTRAINT asignacion_inscripcion_bloque_fk3 FOREIGN KEY ( INSCRIPCION_BLOQUE_bloque )
        REFERENCES INSCRIPCION_BLOQUE ( BLOQUE_bloque ),
	CONSTRAINT asignacion_materia_fk FOREIGN KEY ( MATERIA_materia )
        REFERENCES MATERIA ( idmateria ),
	CONSTRAINT asignacion_color_fk FOREIGN KEY ( COLOR_color )
        REFERENCES COLOR ( idcolor )
);

CREATE TABLE ASPECTO(
	idaspecto 	INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre		VARCHAR(80) NOT NULL
);

CREATE TABLE ASPECTO_BLOQUE(
    INSCRIPCION_BLOQUE_seccion  INTEGER NOT NULL,
    INSCRIPCION_BLOQUE_alumno	INTEGER NOT NULL,
    INSCRIPCION_BLOQUE_bloque	INTEGER NOT NULL,
    ASPECTO_aspecto				INTEGER NOT NULL,
    COLOR_color					INTEGER NOT NULL,
    CONSTRAINT aspecto_bloque_pk PRIMARY KEY (INSCRIPCION_BLOQUE_seccion, INSCRIPCION_BLOQUE_alumno, INSCRIPCION_BLOQUE_bloque),
    CONSTRAINT aspecto_bloque_inscripcion_bloque_fk1 FOREIGN KEY ( INSCRIPCION_BLOQUE_seccion )
        REFERENCES INSCRIPCION_BLOQUE ( INSCRIPCION_seccion ),
    CONSTRAINT aspecto_bloque_inscripcion_bloque_fk2 FOREIGN KEY ( INSCRIPCION_BLOQUE_alumno )
        REFERENCES INSCRIPCION_BLOQUE ( INSCRIPCION_alumno ),
	CONSTRAINT aspecto_bloque_inscripcion_bloque_fk3 FOREIGN KEY ( INSCRIPCION_BLOQUE_bloque )
        REFERENCES INSCRIPCION_BLOQUE ( BLOQUE_bloque ),
	CONSTRAINT aspecto_bloque_aspecto_fk FOREIGN KEY ( ASPECTO_aspecto )
        REFERENCES ASPECTO ( idaspecto ),
	CONSTRAINT aspecto_bloque_color_fk FOREIGN KEY ( COLOR_color )
        REFERENCES COLOR ( idcolor )
);

INSERT INTO ESCUELA (nombre,direccion,telefono) VALUES ('Colegio San José de los Infantes','Colonia el Rosario','65874521');
INSERT INTO ESCUELA (nombre,direccion,telefono) VALUES ('USAC','ZONA 12','75134520');
INSERT INTO ESCUELA (nombre,direccion,telefono) VALUES ('UVG','ZONA 17','56421895');
INSERT INTO ESCUELA (nombre,direccion,telefono) VALUES ('URL','ZONA 16','35206985');

SELECT * FROM ESCUELA;