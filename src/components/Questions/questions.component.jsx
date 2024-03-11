/* Styles */
import {
    Container,
    Title,
    Row1Modal,
    Row2Modal,
    ContainerAddModalQuestion,
    Question,
    Level,
    Answers,
    AddIconModal,
    ContainerTitle,
    ADDQuestion,
} from "./questions.styles";

/* Material UI*/
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {  red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import makeStyles from "@mui/styles/makeStyles";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import api from "../../services/api";
import Categories from "../../api/Categories";
//Context
//import { AuthProvider } from "../../contexts/AuthContext";

const theme = createTheme({
    palette: {
        secondary: { main: red[600] },
    },
});
const useStyles = makeStyles((theme) => ({
    addQuestion: {
        background: "#7a5ee0",
        height: "50px",
        textTransform: "inherit",

        fontFamily: "Roboto",
        fontWeight: 700,
        width: "100%",
        fontSize: 15,
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },

    paperModal: {
        overflowX: "hidden",
        overflowY: "auto",
        marginLeft: "50%",
        marginTop: "20px",
        transform: "translateX(-50%)",
        width: 800,
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
    },

    buttonModalRemove: {
        width: "12rem",
        height: "55px",
        textTransform: "inherit",
        fontFamily: "Roboto",
        fontWeight: 700,
        fontSize: 15,
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const options = [
    "Fácil",
    "Intermediário",
    "Difícil"
];

export default function QuestionsData() {
    //const { auth } = useContext(AuthProvider);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [openRemove, setOpenRemove] = useState(false);
    const [RemoveId, setRemoveId] = useState();
    const [EditId, setEditId] = useState(0);

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionCorrect, setQuestionCorrect] = useState("");
    const [questionLevel, setQuestionLevel] = useState("");
    const [category, setCategory] = useState(0);

    const [answers, setAnswers] = useState([
        { id: '0', label: 'a)', description: '' },
        { id: '1', label: 'b)', description: '' },
    ]);

    const [editAnswers, setEditAnswers] = useState([]);

    const [EDITquestionTitle, setEDITQuestionTitle] = useState("");
    const [EDITquestionCorrect, setEDITQuestionCorrect] = useState("");
    const [EDITquestionLevel, setEDITQuestionLevel] = useState(0);
    const [EDITquestionCategory, setEDITQuestionCategory] = useState(0);


    const [questionsDependent, setQuestionsDependent] = useState(false);

    useEffect(() => {
        async function getProblems() {
            const response = await api.get("/findAllProblems");
            const problems = response.data.problems;
            setRows(problems);
        }
        getProblems();
    }, [questionsDependent]);

    async function getQuestionToEdit(EditId) {
        try {
            const { data } = await api.get(`/findProblem/${EditId}`);

            const answerOptions = [
                { id: '0', label: 'a)' },
                { id: '1', label: 'b)' },
                { id: '2', label: 'c)' },
                { id: '3', label: 'd)' },
                { id: '4', label: 'e)' }
            ]
            
            setEDITQuestionTitle(data.problem.description);
            setEDITQuestionLevel(options[data.problem.level - 1]);
            setEDITQuestionCategory(data.problem.theme);
            setEditAnswers(data.options.map((item, index) => ({
                id: item.id,
                label: answerOptions[index].label,
                description: item.description
            })));
            
            setEDITQuestionCorrect(
                data.options[0].correct === 1
                    ? "0"
                    : data.options[1].correct === 1
                    ? "1"
                    : data.options[2].correct === 1
                    ? "2"
                    : data.options[3].correct === 1
                    ? "3"
                    : data.options[4].correct === 1
                    ? "4"
                    : "",
            );
        } catch (err) {
            console.log(err);
        }
    }

    async function handleEditQuestion() {
        try {
            const teste = await api.put(`/problems/${EditId}`, {
                description: EDITquestionTitle,
                options: editAnswers.map((answer, index) => ({
                    id: answer.id,
                    description: answer.description,
                    correct: EDITquestionCorrect === index.toString() ? 1 : 0,
                })),
                level: options.indexOf(EDITquestionLevel) + 1,
                theme: EDITquestionCategory 
            });
            setOpenEdit(false);
            
            questionsDependent
                ? setQuestionsDependent(false)
                : setQuestionsDependent(true);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleRemoveQuestion() {
        try {
            console.log("Removendo questão");
            const teste = await api.delete(`/problems/${RemoveId}`);
            setOpenRemove(false);
            questionsDependent
                ? setQuestionsDependent(false)
                : setQuestionsDependent(true);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleNewQuestion() {

        if (
            questionTitle === "" ||
            questionCorrect === "" ||
            questionLevel === ""
        ) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            const teste = await api.post("/problems", {
                problems: [
                    {
                        description: questionTitle,
                        options: answers.map((answer, index) => ({
                            description: answer.description,
                            correct: questionCorrect === index.toString() ? 1 : 0,
                        })),
                        level: questionLevel + 1,
                        tips: "teste",
                        theme: category
                        
                    },
                ],
            });
            setOpen(false);
            questionsDependent
                ? setQuestionsDependent(false)
                : setQuestionsDependent(true);
            console.log("Questão cadastrada com sucesso");

            setAnswers([
                { id: '0', label: 'a)', description: '' },
                { id: '1', label: 'b)', description: '' },
            ]);
        } catch (err) {
            console.log(err);
        }
    }

    /* pega as questoes do back e atribui no rows. 
  useEffect(() => {
    const callApiFindAllQuestions = async () => {
      const response = await api.get("/findAllProblems");
      setRows(response.data);
    };

    try {
      callApiFindAllQuestions();
    } catch (err) {
      console.log(err);
    }
  }, []);
  */

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenEdit = (QuestionId) => {
        setEditId(QuestionId);
        getQuestionToEdit(QuestionId);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    function handleOpenRemove(QuestionId) {
        setRemoveId(QuestionId);
        setOpenRemove(true);
    }

    const handleCloseRemove = () => {
        setOpenRemove(false);
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // aqui
    const answerOptions = [
        { id: '0', label: 'a)' },
        { id: '1', label: 'b)' },
        { id: '2', label: 'c)' },
        { id: '3', label: 'd)' },
        { id: '4', label: 'e)' }
    ]

    const handleAnswerChange = (id, description) => {
        setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
            answer.id === id ? { ...answer, description } : answer
        )
        );
    };

    const handleAddAnswer = () => {
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          { id: `${prevAnswers.length}`, label: answerOptions[prevAnswers.length].label, description: '' },
        ]);
    };

    const handleRemoveAnswer = (id) => {
        setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== id)
        );
    };

    const handleEditAnswerChange = (id, description) => {
        setEditAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
            answer.id === id ? { ...answer, description } : answer
        )
        );
    };

    const body = (
        <div className={classes.paperModal}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    justifyContent: "center",
                    color: " #01263f",
                    textDecoration: "none",
                }}
            >
                Adicionar Pergunta
            </Typography>
            <ContainerAddModalQuestion>
                <Question>
                    <TextField
                        variant="outlined"
                        multiline={true}
                        size="small"
                        id="new-question"
                        className={classes.textControl}
                        label="Pergunta"
                        style={{ margin: 8}}
                        placeholder="Informe aqui"
                        margin="normal"
                        type="text"
                        value={questionTitle}
                        onChange={(event) =>
                            setQuestionTitle(event.target.value)
                        }
                    />
                </Question>
                <Level>
                    <Stack spacing={1} sx={{ width: 300, marginTop: 5 }}>
                        <Autocomplete
                            options={options}
                            id="disable-close-on-select"
                            onChange={(event, newValue) => {
                                setQuestionLevel(options.indexOf(newValue));
                            }}
                            //value={options[questionLevel]} usar no edit
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nível da Questão"
                                    variant="standard"
                                />
                            )}
                        />
                    </Stack>

                    <Stack spacing={1} sx={{ width: 300, marginTop: 5 }}>
                        <TextField
                            select
                            label="Selecione a categoria"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            variant="outlined"
                            style={{ marginBottom: 30, width: "100%" }}
                        >
                            {Categories.map((cat) => (
                                <MenuItem key={cat.category} value={cat.value}>
                                    {cat.category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Level>
                
                <FormControl style={{ width: "150%" }}>
                <Grid container alignItems="center" justifyContent="center" spacing={2}
                    style={{ marginBottom: "20px", marginTop: "5px", alignItems: "center", justifyContent: "center" }}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddAnswer}
                            disabled={answers.length >= 5}
                        >
                            Adicionar alternativa
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={answers.length === 2}
                            onClick={() => handleRemoveAnswer(answers[answers.length - 1].id)}
                        >
                            Remover alternativa
                        </Button>
                    </Grid>
                </Grid>
                
                <FormLabel
                    className={classes.textControl}
                    id="demo-controlled-radio-buttons-group"
                    style={{ 
                        textAlign: "center", 
                        fontWeight: "bold", 
                        color: "black", 
                        fontSize: "20px",
                    }}
                >
                    {answers.length} Alternativas
                </FormLabel>

                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={questionCorrect}
                    onChange={(event) => setQuestionCorrect(event.target.value)}
                >
                    <Grid container spacing={2}>
                        {answers.map((answer) => (
                            <Grid item xs={12} md={12} style={{ display: "flex" }} key={answer.id}>
                                <FormControlLabel
                                    value={answer.id}
                                    control={<Radio />}
                                    label={answer.label}
                                />

                                <TextField
                                    id={`question${answer.label}`}
                                    variant="outlined"
                                    multiline
                                    size="small"
                                    className={classes.textControl}
                                    style={{ width: "100%", maxWidth: "1200px", margin: 8, minWidth: "400px" }}
                                    margin="normal"
                                    type="text"
                                    value={answer.text}
                                    onChange={(event) =>
                                        handleAnswerChange(answer.id, event.target.value)
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>

                <AddIconModal>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color={"primary"}
                            className={classes.buttonModal}
                            onClick={handleNewQuestion}
                            style={{ marginTop: "40px", marginBottom: "10px" }}
                        >
                            Salvar Pergunta
                            {<AddIcon />}
                        </Button>
                    </ThemeProvider>
                </AddIconModal>
            </ContainerAddModalQuestion>
        </div>
    );

    const editBody = (
        <div className={classes.paperModal}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    justifyContent: "center",
                    color: " #01263f",
                    textDecoration: "none",
                }}
            >
                Editar Pergunta
            </Typography>
            <ContainerAddModalQuestion>
                <Question>
                    <TextField
                        variant="outlined"
                        multiline={true}
                        size="small"
                        id="new-question"
                        className={classes.textControl}
                        label="Pergunta"
                        style={{ margin: 8}}
                        placeholder="Informe aqui"
                        margin="normal"
                        type="text"
                        value={EDITquestionTitle}
                        onChange={(event) =>
                            setEDITQuestionTitle(event.target.value)
                        }
                    />
                </Question>
                <Level>
                    <Stack spacing={1} sx={{ width: 300, marginTop: 5 }}>
                        <Autocomplete
                            options={options}
                            id="disable-close-on-select"
                            onChange={(event, newValue) => {
                                setEDITQuestionLevel(newValue);
                            }}
                            value={EDITquestionLevel}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nível da Questão"
                                    variant="standard"
                                />
                            )}
                        />
                    </Stack>

                    <Stack spacing={1} sx={{ width: 300, marginTop: 5 }}>
                        <TextField
                            select
                            label="Selecione a categoria"
                            value={EDITquestionCategory}
                            onChange={(e) => setEDITQuestionCategory(e.target.value)}
                            variant="outlined"
                            style={{ marginBottom: 30, width: "100%" }}
                        >
                            {Categories.map((cat) => (
                                <MenuItem key={cat.category} value={cat.value}>
                                    {cat.category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Level>
                
                <FormControl style={{ width: "150%" }}>
                
                <FormLabel
                    className={classes.textControl}
                    id="demo-controlled-radio-buttons-group"
                    style={{ 
                        textAlign: "center", 
                        fontWeight: "bold", 
                        color: "black", 
                        fontSize: "20px",
                    }}
                >
                    {editAnswers.length} Alternativas
                </FormLabel>

                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={EDITquestionCorrect}
                    onChange={(event) => {
                        setEDITQuestionCorrect(event.target.value)
                    }}
                >
                    <Grid container spacing={2}>
                        {editAnswers.map((answer, index) => (
                            <Grid item xs={12} md={12} style={{ display: "flex" }} key={answer.id}>
                                <FormControlLabel
                                    value={index}
                                    control={<Radio />}
                                    label={answer.label}
                                />

                                <TextField
                                    id={`question${answer.label}`}
                                    variant="outlined"
                                    multiline
                                    size="small"
                                    className={classes.textControl}
                                    style={{ width: "100%", maxWidth: "1200px", margin: 8, minWidth: "400px" }}
                                    margin="normal"
                                    type="text"
                                    value={answer.description}
                                    onChange={(event) => {
                                        handleEditAnswerChange(answer.id, event.target.value)
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>

                <AddIconModal>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color={"primary"}
                            className={classes.buttonModal}
                            onClick={handleEditQuestion}
                            style={{ marginTop: "40px", marginBottom: "10px" }}
                        >
                            Editar Pergunta
                            {<AddIcon />}
                        </Button>
                    </ThemeProvider>
                </AddIconModal>
            </ContainerAddModalQuestion>
        </div>
    );

    const deleteBody = (
        <div className={classes.paperModal}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    justifyContent: "center",
                    color: " #01263f",
                    textDecoration: "none",
                }}
            >
                Deseja remover esta pergunta?
            </Typography>
            <Row1Modal>
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="button"
                        className={classes.buttonModalRemove}
                        onClick={handleRemoveQuestion}
                    >
                        <span className={classes.titleButton}>Remover</span>
                    </Button>
                </ThemeProvider>
            </Row1Modal>
            <Row2Modal>
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="button"
                        className={classes.buttonModalRemove}
                        onClick={handleCloseRemove}
                    >
                        <span className={classes.titleButton}>Cancelar</span>
                    </Button>
                </ThemeProvider>
            </Row2Modal>
        </div>
    );

    return (
        <Container component={Paper}>
            <ContainerTitle>
                <Title variant="h6" component="div">
                    {"Menu de Perguntas"}
                </Title>
                <ADDQuestion>
                    <Button
                        variant="contained"
                        color="primary"
                        size="larg"
                        className={classes.addQuestion}
                        onClick={handleOpen}
                    >
                        {<AddIcon> </AddIcon>} Nova Pergunta
                    </Button>
                </ADDQuestion>
            </ContainerTitle>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                          )
                        : rows
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.description}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Nível {row.level}
                            </TableCell>

                            <TableCell style={{ width: 160 }} align="right">
                                <EditIcon
                                    onClick={() => handleOpenEdit(row.id)}
                                />
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                                <DeleteIcon
                                    onClick={() => handleOpenRemove(row.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: -1 },
                            ]}
                            colSpan={5}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage="Linhas por página:"
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    "aria-label": "Linhas por página",
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {body}
            </Modal>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {editBody}
            </Modal>
            <Modal
                open={openRemove}
                onClose={handleCloseRemove}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {deleteBody}
            </Modal>
        </Container>
    );
}
