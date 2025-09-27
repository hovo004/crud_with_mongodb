import express from 'express';
import { createCar, getAllCars, getCarById, updateCar, deleteCar } from '../controllers/carController.js';

const router = express.Router();

router.post('/create', createCar);
router.get('', getAllCars);
router.get('/:id', getCarById);
router.put('/update/:id', updateCar);
router.delete('/delete/:id', deleteCar);

export default router;