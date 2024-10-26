import Role from '../models/rolesModel';

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
        // -_- Crear roles por defecto con promise.all para esperar a que se resuelvan todas las promesas y ahorar recursos -_- //
        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'seller' }).save(),
            new Role({ name: 'admin' }).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
}