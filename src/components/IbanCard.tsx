import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type {Iban} from "../types/iban";
import {useTranslation} from "react-i18next";

interface IbanCardProps {
    iban: Iban;
}

const IbanCard: React.FC<IbanCardProps> = ({iban}) => {
    const {t} = useTranslation();

    return (
        <Card sx={{minWidth: 275, margin: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {t('iban.detailsTitle')}
                </Typography>
                <Typography color="text.secondary">
                    {t('country')}: {iban.country.name} ({iban.country.code})
                </Typography>
                <Typography color="text.secondary">
                    {t('iban.format')}: {iban.country.ibanFormat}
                </Typography>
                <Typography color="text.secondary">
                    {t('bank.bank')}: {iban?.bank?.name || t('bank.unknownBank')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default IbanCard;

