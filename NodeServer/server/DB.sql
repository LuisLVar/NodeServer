ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'beta1234';

CREATE DATABASE IF NOT EXISTS VOLUNTARIADO;
USE VOLUNTARIADO;

CREATE TABLE alumno (
    id_alumno         INTEGER NOT NULL AUTO_INCREMENT,
    nombre            VARCHAR(80) NOT NULL,
    apellido          VARCHAR(80) NOT NULL,
    direccion         VARCHAR(100),
    telefono          VARCHAR(12),
    cui			      INTEGER,
    encargado         VARCHAR(80),
    fecha_nacimiento  DATE,
    estado            INTEGER,
    PRIMARY KEY ( id_alumno )
);

CREATE TABLE asignacion (
    zona                                    FLOAT NOT NULL,
    proyecto                                FLOAT,
    nota_final                              FLOAT,
    promedio                                FLOAT,
    ibloque_iseccion  INTEGER NOT NULL,
    ibloque_ialumno   INTEGER NOT NULL,
    ib_bloquebloque        INTEGER NOT NULL,
    materia_materia                         INTEGER NOT NULL,
    color_color                             INTEGER NOT NULL
);

ALTER TABLE asignacion
    ADD CONSTRAINT asignacion_pk PRIMARY KEY ( ibloque_iseccion,
                                               ibloque_ialumno,
                                               ib_bloquebloque,
                                               materia_materia );

CREATE TABLE aspecto (
    aspecto  INTEGER NOT NULL AUTO_INCREMENT,
    nombre   VARCHAR(80) NOT NULL,
    PRIMARY KEY ( aspecto )
);

CREATE TABLE aspecto_bloque (
    ibloque_iseccion  INTEGER NOT NULL,
    ibloque_ialumno   INTEGER NOT NULL,
    ib_bloquebloque        INTEGER NOT NULL,
    aspecto_aspecto                         INTEGER NOT NULL,
    color_color                             INTEGER NOT NULL
);

ALTER TABLE aspecto_bloque
    ADD CONSTRAINT aspecto_bloque_pk PRIMARY KEY ( ibloque_iseccion,
                                                   ibloque_ialumno,
                                                   ib_bloquebloque,
                                                   aspecto_aspecto );

CREATE TABLE bloque (
    bloque  INTEGER NOT NULL AUTO_INCREMENT,
    nombre  VARCHAR(50) NOT NULL,
    PRIMARY KEY ( bloque )
);

CREATE TABLE ciclo (
    ciclo  INTEGER NOT NULL auto_increment,
    year   INTEGER,
	PRIMARY KEY ( ciclo )
);


CREATE TABLE color (
    color        INTEGER NOT NULL AUTO_INCREMENT,
    nombre       VARCHAR(70) NOT NULL,
    significado  VARCHAR(70),
    PRIMARY KEY ( color )
);

CREATE TABLE escuela (
    escuela    INTEGER NOT NULL,
    nombre     VARCHAR(80) NOT NULL,
    direccion  VARCHAR(100),
    telefono   VARCHAR(12)
);

ALTER TABLE escuela ADD CONSTRAINT escuela_pk PRIMARY KEY ( escuela );

CREATE TABLE grado (
    grado   INTEGER NOT NULL AUTO_INCREMENT,
    nombre  VARCHAR(50) NOT NULL,
    PRIMARY KEY ( grado )
);

CREATE TABLE inscripcion (
    fecha            DATE NOT NULL,
    seccion_seccion  INTEGER NOT NULL,
    alumno_alumno    INTEGER NOT NULL
);

ALTER TABLE inscripcion ADD CONSTRAINT inscripcion_pk PRIMARY KEY ( seccion_seccion,
                                                                    alumno_alumno );

CREATE TABLE inscripcion_bloque (
    inscripcion_seccion_seccion  INTEGER NOT NULL,
    inscripcion_alumno_alumno    INTEGER NOT NULL,
    bloque_bloque                INTEGER NOT NULL
);

ALTER TABLE inscripcion_bloque
    ADD CONSTRAINT inscripcion_bloque_pk PRIMARY KEY ( inscripcion_seccion_seccion,
                                                       inscripcion_alumno_alumno,
                                                       bloque_bloque );

CREATE TABLE materia (
    materia    INTEGER NOT NULL AUTO_INCREMENT,
    nombre     VARCHAR(70) NOT NULL,
    contenido  VARCHAR(70),
    PRIMARY KEY ( materia )
);

CREATE TABLE personal (
    id_personal         INTEGER NOT NULL AUTO_INCREMENT,
    nombre              VARCHAR(80) NOT NULL,
    apellido            VARCHAR(80) NOT NULL,
    direccion           VARCHAR(100),
    telefono            VARCHAR(12),
    estado              INTEGER NOT NULL,
    escuela_escuela     INTEGER NOT NULL,
    tipo_personal_tipo  INTEGER NOT NULL,
    usuario             VARCHAR(30) NOT NULL,
    password            VARCHAR(30) NOT NULL,
	PRIMARY KEY ( id_personal )
);


