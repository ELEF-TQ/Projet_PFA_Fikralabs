
interface Coupon {
    reduction: number;
    code: string;
    nbrDisponible: number;
    dateExpidition: string;
    score:number;
}
const fakeCoupons: Coupon[] = [
    {
        reduction: 10,
        code: "SAVE10",
        nbrDisponible: 100,
        dateExpidition: "2024-04-15",
        score: 10,
    },
    {
        reduction: 20,
        code: "HALFOFF",
        nbrDisponible: 50,
        dateExpidition: "2022-04-15",
        score:100,
    },
    {
        reduction: 15,
        code: "SPRINGSALE",
        nbrDisponible: 75,
        dateExpidition: "2024-01-15",
        score:100,
    },
    {
        reduction: 30,
        code: "BIGSALE30",
        nbrDisponible: 200,
        dateExpidition: "2023-04-15",
        score:500,
    },
    {
        reduction: 90,
        code: "MAY25",
        nbrDisponible: 80,
        dateExpidition: "20-May-2024",
        score:25,
    },
    // Add more fake coupons as needed
];

export default fakeCoupons;
