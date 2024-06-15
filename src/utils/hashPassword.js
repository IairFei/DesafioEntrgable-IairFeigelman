import bcrypt from 'bcrypt';

// Hashea la contraseña
export const createHash = (password) => {
    //Recibe la contraseña y le seteamos los caracteres totales del hasheo
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}


// Valida la contraseña
export const isValidPassword = (user, password) => {
    //Compara y valida si es la misma contraseña
    return bcrypt.compareSync(password, user.password)
}