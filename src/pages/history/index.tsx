import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import { ContainerStyled, TimelineContentStyled } from './styles';
import { Pets } from '@material-ui/icons';
import { MedicalInformation, Vaccines } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/modalSlice';

export default function HistoryPage() {
    const dispatch = useDispatch();

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
        <>
            <ContainerStyled>
                <Timeline position="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            10 mar. 2023
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <Pets />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContentStyled sx={{ py: '12px', px: 2 }} onClick={() => handleMoreDetails()}>
                            <Typography variant="caption" component="span" color="primary">
                                Consulta
                            </Typography>
                            <Typography variant="body2">Diagóstico: Giardia</Typography>
                        </TimelineContentStyled>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            11 mar. 2023
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <MedicalInformation />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="caption" component="span" color="primary">
                                Procedimento
                            </Typography>
                            <Typography variant="body2">Internação por 24 horas</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            1 jun. 2023
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <Vaccines />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="caption" component="span" color="primary">
                                Medicação/Vacinas
                            </Typography>
                            <Typography variant="body2">Vacina GPX-5454 Giardia</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            15 jun. 2023
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <Pets />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContentStyled sx={{ py: '12px', px: 2 }} onClick={() => handleMoreDetails()}>
                            <Typography variant="caption" component="span" color="primary">
                                Consulta
                            </Typography>
                            <Typography variant="body2">Saudável</Typography>
                        </TimelineContentStyled>
                    </TimelineItem>
                    <TimelineItem></TimelineItem>
                </Timeline>
            </ContainerStyled>
        </>
    );
}