CREATE TABLE seccion (
    seccion            INTEGER NOT NULL AUTO_INCREMENT,
    nombre             VARCHAR(50) NOT NULL,
    estado             INTEGER NOT NULL,
    grado_grado        INTEGER NOT NULL,
    personal_personal  INTEGER NOT NULL,
    ciclo_ciclo        INTEGER NOT NULL,
    PRIMARY KEY ( seccion )
);

CREATE TABLE seccion_materia (
    materia_materia  INTEGER NOT NULL,
    seccion_seccion  INTEGER NOT NULL
);

ALTER TABLE seccion_materia ADD CONSTRAINT seccion_materia_pk PRIMARY KEY ( materia_materia,
                                                                            seccion_seccion );

CREATE TABLE tipo_personal (
    tipo    INTEGER NOT NULL,
    nombre  VARCHAR(50) NOT NULL
);

ALTER TABLE tipo_personal ADD CONSTRAINT tipo_personal_pk PRIMARY KEY ( tipo );

ALTER TABLE asignacion
    ADD CONSTRAINT a_colorfk FOREIGN KEY ( color_color )
        REFERENCES color ( color );

ALTER TABLE asignacion
    ADD CONSTRAINT asignacion_inscripcion_bloque_fk FOREIGN KEY ( ibloque_iseccion,
                                                                  ibloque_ialumno,
                                                                  ib_bloquebloque )
        REFERENCES inscripcion_bloque ( inscripcion_seccion_seccion,
                                        inscripcion_alumno_alumno,
                                        bloque_bloque );

ALTER TABLE asignacion
    ADD CONSTRAINT asignacion_materia_fk FOREIGN KEY ( materia_materia )
        REFERENCES materia ( materia );

ALTER TABLE aspecto_bloque
    ADD CONSTRAINT aspecto_bloque_aspecto_fk FOREIGN KEY ( aspecto_aspecto )
        REFERENCES aspecto ( aspecto );

ALTER TABLE aspecto_bloque
    ADD CONSTRAINT aspecto_bcolor_fk FOREIGN KEY ( color_color )
        REFERENCES color ( color );

ALTER TABLE aspecto_bloque
    ADD CONSTRAINT aspectob_ibloque_fk FOREIGN KEY ( ibloque_iseccion,
                                                                      ibloque_ialumno,
                                                                      ib_bloquebloque )
        REFERENCES inscripcion_bloque ( inscripcion_seccion_seccion,
                                        inscripcion_alumno_alumno,
                                        bloque_bloque );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_alumno_fk FOREIGN KEY ( alumno_alumno )
        REFERENCES alumno ( id_alumno );

ALTER TABLE inscripcion_bloque
    ADD CONSTRAINT insc_bloquebfk FOREIGN KEY ( bloque_bloque )
        REFERENCES bloque ( bloque );

ALTER TABLE inscripcion_bloque
    ADD CONSTRAINT inscripcion_bloque_inscripcion_fk FOREIGN KEY ( inscripcion_seccion_seccion,
                                                                   inscripcion_alumno_alumno )
        REFERENCES inscripcion ( seccion_seccion,
                                 alumno_alumno );

ALTER TABLE inscripcion
    ADD CONSTRAINT inscripcion_seccion_fk FOREIGN KEY ( seccion_seccion )
        REFERENCES seccion ( seccion );

ALTER TABLE personal
    ADD CONSTRAINT personal_escuela_fk FOREIGN KEY ( escuela_escuela )
        REFERENCES escuela ( escuela );

ALTER TABLE personal
    ADD CONSTRAINT personal_tipo_personal_fk FOREIGN KEY ( tipo_personal_tipo )
        REFERENCES tipo_personal ( tipo );

ALTER TABLE seccion
    ADD CONSTRAINT seccion_ciclo_fk FOREIGN KEY ( ciclo_ciclo )
        REFERENCES ciclo ( ciclo );

ALTER TABLE seccion
    ADD CONSTRAINT seccion_grado_fk FOREIGN KEY ( grado_grado )
        REFERENCES grado ( grado );

ALTER TABLE seccion_materia
    ADD CONSTRAINT seccion_materia_materia_fk FOREIGN KEY ( materia_materia )
        REFERENCES materia ( materia );

ALTER TABLE seccion_materia
    ADD CONSTRAINT seccion_materia_seccion_fk FOREIGN KEY ( seccion_seccion )
        REFERENCES seccion ( seccion );

ALTER TABLE seccion
    ADD CONSTRAINT seccion_personal_fk FOREIGN KEY ( personal_personal )
        REFERENCES personal ( id_personal );


INSERT INTO escuela VALUES (1,'Escuela Test','Direccion Test','65874521');
INSERT INTO tipo_personal VALUES (1,'Admin');
INSERT INTO tipo_personal VALUES (2,'Docente');
INSERT INTO ciclo VALUES (1,2020);
INSERT INTO personal VALUES (1,'Admin1','admin','Guatemala Guatemala', 1234,1,1,1,'admin','admin');