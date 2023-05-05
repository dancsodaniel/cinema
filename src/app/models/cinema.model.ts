import { Seat } from "./seat.model";

export interface Cinema {
    id: number;
    address: string;
    name: string;
    imageUrl: string;
    displayOrder: number;
    seats: Seat[];
}