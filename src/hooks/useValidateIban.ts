import {
    useQuery,
    type UseQueryOptions
} from '@tanstack/react-query';
import type {IbanValidationResult} from "../types/ibanValidationResult";
import {ibanService} from "../services/ibanService";
import type {ValidateIbanParams} from "../types/validateIbanParams";

export const ibanKeys = {
    validate: (iban?: string) => ['validateIban', iban] as const,
};

export const useValidateIban = (
    params?: ValidateIbanParams,
    options?: UseQueryOptions<IbanValidationResult>
) => {
    return useQuery({
        queryKey: ibanKeys.validate(params?.iban) || {},
        queryFn: () => ibanService.validate(params),
        enabled: !!params && (params.iban?.trim().length ?? 0) >= 2,
        ...options,
    });
};
