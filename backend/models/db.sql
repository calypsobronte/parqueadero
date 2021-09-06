CREATE DATABASE parqueadero;
--
CREATE TABLE vehiculos (
	id serial PRIMARY KEY,
	placa varchar(10) COLLATE utf8_spanish_ci NOT NULL,
    valor decimal(10,2) NOT NULL DEFAULT 0.00,
	status boolean DEFAULT TRUE,
	createdAt timestamp DEFAULT now(),
	updatedAt timestamp
);


SET @placa = 'TMI090';
SET @consulta_placa = (SELECT COUNT(placa) FROM vehiculos WHERE status = true);
SET @consulta_tiempo = (SELECT TIMESTAMPDIFF(MINUTE, createdAt, updatedAt) result FROM vehiculos WHERE placa = @placa);
SET @valor_tiemoo = (SELECT (SELECT TIMESTAMPDIFF(MINUTE, createdAt, updatedAt) result FROM vehiculos WHERE placa = @placa) * 100);

-- Primero ingreso el vehiculo con la placa
INSERT INTO vehiculos (@placa) SELECT placa FROM DUAL WHERE 30 > consulta;

-- Para retirarlo debo de actualizarle el estado y la hora de salida
UPDATE vehiculos SET status = false, updatedAt = NOW() WHERE placa=@placa;

-- para cobrar la salida del vehiculo
UPDATE vehiculos SET valor = @valor_tiemoo WHERE placa = @placa;

-- tambien da la siguiente consulta para calcular el valor
UPDATE vehiculos SET valor = (TIMESTAMPDIFF(MINUTE, createdAt, updatedAt) * 100) WHERE placa = @placa;

-- buscar por placa
SELECT * FROM vehiculos WHERE placa = @placa;

-- buscar todos los vehiculos
SELECT * FROM vehiculos;

-- consulta de tiempo
SELECT (SELECT TIMESTAMPDIFF(MINUTE, createdAt, updatedAt) result FROM vehiculos WHERE placa = @placa) * 100 valor;