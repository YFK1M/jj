import { INewCartProduct } from '../interfaces/INewCartProduct';

export class AddProductToCustomerCartDto {
  readonly user_id: string;
  readonly cartProduct: INewCartProduct;
}
