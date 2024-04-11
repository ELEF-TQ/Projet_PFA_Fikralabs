export const generateReservationServiceCode = (length: number = 10): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let reservationServiceCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        reservationServiceCode += characters.charAt(randomIndex);
    }
    return reservationServiceCode;
};
