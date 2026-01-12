import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

interface IbanLengthTextProps {
    ibanLength: number | undefined;
    desiredIbanLength: number | undefined;
}

export const IbanLengthText = ({ibanLength, desiredIbanLength}: IbanLengthTextProps) => {
    const { t } = useTranslation();

    const helperText = (() => {
        const desiredIbanLengthText = desiredIbanLength ? desiredIbanLength.toString() : t('iban.unknownLength');
        if (desiredIbanLength && desiredIbanLength > 0) {
            return `${t('iban.ibanLengthInfo')}: ${ibanLength}/${desiredIbanLengthText}`;
        } else {
            return <Typography>{`${t('iban.ibanLengthInfo')}: ${ibanLength}`}</Typography>;
        }
    });

    const color = (() => {
        if (desiredIbanLength && ibanLength && ibanLength > desiredIbanLength) {
            return 'error';
        }
        if (desiredIbanLength && ibanLength && ibanLength === desiredIbanLength) {
            return 'success';
        }
        return 'textPrimary';
    });

    return (
        <Typography sx={{ fontSize: 12 }} color={color()}>{helperText()}</Typography>
    );
}
