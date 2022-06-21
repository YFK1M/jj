import {INewCartTicket} from "../interfaces/INewCartTicket";

export class AddTicketToCustomerCartDto {
  readonly user_id: string;
  readonly cartTicket: INewCartTicket;
}
