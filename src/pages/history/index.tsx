import { useEffect, useRef, useState } from 'react';
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
import useWindowDimensions from '../../core/hooks/useWindowDimensions';

type MyStepIconPropsT = {
    extraParams: Record<string, any>;
} & StepIconProps;

const steps = [
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "12/04/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "12/04/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/04/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "12/04/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "12/04/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/04/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "07/06/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "08/06/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "09/06/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Consulta",
        summary: "Diagnóstico de Giárdia",
        type: "CONSULTA",
        date: "10/06/2023",
        description: "Zoey foi atendida e aparentava não estar muito mal, tutora relatou que havia aprensentado diarréia no dia anterior. Foi feito teste rápido na presença da tutora para Parvivirose, que teve resultado negativo. Foi indicada a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Internação 24h",
        type: "PROCEDIMENTO",
        date: "11/06/2023",
        description: "Zoey foi atendida e apa a internação da paciente por 24 horas para acompanhamento do quadro e medicação.",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
    {
        title: "Procedimento",
        summary: "Alta",
        type: "PROCEDIMENTO",
        date: "12/06/2023",
        description: "blabla",
        vet: "Luís Cardoso",
        clinic: "Pet&Amor"
    },
];

type StepT = {
    title: string;
    summary: string;
    date: string;
    type: string;
    description: string;
    clinic: string;
    vet: string;
}

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
    width: 40,
    height: 40,
    padding: '1.2rem',
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
    const [positionTop, setPositionTop] = useState();
    const [positionLeft, setPositionLeft] = useState();
    const ref = useRef<HTMLDivElement | null>(null);
    const { width } = useWindowDimensions();
    const [modalMoreDetails, setModalMoreDetails] = useState<StepT>({
        title: "",
        description: "",
        vet: "",
        clinic: "",
        date: "",
        summary: "",
        type: "",
    } as StepT);

    const moreDetailsElement = <div>
        <div className='d-flex justify-content-between mb-4'>
            <Typography variant='body2' style={{ color: '#0b344e' }}>{modalMoreDetails.title}</Typography>
            <Typography variant='body2' style={{ color: '#0b344e' }}>{modalMoreDetails.date}</Typography>
        </div>
        <Typography variant='body2' style={{ color: '#0b344e' }}>Atendimento feito por: {modalMoreDetails.vet}</Typography>
        <Typography variant='body2' style={{ color: '#0b344e' }}>Clínica: {modalMoreDetails.clinic}</Typography>


        <div className='mt-4 d-flex flex-column'>
            <strong className='mb-3'>{modalMoreDetails.summary}</strong>
            <Typography variant="body2">Descrição</Typography>
            <p>{modalMoreDetails.description}</p>
        </div>
    </div>;

    function openModal() {
        dispatch(showModal({
            bodyNode: moreDetailsElement,
            hasHeader: false
        }));
    }

    function handleMoreDetails(step: StepT) {
        setModalMoreDetails(prevModalMoreDetails => ({
            ...prevModalMoreDetails,
            title: step.title,
            summary: step.summary,
            date: step.date,
            type: step.type,
            description: step.description,
            vet: step.vet,
            clinic: step.clinic
        }));
        openModal();
    }

    const handleScroll = () => {
        const el = ref.current;

        if (el !== undefined) {
            //@ts-ignore
            setPositionTop(el.scrollTop);
            //@ts-ignore
            setPositionLeft(el.scrollLeft);
        }
    };

    useEffect(() => {
        const el = ref.current;
        if (width) {
            if (el) {
                el.scrollLeft = el.scrollWidth - el.clientWidth;
            }
        }
    }, [width]);

    //resolve a questão de assincronismo do react e a atualizacao do conteudo do modal
    useEffect(() => {
        // Função para abrir o modal com as informações atualizadas
        const openModalWithUpdatedDetails = () => {
            const moreDetailsElement = (
                <div>
                    <div className='d-flex justify-content-between mb-4'>
                        <Typography variant='body2' style={{ color: '#0b344e' }}>{modalMoreDetails.title}</Typography>
                        <Typography variant='body2' style={{ color: '#0b344e' }}>{modalMoreDetails.date}</Typography>
                    </div>
                    <Typography variant='body2' style={{ color: '#0b344e' }}>Atendimento feito por: {modalMoreDetails.vet}</Typography>
                    <Typography variant='body2' style={{ color: '#0b344e' }}>Clínica: {modalMoreDetails.clinic}</Typography>


                    <div className='mt-4 d-flex flex-column'>
                        <strong className='mb-3'>{modalMoreDetails.summary}</strong>
                        <Typography variant="body2">Descrição</Typography>
                        <p>{modalMoreDetails.description}</p>
                    </div>
                </div>
            );

            dispatch(
                showModal({
                    bodyNode: moreDetailsElement,
                    hasHeader: false
                })
            );
        };

        // Abre o modal sempre que modalMoreDetails for atualizado
        if (modalMoreDetails.title !== '') {
            openModalWithUpdatedDetails();
        }
    }, [modalMoreDetails]);


    return (
        urlParams.get("origin") == "iframe" ?
            <>
                {/*@ts-ignore */}
                <Overflow onScroll={handleScroll} ref={ref} >
                    <Box sx={{ width: '100%' }}>
                        <Stepper alternativeLabel activeStep={steps.length - 1}>
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel
                                        onClick={() => {
                                            handleMoreDetails(step)
                                        }}
                                        StepIconComponent={(props) =>
                                            <WrapperMark className='d-flex align-items-center justify-content-center flex-column'>
                                                <p>{step.date}</p>
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
                </Overflow >
            </>
            :
            <Section>
                <ContainerStyled className="d-flex align-items-center">
                    {/*@ts-ignore */}
                    <Overflow onScroll={handleScroll} ref={ref} >
                        <Box sx={{ width: '100%' }}>
                            <Stepper alternativeLabel activeStep={steps.length - 1}>
                                {steps.map((step, index) => (
                                    <Step key={index}>
                                        <StepLabel
                                            onClick={() => {
                                                handleMoreDetails(step)
                                            }}
                                            StepIconComponent={(props) =>
                                                <WrapperMark className='d-flex align-items-center justify-content-center flex-column'>
                                                    <p>{step.date}</p>
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
                    </Overflow >

                </ContainerStyled >
            </Section>
    );
}