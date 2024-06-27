import { User } from "./user";

export class Car {

    carId?: string;
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    miles?: string;
    city?: string;
    state?: string;
    price?: number;
    imgUrl?: string;
    userId?: number;


    constructor(carId?: string, make?: string, model?: string, year?: string, color?: string, miles?: string, city?: string, state?: string, price?: number, imgUrl?: string, userId?: number) {
            this.make = make;
        this.carId = carId;
        this.model = model;
        this.year = year;
        this.color = color;
        this.city = city;
        this.state = state;
        this.price = price;
        this.imgUrl = imgUrl;
        this.userId = userId;
        this.miles = miles;


    }
}
