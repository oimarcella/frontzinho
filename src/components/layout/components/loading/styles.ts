import styled from "styled-components";

export const WrapperLoading = styled.div`
`;
export const LoadingStyled = styled.div`
    border: 5px solid var(--light-blue-200);
    border-top: 10px solid var(--light-blue-200);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    
    
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
    
`;