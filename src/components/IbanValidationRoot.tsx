import TextField from '@mui/material/TextField';
import {useValidateIban} from "../hooks/useValidateIban";
import {useState, useRef, useEffect} from "react";
import IbanCard from "./IbanCard";
import {GeneralIssuesList} from "./GeneralIssuesList";
import {useTranslation} from "react-i18next";
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {useFormatIbanGroups} from '../hooks/useFormatIbanGroups';
import {IbanLengthText} from "./IbanLengthText";

export const IbanValidationRoot = () => {
    const { t } = useTranslation();
    const [iban, setIban] = useState('');
    const [validateParams, setValidateParams] = useState<{ iban: string } | undefined>(undefined);
    const { data, error } = useValidateIban(validateParams);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const formatIbanGroups = useFormatIbanGroups();
    const inputRef = useRef<HTMLInputElement>(null);
    const caretPosRef = useRef<number | null>(null);

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

    useEffect(() => {
        if (inputRef.current && caretPosRef.current !== null) {
            inputRef.current.setSelectionRange(caretPosRef.current, caretPosRef.current);
            caretPosRef.current = null;
        }
    });

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

    const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const newFormatted = input.value;
        const caret = input.selectionStart ?? newFormatted.length;
        const leftSpaces = newFormatted.slice(0, caret).split('').filter(c => c === ' ').length;
        const rawCaret = caret - leftSpaces;
        const rawValue = newFormatted.replaceAll(' ', '');
        setIban(rawValue);
        const formatted = formatIbanGroups(rawValue);
        let newCaret = rawCaret;
        let count = 0;
        for (let i = 0; i < formatted.length && count < rawCaret; i++) {
            if (formatted[i] !== ' ') count++;
            newCaret = i + 1;
        }
        caretPosRef.current = newCaret;
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TextField
                    id="outlined-basic"
                    label={t('iban.enterIban')}
                    variant="outlined"
                    value={formatIbanGroups(iban)}
                    onChange={handleIbanChange}
                    sx={{ marginBottom: 2, width: '21em' }}
                    helperText={<IbanLengthText ibanLength={iban.length} desiredIbanLength={data?.iban?.country?.ibanLength} />}
                    color={ibanTextFieldColor()}
                    inputRef={inputRef}
                />
                {ibanIsValid() && <CheckIcon sx={{ color: 'green', ml: -4, my: 2 }} />}
            </Box>

            {data?.generalIssues && <GeneralIssuesList issues={data.generalIssues} />}
            {error && <Typography style={{ color: 'red' }}>{t('technicalIssue')}</Typography>}
            {data?.iban && <IbanCard iban={data?.iban} />}
        </>
    );
}
