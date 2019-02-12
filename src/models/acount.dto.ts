import { StateDTO } from './state.dto';
import { CityDTO } from './city.dto';
interface AccountDTO {

    name: string,
	email: string,
	imageUrl?: string
    
    addresses: AddressDTO [],
}

interface AddressDTO {
    addressName: string
	addressNumber: string
	neighborhood: string
	postalCode: string
	city: CityDTO
	state: StateDTO
	complement: string
}

export {AccountDTO, AddressDTO}