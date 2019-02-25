import {Customer} from "./customer";

export class Item {
  id: number;
  title: string;
  description: string;
  price: number;
  seller: Customer;
  buyer_id: number;
  sold: Date;
}
