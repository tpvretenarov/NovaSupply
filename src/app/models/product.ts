export interface Product {
    id?:string;
    Name?:string;
    Price?:number;
    Details?:string;
    Fabric?:string;
    Information?:string;
    Sizes?:string;
    Category?: string;
    URL?:string;
}

export interface Category {
    Headwear?:string;
    Shirts?:string;
    Pants?:string;
    Male?:string;
    Female?:string;
}

export class Order{
    constructor(public field: string = "Name", public order: string = "asc") {

    }
}