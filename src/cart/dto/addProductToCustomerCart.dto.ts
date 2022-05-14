import { INewCartProduct } from '../interfaces/INewCartProduct';

export class AddProductToCustomerCartDto {
  readonly id: string;
  readonly user_id: string;
  readonly cartProduct: INewCartProduct;
}
