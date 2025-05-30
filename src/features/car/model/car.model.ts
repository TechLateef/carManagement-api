import { Schema, model } from 'mongoose';
import { ICar } from '../../../common/interfaces/car.interface';

const carSchema = new Schema<ICar>({
    brand: { type: String, required: [true, 'brand field is required'], index: true },
    model: { type: String, required: [true, 'Car model is required'], index: true },
    year: { type: Number, required: [true, 'Car year is required'] },
    price: { type: Number, required: [true, 'Car price is required'], index: true },
    available: { type: Boolean, default: true, index: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Customer', required: false }
}, { timestamps: true });

export const Car = model<ICar>('Car', carSchema);
