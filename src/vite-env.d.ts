/// <reference types="vite/client" />
/// <reference types="redux-persist" />

import { StepLabelProps } from '@material-ui/core/StepLabel';

declare module '@mui/material/StepLabel' {
    interface StepLabelProps {
        extraParams?: Record<string, any>;
    }
}