import { api } from '../lib/axios';
import type {IbanValidationResult} from "../types/ibanValidationResult";
import type {ValidateIbanParams} from "../types/validateIbanParams";

export const ibanService = {
    validate: async (params?: ValidateIbanParams): Promise<IbanValidationResult> => {
        const response = await api.get('/iban/validate', { params });
        return response.data;
    }
};
