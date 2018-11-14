
import { ProductLocation } from "../location/location";

export interface Product{
    key?: string;
    Title: string;
    Description: string;
    Price: number;
    Quantity: number;
    Image: string;
    location: ProductLocation;
    VendorID: string;
    Category: string;
}