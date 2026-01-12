// Mock für env.ts muss ganz am Anfang stehen!
jest.mock('../lib/env', () => ({
  env: {
    API_URL: 'http://localhost',
    apiBaseUrl: 'http://localhost',
    apiVersion: 'v1',
    // weitere gemockte Exporte nach Bedarf
  }
}));

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { IbanValidationRoot } from './IbanValidationRoot';
import { useValidateIban } from '../hooks/useValidateIban';

jest.mock('../hooks/useValidateIban');
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
jest.spyOn(globalThis, 'setTimeout');

const mockUseValidateIban = useValidateIban as jest.Mock;

describe('IbanValidationRoot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('zeigt das Eingabefeld für die IBAN an', () => {
    mockUseValidateIban.mockReturnValue({ data: undefined, error: undefined });
    render(<IbanValidationRoot />);
    expect(screen.getByLabelText('iban.enterIban')).toBeInTheDocument();
  });

  it('zeigt einen Fehler, wenn generalIssues vorhanden sind', async () => {
    mockUseValidateIban.mockReturnValue({
      data: { generalIssues: ['Fehler'], issues: [], iban: undefined },
      error: undefined
    });
    render(<IbanValidationRoot />);
    // Suche nach dem tatsächlichen Text im DOM
    expect(screen.getByText('generalIssues.Fehler')).toBeInTheDocument();
  });

  it('zeigt das grüne Check-Icon, wenn die IBAN gültig ist', async () => {
    mockUseValidateIban.mockReturnValue({
      data: { generalIssues: [], issues: [], iban: { country: { ibanLength: 22 } } },
      error: undefined
    });
    render(<IbanValidationRoot />);
    const checkIcon = await screen.findByTestId('CheckIcon');
    expect(checkIcon).toBeInTheDocument();
  });

  it('zeigt einen technischen Fehler an, wenn error gesetzt ist', () => {
    mockUseValidateIban.mockReturnValue({ data: undefined, error: true });
    render(<IbanValidationRoot />);
    expect(screen.getByText('technicalIssue')).toBeInTheDocument();
  });

  it('zeigt die IbanCard, wenn data.iban vorhanden ist', () => {
    mockUseValidateIban.mockReturnValue({
      data: { generalIssues: [], issues: [], iban: { country: { ibanLength: 22 }, iban: 'DE12345678901234567890' } },
      error: undefined
    });
    render(<IbanValidationRoot />);
    // Suche nach dem Card-Titel, da die IBAN nicht direkt als Text gerendert wird
    expect(screen.getByText('iban.detailsTitle')).toBeInTheDocument();
  });

  it('ändert den Wert des Eingabefelds bei Eingabe', () => {
    mockUseValidateIban.mockReturnValue({ data: undefined, error: undefined });
    render(<IbanValidationRoot />);
    const input = screen.getByLabelText('iban.enterIban') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'DE12' } });
    expect(input.value).toBe('DE12');
  });
});
