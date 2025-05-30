import { Schema, model } from 'mongoose';
import { IManager } from '../../../common/interfaces/manager.interface';
import { BaseUser } from '../../user/model/user.model';

const managerSchema = new Schema<IManager>({

    role: { type: String, enum: ['admin', 'sales', 'service'], default: 'sales' },
}, { timestamps: true });


export const Manager = BaseUser.discriminator<IManager>("Manager", managerSchema)
