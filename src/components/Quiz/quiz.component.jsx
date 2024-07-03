import React, { useEffect, useState, useLayoutEffect} from "react";
import api from "../../services/api";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import { CategoriesQuiz } from "../../api/Categories";
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
    ContagemTempo
} from "./quiz.styles";
import { ClassNames } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";

const useStyles = makeStyles((theme) => ({
    paperModal: {
        overflowX: "hidden",
        overflowY: "auto",
        marginLeft: "50%",
        marginTop: "15%",
        transform: "translateX(-50%)",
        width: 500,
        background: "white",
        maxHeight: 800,
        border: "1px solid grey",
        borderRadius: "10px",
        boxShadow:
            "0px 2.075px 4.15px rgba(0, 0, 0, 0.16), 0px 4.15px 8.3px rgba(0, 0, 0, 0.12), 0px 2.075px 16.6px rgba(0, 0, 0, 0.1)",
        padding: "2rem",
        fontFamily: "Roboto",
        textAlign: "center",
        "@media (max-width: 680px)": {
            marginTop: "80%",
            transform: "translate(-50%, -50%) scale(0.7)",
        },
    },
    paperModal2: {
        overflowX: "hidden",
        overflowY: "auto",
        marginLeft: "50%",
        marginTop: "15%",
        transform: "translateX(-50%)",
        width: 700,
        background: "white",
        maxHeight: 800,
        border: "1px solid grey",
        borderRadius: "10px",
        boxShadow:
            "0px 2.075px 4.15px rgba(0, 0, 0, 0.16), 0px 4.15px 8.3px rgba(0, 0, 0, 0.12), 0px 2.075px 16.6px rgba(0, 0, 0, 0.1)",
        padding: "2rem",
        fontFamily: "Roboto",
        textAlign: "center",
        "@media (max-width: 680px)": {
            marginTop: "80%",
            transform: "translate(-50%, -50%) scale(0.7)",
        },
    },
    buttonModal: {
        width: "12rem",
        background: "#7a5ee0",
        height: "55px",
        textTransform: "inherit",
        float: "center",
        fontFamily: "Roboto",
        fontWeight: 700,
        marginLeft: "4rem",
        marginTop: "1rem",
        fontSize: 15,
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
    textControl: {
        width: "100%",
        margin: "12px",
        "@media (max-width: 680px)": {
            width: "100%",
            padding: 10,
        },
    }
}));

function QuizData() {
    const [questions, setquestions] = useState([]);
    const [ArmazenaRespondida, setArmazenaRespondida] = useState([]);
    const [indexRespondida, setIndexRespondida] = useState(0);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [resetaContagem, setResetaContagem] = useState(false);
    const [showPontuacao, setShowPontuacao] = useState(false);
    const [acertou, setAcertou] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [playerID, setplayerID] = useState(0);
    const Value = useLocation().state;
    const navigate = useNavigate();
    const classes = useStyles();

    const [openEndQuiz, setOpenEndQuiz] = React.useState(false);
    const [openBringNextQuestion, setOpenBringNextQuestion] = React.useState(false);
    const [bringNextQuestion, setBringNextQuestion] = useState(false);
    const [noQuestions, setNoQuestions] = useState(false);

    const scoreTable = [
        {
            level: 1,
            nivel: "Fácil",
            score: 10
        },
        {
            level: 2,
            nivel: "Média",
            score: 35
        },
        {
            level: 3,
            nivel: "Difícil",
            score: 75
        }
    ]

    const handleCloseEndQuiz = () => {
        setOpenEndQuiz(false);
    };

    const handleCloseBringNextQuestion = () => {
        setOpenBringNextQuestion(false);
    }

    const handleBringNextQuestion = () => {
        setResetaContagem(true);
        setBringNextQuestion(!bringNextQuestion);
        setOpenBringNextQuestion(false);
    }

    const handleBringNextQuestionInFeedback = () => {
        setBringNextQuestion(!bringNextQuestion);
        setShowPontuacao(!showPontuacao);
    }

    useLayoutEffect(() => {
        if (!resetaContagem) {
            const timer = setInterval(() => {
                setTempo(tempo + 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setTempo(0);
            setResetaContagem(false);
        }
    }, [resetaContagem, tempo]);

    useEffect(() => {
        setResetaContagem(true)
        if (Value.category === 3) {
            async function findperguntasRandom() {
                try {
                    const id = JSON.parse(localStorage.getItem("user")).id;
                    const player = await api.get(`/findUser/${id}`);
                    var response;

                    if(player.data.player.length == 0){
                        response = await api.get(`/randomProblem/${2}`);
                    } else {
                        setplayerID(player.data.player[0].id);
                        setPontos(player.data.player[0].score);
                        response = await api.get(`/randomProblem/${player.data.player[0].id}/`);
                    }

                    if(response.data.message == "Não foram encontrada perguntas com esse tema para esse jogador."){
                        setNoQuestions(true);
                        return;
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
                    if(err.response.data.message == "Não foram encontrada perguntas com esse tema para esse jogador."){
                        setNoQuestions(true);
                        setquestions([]);
                    }
                }
            }
            findperguntasRandom();
        } else {
            async function findperguntas() {
                try {

                    const id = JSON.parse(localStorage.getItem("user")).id;
                    const category_name = CategoriesQuiz.find((item) => item.value == Value.category);
                    const player = await api.get(`/findUser/${id}`);
                    var response;

                    if(player.data.player.length == 0){
                        response = await api.get(`/randomProblem/${2}`);
                    } else {
                        setplayerID(player.data.player[0].id);
                        setPontos(player.data.player[0].score);
                        response = await api.get(`/randomProblemByTheme/${player.data.player[0].id}/theme/${category_name.value}`);
                    }

                    if(response.data.message == "Não foram encontrada perguntas com esse tema para esse jogador."){
                        setNoQuestions(true);
                        return;
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
                    if(err.response.data.message == "Não foram encontrada perguntas com esse tema para esse jogador."){
                        setNoQuestions(true);
                        setquestions([]);
                    }
                }
            }
            findperguntas();
        }
    }, [bringNextQuestion]);

    function proximaPergunta(correta, pergunta) {
        const nextQuestion = perguntaAtual + 1;
        var response;
        if (correta === 1) {
            setPontos(pontos + scoreTable[pergunta.pergunta.level-1].score);
            setAcertou(true);
            try {
                response = api.post(`/addScore/${playerID}`, {
                    addScore: scoreTable[pergunta.pergunta.level-1].score
                });
            }
            catch (err) {
                console.log(err);
            }
        } else {
            setAcertou(false);
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
            tempo: tempo
        }
        
        ArmazenaRespondida.push(resultado);
        saveResult();
    }

    async function saveResult() {
        try {
            await api.post("answers" , {
                option_id: ArmazenaRespondida[ArmazenaRespondida.length - 1].resposta.id,
                player_id: playerID,
                problem_id: ArmazenaRespondida[ArmazenaRespondida.length - 1].pergunta,
                used_time: ArmazenaRespondida[ArmazenaRespondida.length - 1].tempo
            })
        } catch (err) {
            console.log(err);
        }
        setResetaContagem(true);
    }

    const bodyEndQuiz = (
        <div className={classes.paperModal}>
            <h2 id="simple-modal-title">Deseja mesmo encerrar o quiz?</h2>
            <div 
                id="simple-modal-description"
                style={{ 
                    display: "flex", 
                    justifyContent: "space-evenly", 
                    marginTop: "50px"
                }}
            >
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseEndQuiz}
                    style={{ width: "15%" }}
                >
                    Não
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/dashboard")}
                    style={{ width: "15%" }}
                >
                    Sim
                </Button>
            </div>
        </div>
    );

    const bodyNextQuestion = (
        <div className={classes.paperModal2}>
            <h2 id="simple-modal-title">Deseja pular essa pergunta?</h2>
            <span
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    fontSize: "20px",
                }}
            >
                Você irá receber outra pergunta aleatória que ainda não foi respondida.
            </span>
            <span 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    fontSize: "20px",
                }}
            > 
                Portanto, essa pergunta irá retornar em algum momento.
            </span>
            <div
                id="simple-modal-description"
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "50px",
                }}
            >
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseBringNextQuestion}
                    style={{ width: "15%" }}
                >
                    Não
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBringNextQuestion()}
                    style={{ width: "15%" }}
                >
                    Sim
                </Button>
            </div>
        </div>
    );

    function correctOption (question) {
        return question.opcoesResposta.filter((item) => item.correta === 1)[0].resposta;
    }

    return questions[0] ? (
        <Container>
            {showPontuacao && noQuestions === false ? (
                <Pontuação>
                    {acertou ? 
                        <>
                            <span>
                                <span style={{ color: 'green' }}>Correto!</span> Você acertou uma pergunta de nível {scoreTable[questions[perguntaAtual].pergunta.level-1].nivel} e ganhou <span style={{ color: 'green' }}>{scoreTable[questions[perguntaAtual].pergunta.level-1].score}</span> pontos.
                                <br></br>Sua pontuação agora é: <span style={{ fontWeight: "bold" }}>{pontos}</span>
                                <br></br><br></br>
                                <span style={{ fontWeight: "bold" }}>Alternativa correta:</span> {correctOption(questions[perguntaAtual])}
                                <br></br><br></br>
                                <span style={{ fontWeight: "bold" }}>Você demorou {
                                ArmazenaRespondida[0].tempo >= 60 ? 
                                    <span style={{ color: '#9061f9'}}>{Math.floor(ArmazenaRespondida[ArmazenaRespondida.length-1].tempo / 60)} minutos e {ArmazenaRespondida[ArmazenaRespondida.length-1].tempo % 60} segundos</span>
                                :
                                    <span style={{ color: '#9061f9'}}>{ArmazenaRespondida[ArmazenaRespondida.length-1].tempo} segundos</span>
                                } para responder.</span>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => setOpenEndQuiz(true)}
                                    >
                                        Encerrar Quiz
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => handleBringNextQuestionInFeedback()}
                                        style={{ marginLeft: "30px" }}
                                    >
                                        Próxima pergunta
                                    </Button>
                                </div>
                            </span>
                        </>
                        : 
                        <>
                            <span>
                                <span style={{ color: 'red' }}>Errado!</span> Você errou a questão e sua pontuação se manteve em: <span style={{ fontWeight: "bold" }}>{pontos}</span>
                                <br></br><br></br>
                                <span style={{ fontWeight: "bold" }}>Título:</span> {questions[perguntaAtual].pergunta.question}
                                <br></br><br></br>
                                <span style={{ fontWeight: "bold" }}>Alternativa correta:</span> {correctOption(questions[perguntaAtual])}
                                <br></br><br></br>
                                <span style={{ fontWeight: "bold" }}>Alternativa escolhida:</span> {ArmazenaRespondida[ArmazenaRespondida.length-1].resposta.resposta}
                                <br></br><br></br>
                                <span style={{ fontWeight: "bold" }}>Você demorou {
                                ArmazenaRespondida[0].tempo >= 60 ? 
                                    <span style={{ color: '#9061f9'}}>{Math.floor(ArmazenaRespondida[ArmazenaRespondida.length-1].tempo / 60)} minutos e {ArmazenaRespondida[ArmazenaRespondida.length-1].tempo % 60} segundos</span>
                                :
                                    <span style={{ color: '#9061f9'}}>{ArmazenaRespondida[ArmazenaRespondida.length-1].tempo} segundos</span>
                                } para responder.</span>
                            </span>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => setOpenEndQuiz(true)}
                                >
                                    Encerrar Quiz
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => handleBringNextQuestionInFeedback()}
                                    style={{ marginLeft: "30px" }}
                                >
                                    Próxima pergunta
                                </Button>
                            </div>
                        </>
                    }
                </Pontuação>
            ) : (
                <>
                    <InfoPerguntas>
                        <ContagemTempo>
                            {
                                tempo >= 60 ? 
                                    <span>Tempo: {Math.floor(tempo / 60)} minutos e {tempo % 60} segundos</span>
                                :
                                    <span>Tempo: {tempo} segundos</span>
                            }
                        </ContagemTempo>
                        <ContagemPerguntas>
                            {
                                questions[perguntaAtual].pergunta.level === 1 ?
                                    <span style={{fontSize: "30px", fontWeight: "bold", color: "green", textAlign: "center"}}> Fácil</span>
                                : questions[perguntaAtual].pergunta.level === 2 ? 
                                    <span style={{fontSize: "30px", fontWeight: "bold", color: "orange", textAlign: "center"}}>Média</span>
                                : <span style={{fontSize: "30px", fontWeight: "bold", color: "red", textAlign: "center"}}>Difícil</span>
                            }
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "50px",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => setOpenEndQuiz(true)}
                        >
                            Encerrar Quiz
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => 
                                setOpenBringNextQuestion(true)
                            }
                        >
                            Pular pergunta
                        </Button>
                    </div>
                    <Modal
                        open={openEndQuiz}
                        onClose={handleCloseEndQuiz}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {bodyEndQuiz}
                    </Modal>
                    <Modal
                        open={openBringNextQuestion}
                        onClose={handleCloseBringNextQuestion}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {bodyNextQuestion}
                    </Modal>
                </>
            )}
        </Container>
    ) : (
        noQuestions === true ? (
            <Container>
                <Pontuação>
                    <span>
                        Parabéns! Você zerou todas as perguntas desse tema do quiz.
                        <br></br>
                        <br></br>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate("/Filter")}
                        >
                            Voltar para o quiz
                        </Button>
                    </span>
                </Pontuação>
            </Container>
        ) : (
            <Container>
                <Pontuação>
                    <span>Carregando...</span>
                </Pontuação>
            </Container>
        )
    );
}

export default QuizData;
