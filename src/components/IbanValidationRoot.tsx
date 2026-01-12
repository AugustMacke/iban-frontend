import TextField from '@mui/material/TextField';
import {useValidateIban} from "../hooks/useValidateIban";
import {useState, useRef, useEffect} from "react";
import IbanCard from "./IbanCard";
import {GeneralIssuesList} from "./GeneralIssuesList";
import {useTranslation} from "react-i18next";
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {IbanLengthText} from "./IbanLengthText";


export const IbanValidationRoot = () => {
    const { t } = useTranslation();
    const [iban, setIban] = useState('');
    const [validateParams, setValidateParams] = useState<{ iban: string } | undefined>(undefined);
    const { data, error } = useValidateIban(validateParams);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (iban.trim().length < 2) return;
        if (validateParams?.iban === iban) return;
        timerRef.current = setTimeout(() => {
            setValidateParams({ iban });
        }, 1000);
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [iban, validateParams?.iban]);

    const ibanIsValid = (() => {
        return Array.isArray(data?.generalIssues) &&
            Array.isArray(data?.issues) &&
            data.generalIssues.length === 0 &&
            data.issues.length === 0;
    });

    const ibanTextFieldColor = (() => {
        if (data?.generalIssues && data.generalIssues.length > 0) {
            return 'error';
        }
        if (ibanIsValid()) {
            return 'success';
        }
        return 'primary';
    });

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TextField
                    id="outlined-basic"
                    label={t('iban.enterIban')}
                    variant="outlined"
                    value={iban}
                    onChange={e => setIban(e.target.value)}
                    sx={{ marginBottom: 2, width: '21em' }}
                    helperText={<IbanLengthText ibanLength={iban.length} desiredIbanLength={data?.iban?.country?.ibanLength} />}
                    color={ibanTextFieldColor()}
                />
                {ibanIsValid() && <CheckIcon sx={{ color: 'green', ml: -4, my: 2 }} />}
            </Box>

            {data?.generalIssues && <GeneralIssuesList issues={data.generalIssues} />}
            {error && <Typography style={{ color: 'red' }}>{t('technicalIssue')}</Typography>}
            {data?.iban && <IbanCard iban={data?.iban} />}
        </>
    );
}
