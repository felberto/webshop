import {Customer} from "../customer";

export class CreateItemDto {
  title: string;
  description: string;
  image: string;
  price: number;
  seller: Customer;
}
