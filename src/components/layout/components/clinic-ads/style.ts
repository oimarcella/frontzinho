import styled from 'styled-components';

type ContainerProps = {
    orientation?: string;
}

export const ContainerClinicAds = styled.div`
    background: #f1eeee;
    display: flex;
    justify-content: center;
    align-items:center;

    padding: 20px;
`;

export const LineAdds = styled.div<ContainerProps>`
    display: flex;
    flex-direction:${props => props.orientation === "vertical" ? `column` : `row`};

    @media (max-width: 1000px) {
        flex-direction:column!important;
    }
`;

export const AddBlockStyled = styled.div`
    background: #fff;
    border: 1px solid lightgray;
    margin: 10px;
    padding: 10px;
    cursor: pointer;

    display: flex;
    flex-direction: column;

    width: 200px;
    height: 100%;

    @media (max-width: 1000px) {
        width: 100%;
    }

    small{
        color: lightgray;
    }
    strong,small{
        font-size: 12px;
    }
    p{
        font-size: 10px;
    }
`;