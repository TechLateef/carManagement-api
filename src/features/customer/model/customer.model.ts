import { Schema, model } from 'mongoose';
import { ICustomer } from '../../../common/interfaces/customer.interface';
import { BaseUser } from '../../user/model/user.model';

const customerSchema = new Schema<ICustomer>({
  
  address: { type: String },
}, { timestamps: true });

export const Customer = BaseUser.discriminator<ICustomer>('Customer', customerSchema);
