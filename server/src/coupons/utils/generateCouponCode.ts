export const generateCouponCode = (length: number = 8): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let couponCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        couponCode += characters.charAt(randomIndex);
    }
    return couponCode;
};
