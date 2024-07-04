import styled from "styled-components/macro";

export const Container = styled.div`
    margin: 50px auto;
    background-color: #fff;
    width: 70%;
    min-height: 200px;
    height: min-content;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 10px 10px 42px 0px rgba(0, 0, 0, 0.75);

    @media screen and (max-width: 600px) {
        width: 85%;
    }
`;

export const Pontuação = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    min-height: 200px;
    font-size: 24px;
    justify-content: center;
    align-items: center;
    color: #01263f;
`;

export const InfoPerguntas = styled.div`
    width: 100%;
    color: #01263f;
    position: relative;
`;

export const ContagemTempo = styled.div`
    display: flex;
    justify-content: left;
    font-size: 18px;
    font-weight: bold;
    color: #9061f9
`;

export const ContagemPerguntas = styled.div`
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 20px;
    font-size: 28px;
    color: #01263f;
`;

export const Pergunta = styled.div`
    margin-bottom: 12px;
    color: #01263f;
`;

export const GrupoResposta = styled.div`
    display: flex;
    flex: 1 1 200px;
    justify-content: center;
    align-items: baseline;
    color: #01263f;
`;

export const Resposta = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    color: #01263f; ;
`;

export const ButtonAnswer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 16px;
    color: #01263f;
    background-color: #fff;
    border-radius: 8px;
    padding: 8px;
    border: 3px solid #3e2f5b;
    cursor: pointer;
    margin: 0 12px 10px;
    transition: 0.6s;
    &:hover {
        background-color: #ddd;
    }
`;
