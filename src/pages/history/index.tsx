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

    const moreDetailsElement = <p>Mais detalhes</p>;

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
                            <Typography variant="body2">Saudável</Typography>
                        </TimelineContentStyled>
                    </TimelineItem>
                    <TimelineItem></TimelineItem>
                </Timeline>
            </ContainerStyled>
        </>
    );
}