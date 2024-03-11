import React, { useEffect, useState, useLayoutEffect} from "react";
import api from "../../services/api";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import Categories from "../../api/Categories";
/* Styles */
import {
    Container,
    Pontuação,
    InfoPerguntas,
    ContagemPerguntas,
    Pergunta,
    GrupoResposta,
    Resposta,
    ButtonAnswer,
} from "./quiz.styles";
import { ClassNames } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function QuizData() {
    const [questions, setquestions] = useState([]);
    const [ArmazenaRespondida, setArmazenaRespondida] = useState([]);
    const [indexRespondida, setIndexRespondida] = useState(0);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [showPontuacao, setShowPontuacao] = useState(false);
    const [acertou, setAcertou] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [playerID, setplayerID] = useState(0);
    const Value = useLocation().state;

    const scoreTable = [
        {
            level: 1,
            nivel: "Fácil",
            score: 10
        },
        {
            level: 2,
            nivel: "Intermediário",
            score: 35
        },
        {
            level: 3,
            nivel: "Difícil",
            score: 75
        }
    ]
 

    useEffect(() => {
        async function findperguntas() {
            try {

                const id = JSON.parse(localStorage.getItem("user")).id;
                const category_name = Categories.find((item) => item.value == Value.category);
                const player = await api.get(`/findUser/${id}`);
                var response;

                if(player.data.player.length == 0){
                    response = await api.get(`/randomProblem/${2}`);
                } else {
                    setplayerID(player.data.player[0].id);
                    setPontos(player.data.player[0].score);
                    response = await api.get(`/randomProblemByTheme/${player.data.player[0].id}/theme/${category_name.value}`);
                }

                const letras = ["A)", "B)", "C)", "D)", "E)"];
                const array_obj = [response.data];
                const newObject = array_obj.map((item, index) => {
                    return {
                        pergunta:{
                            level: item.problems[index].level,
                            question: item.problems[index].description,
                            id: item.problems[index].id,
                        },
                        opcoesResposta: item.options
                        .filter((item) => item.description != "" && item.description != null && item.description.trim() != "")
                        .map((item2, index2) => {
                            return {
                                id: item2.id,
                                resposta: item2.description,
                                correta: item2.correct,
                                alternativa: letras[index2],
                            };
                        }),
                    };
                });
                setquestions(newObject);
            } catch (err) {
                console.log(err);
            }
        }
        findperguntas();
    }, []);

    function proximaPergunta(correta, pergunta) {
        const nextQuestion = perguntaAtual + 1;
        var response;

        if (correta) {
            setPontos(pontos + scoreTable[pergunta.pergunta.level].score);
            setAcertou(true);
            try {
                response = api.post(`/addScore/${playerID}`, {
                    addScore: scoreTable[pergunta.pergunta.level].score
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        if (nextQuestion < questions.length) {
            setPerguntaAtual(nextQuestion);
        } else {
            setShowPontuacao(true);
        }
    }

    function addElement(opcoesResposta, pergunta) {
        setIndexRespondida(indexRespondida + 1);
        const resultado = {
            pergunta: pergunta,
            resposta: opcoesResposta,
        }

        ArmazenaRespondida.push(resultado);
        saveResult();
    }

    async function saveResult() {
        
        try {
            await api.post("answers" , {
                option_id: ArmazenaRespondida[0].resposta.id,
                used_time: 30,
                player_id: playerID,
                problem_id: ArmazenaRespondida[0].pergunta,
            })
        } catch (err) {
            console.log(err);
        }
    }
    /*
   return questions[0] ? (
        console.log(questions),
        <h1>
            {questions[0].opcoesResposta[0].resposta}
        </h1>
    ): console.log("nada");*/

    return questions[0] ? (
        <Container>
            {showPontuacao ? (
                <Pontuação>
                    {acertou ? 
                        <>
                            <span>
                                <span style={{ color: 'green' }}>Correto!</span> Você acertou uma pergunta de nível {scoreTable[questions[perguntaAtual].pergunta.level].nivel} e ganhou <span style={{ color: 'green' }}>{scoreTable[questions[perguntaAtual].pergunta.level].score}</span> pontos.
                                <br></br>Sua pontuação agora é: <span style={{ fontWeight: "bold" }}>{pontos}</span>
                                <br></br><br></br>
                                A alternativa correta é: {questions[perguntaAtual].opcoesResposta[0].resposta}
                            </span>
                        </>
                        : 
                        <>
                            <span>
                                <span style={{ color: 'red' }}>Errado!</span> Você errou a questão e sua pontuação se manteve em: <span style={{ fontWeight: "bold" }}>{pontos}</span>
                                <br></br><br></br>
                                Título: {questions[perguntaAtual].pergunta.question}
                                <br></br>
                                Alternativa correta: {questions[perguntaAtual].opcoesResposta[0].resposta}
                                <br></br>
                                Respondida: {ArmazenaRespondida[0].resposta.resposta}
                            </span>
                        </>
                    }
                </Pontuação>
            ) : (
                <>
                    
                    <InfoPerguntas>
                        <ContagemPerguntas>
                            <span>
                                Pergunta {perguntaAtual + 1} de {questions.length} registradas
                            </span>
                        </ContagemPerguntas>
                        <Pergunta style={{fontSize: "20px", fontWeight: "bold", textAlign: "center"}}>
                            {questions[perguntaAtual].pergunta.question}
                        </Pergunta>
                    </InfoPerguntas>
                    <Resposta>
                        {questions[perguntaAtual].opcoesResposta.map(
                            (opcoesResposta, index) => (
                                <GrupoResposta key={index}>
                                    <span>{opcoesResposta.alternativa}</span>
                                    <ButtonAnswer 
                                        onClick={() => {
                                            proximaPergunta(
                                                opcoesResposta.correta, questions[perguntaAtual]
                                            );
                                            addElement(opcoesResposta, questions[perguntaAtual].pergunta.id);
                                        }}
                                        
                                    >
                                        {opcoesResposta.resposta}
                                    </ButtonAnswer>
                                </GrupoResposta>
                            ),
                        )}
                    </Resposta>
                </>
            )}
        </Container>
    ) : (
        <h1>Carregando...</h1>
        //load the page
    );
}

export default QuizData;
