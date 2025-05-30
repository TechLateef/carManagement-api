import { Types } from 'mongoose';

export interface ICar {
  brand: string;
  model: string;
  year: number;
  price: number;
  available?: boolean;
  category: Types.ObjectId;
  owner?: Types.ObjectId;
  _doc: ICar
}
