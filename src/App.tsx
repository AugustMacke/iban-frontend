import './App.css'
import {IbanValidationRoot} from "./components/IbanValidationRoot.tsx";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function App() {
    const { t } = useTranslation();

  return (
    <>
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
            {t('title')}
        </Typography>
        <IbanValidationRoot />
    </>
  )
}

export default App
