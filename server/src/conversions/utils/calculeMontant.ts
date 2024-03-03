export const calculeMontant = (score: number) : number => {
    const points = 25;
    const monnaie = 1;
    return (score*monnaie)/points;
}