import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    mark: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    model: {
        type: String, 
        minlength: 2,
        maxlength: 30,
        required: true 
    },
    year: {
        type: Number, 
        required: true, 
        min: 1900, 
        max: new Date().getFullYear(),
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} must be an integer'
        }
    }, 
    price: { 
        type: Number, 
        min: 0,
        required: true, 
    },
    aviable: { 
        type: Boolean, 
        required: true, 
        default: true 
    }
});

export default mongoose.model('Car', carSchema);