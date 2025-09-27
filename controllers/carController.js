import Car from '../models/carModel.js';
import mongoose from 'mongoose';

export const createCar = async (req, res) => {
    try {
        const { mark, model, year, price, aviable } = req.body;
        const addedCar = new Car({ mark, model, year, price, aviable });
        const savedCar = await addedCar.save();

        res.status(201).json({ message: 'Car succsessfully added', car: savedCar });
    } catch (error) {
        if (error.name === "MongoServerError" || error.name === "CastError" || error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        
        console.error(error);
        res.status(500).json({ error: 'Internal server error' } );
    }
}

export const getAllCars = async (req, res) => {
    try {
        const allCars = await Car.find();
        if (allCars.length === 0) return res.status(404).json({ message: 'Cars not found' });

        res.status(200).json(allCars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getCarById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid type ID" });
        }

        const exists = await Car.findById(id);
        if (!exists) return res.status(404).json({ message: `ID: <${id}>  not found` });

        res.status(200).json(exists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid type ID" });
        }

        const newItem = req.body;
        const exists = await Car.findById(id);
        if (!exists) return res.status(404).json({ message: `ID: <${id}>  not found` });

        const updatedCar = await Car.findByIdAndUpdate(id, newItem, { new: true })
        
        res.status(201).json({ message: 'Car succsessfully updated', car: updatedCar });
    } catch (error) {
        if (error.name === "MongoServerError" || error.name === "CastError" || error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid type ID" });
        }

        const delletedCar = await Car.findByIdAndDelete(id);
        if (!delletedCar) return res.status(404).json({ message: `ID: <${id}> not found` });

        res.status(200).json({ message: 'Car deleted succsessfully' });
    } catch (error) {
        if (error.name === "MongoServerError" || error.name === "CastError" || error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }   
}