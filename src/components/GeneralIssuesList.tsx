import { useTranslation } from "react-i18next";
import type { IbanValidationGeneralIssue } from "../types/IbanValidationGeneralIssue";
import { Typography } from '@mui/material';

interface GeneralIssuesListProps {
  issues: IbanValidationGeneralIssue[];
}

export const GeneralIssuesList = ({ issues }: GeneralIssuesListProps) => {
  const { t } = useTranslation();

  if (!issues || issues.length === 0) {
    return null;
  }

  return (
      <>
        <Typography color="error" fontSize={16} fontWeight="bold">
          {t('iban.generalIssuesTitle')}
        </Typography>
        <ul>
          {issues.map((issue, idx) => (
            <li key={issue + idx}>
              <Typography color="error">
                {t(`generalIssues.${issue}`)}
              </Typography>
            </li>
          ))}
        </ul>
      </>
  );
};
