import moment from 'moment'

import { connect } from "../database";


export const getAll = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.execute("SELECT * FROM vehiculos");
    return res.status(201).json(results);
};

export const save = async (req, res) => {
    try {
        const placa = req.body.placa
        const connection = await connect();
        const [results] = await connection.execute(
            "INSERT INTO vehiculos (placa) SELECT ? FROM DUAL WHERE 30 > (SELECT COUNT(placa) FROM vehiculos WHERE status = true);",
            [placa]
        );
        console.log(results);
        return res.status(201).json(results);
    } catch (error) {
        console.error(error);
    }
};

export const exit = async (req, res) => {
    try {
        const placa = req.params.placa;
        const connection = await connect();
        const [results] = await connection.execute(
            "UPDATE vehiculos SET valor = (TIMESTAMPDIFF(MINUTE, createdAt, updatedAt) * 100) WHERE placa = ?;",
            [placa]
        );
        console.log(results);
        return res.status(201).json(results);   
    } catch (error) {
        console.error(error);
    }
};

export const state = async (req, res) => {
    try {
        const placa = req.params.placa;
        const connection = await connect();
        const [results] = await connection.execute(
            "UPDATE vehiculos SET status = false, updatedAt = NOW() WHERE placa = ?;",
            [placa]
        );
        console.log(results);
        return res.status(201).json(results);   
    } catch (error) {
        console.error(error);
    }
};

export const getByTarifaAndPlaca = async (req, res) => {
    try {
        const placa = req.params.placa;
        const connection = await connect();
        const [results] = await connection.execute(
            "SELECT placa,valor,updatedAt FROM vehiculos WHERE placa = ? LIMIT 1;",
            [placa]
        );
        console.log(results);
        return res.status(201).json(results);   
    } catch (error) {
        console.error(error);
    }
};


export const getAllByTarifaAndPlaca = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.execute(
            "SELECT placa,valor,updatedAt FROM vehiculos WHERE status = false;"
        );
        console.log(results);
        return res.status(201).json(results);   
    } catch (error) {
        console.error(error);
    }
};


