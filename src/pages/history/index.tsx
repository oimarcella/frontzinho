import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { ContainerStyled, Overflow, SummaryStyled, TitleStyled, WrapperMark } from './styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useDispatch } from 'react-redux';
import {
    MedicalInformation,
    MedicalServicesOutlined,
    PetsOutlined,
    VaccinesOutlined
} from '@mui/icons-material';
import { styled } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import { showModal } from '../../redux/modalSlice';
import { Section } from '../../components/layout/components/styles/sections';
import { useLocation, useParams } from 'react-router-dom';

type MyStepIconPropsT = {
    extraParams: Record<string, any>;
} & StepIconProps;

const steps = [
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/04/2023"
    },
];

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: '#7fc9cd',
    '&:hover': {
        backgroundColor: '#66a8ac !important',
        scale: '1.1'
    },
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '50%',
    cursor: "pointer",
    transition: 'all .3s ease',

    ...(ownerState.active && {
        /*backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',*/
        background: "#fe51b3",
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',

        '&:hover': {
            backgroundColor: '#dd439a !important',
            scale: '1.1'
        }
    })/*,
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),*/
}));

function ColorlibStepIcon(props: MyStepIconPropsT) {
    const { active, completed, className, extraParams } = props;

    const icons: { [index: string]: React.ReactElement } = {
        CONSULTA: <PetsOutlined />,
        MEDICAMENTO: <VaccinesOutlined />,
        OUTRO: <MedicalServicesOutlined />,
        PROCEDIMENTO: <MedicalInformation />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(extraParams.step.type)]}
        </ColorlibStepIconRoot>
    );
}

export default function HistoryPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    console.log("🚀 ~ file: index.tsx:158 ~ HistoryPage ~ location:", location)
    console.log("🚀 ~ file: index.tsx:157 ~ HistoryPage ~ urlParams:", urlParams)

    const moreDetailsElement = <div>
        <div className='d-flex justify-content-between'>
            <Typography variant='body2' style={{ color: '#0b344e' }}>Consulta</Typography>
            <Typography variant='body2' style={{ color: '#0b344e' }}>10 mar. 2023</Typography>
        </div>

        <div className='mt-4'>
            <Typography variant="body2">Descrição</Typography>
            <p>
                Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior.
                Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo.
                Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.
            </p>
        </div>
    </div>;

    function handleMoreDetails() {
        dispatch(showModal({
            bodyNode: moreDetailsElement,
            hasHeader: false
        }));
    }

    return (
        urlParams.get("origin") == "iframe" ?
            <Stepper alternativeLabel activeStep={steps.length - 1}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            onClick={() => handleMoreDetails()}
                            StepIconComponent={(props) =>
                                <WrapperMark className='d-flex align-items-center justify-content-center flex-column'>
                                    <p>10 mar. 2023</p>
                                    <ColorlibStepIcon
                                        {...props}
                                        extraParams={{
                                            step
                                        }}
                                    />
                                </WrapperMark>
                            }
                            extraParams={{ type: 'valor1' }}
                        >
                            <div
                                style={{ border: 'none', padding: '10px 0' }}
                                className='d-flex flex-column justify-content-center align-items-center'
                            >
                                <TitleStyled>
                                    {step.title}
                                </TitleStyled>
                                <SummaryStyled>{step.summary}</SummaryStyled>
                            </div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            :
            <Section>
                <ContainerStyled className="d-flex align-items-center">
                    <Overflow>
                        <Box sx={{ width: '100%' }}>
                            <Stepper alternativeLabel activeStep={steps.length - 1}>
                                {steps.map((step, index) => (
                                    <Step key={index}>
                                        <StepLabel
                                            onClick={() => handleMoreDetails()}
                                            StepIconComponent={(props) =>
                                                <WrapperMark className='d-flex align-items-center justify-content-center flex-column'>
                                                    <p>10 mar. 2023</p>
                                                    <ColorlibStepIcon
                                                        {...props}
                                                        extraParams={{
                                                            step
                                                        }}
                                                    />
                                                </WrapperMark>
                                            }
                                            extraParams={{ type: 'valor1' }}
                                        >
                                            <div
                                                style={{ border: 'none', padding: '10px 0' }}
                                                className='d-flex flex-column justify-content-center align-items-center'
                                            >
                                                <TitleStyled>
                                                    {step.title}
                                                </TitleStyled>
                                                <SummaryStyled>{step.summary}</SummaryStyled>
                                            </div>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Overflow>

                </ContainerStyled >
            </Section>
    );
}