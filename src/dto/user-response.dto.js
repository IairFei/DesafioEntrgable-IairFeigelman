export const userResponseDto = (user) => {
    return {
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        cart: user.cart,
        last_connection: user.last_connection
    };
};

export const usersResponseDto = (user) => {
    return {
        firstName: user.firstName,
        email: user.email,
        role: user.role
    };
}