import type {Iban} from "./iban";
import type {IbanValidationIssue} from "./IbanValidationIssue";
import type {IbanValidationGeneralIssue} from "./IbanValidationGeneralIssue";

export interface IbanValidationResult {
    iban: Iban;
    issues: Array<IbanValidationIssue>;
    generalIssues: Array<IbanValidationGeneralIssue>;
}
