import {Customer} from "../customer";

export class CreateItemDto {
  title: string;
  description: string;
  price: number;
  seller: Customer;
}
