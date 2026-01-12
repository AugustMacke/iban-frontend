import type {Country} from "./country";
import type {Bank} from "./bank";

export interface Iban {
    id: string;
    accountType: string;
    checksum: number;
    accountNumber: string;
    controlCharacters: string;
    regionalCode: string;
    others: string;
    country: Country;
    bank: Bank;
}
