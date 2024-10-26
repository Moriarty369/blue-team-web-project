import { Schema, model } from 'mongoose';

export const ROLES = ["user", "seller", "admin"];

const roleSchema = new Schema({
    name: String, 
}, {
        versionKey: false,
    }
);

export default model('Roles', roleSchema);
