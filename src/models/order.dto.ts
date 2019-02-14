import { CartItem } from './cart.item';
import { ItemDTO } from "./item.dto";
import { AccountDTO } from "./acount.dto";

interface OrderDTO {

    id: string
	orderItens: CartItem[]
	payments: PaymentDTO[]

	account: AccountDTO
	orderValue: number

}

interface PaymentDTO {

	id: string
	paymentType: string
	authorizationCode?: string
	quota: number
	value: number
}

export {OrderDTO, PaymentDTO}