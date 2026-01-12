import { useCallback } from 'react';

export function useFormatIbanGroups() {
  return useCallback((iban: string) => {
    return iban.replaceAll(' ', '').replaceAll(/(.{4})/g, '$1 ').trim();
  }, []);
}
