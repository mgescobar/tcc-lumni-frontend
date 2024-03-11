/* Styles */
import {
    Container,
    Title,
    ContainerTitle
} from "./highscore.styles";

/* Material UI*/
import {  red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
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
import makeStyles from "@mui/styles/makeStyles";

// import rank icons from public folder
import rank1 from "../../utils/rank1.gif";
import rank2 from "../../utils/rank2.gif";
import rank3 from "../../utils/rank3.gif";

import api from "../../services/api";
import { TableHead } from "@mui/material";

const theme = createTheme({
    palette: {
        secondary: { main: red[600] },
    },
});

const useStyles = makeStyles((theme) => ({
    textControl: {
        width: "100%",
        margin: "12px",
        "@media (max-width: 680px)": {
            width: "100%",
            padding: 10,
        },
    }
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

export default function HighscoreData() {
    //const { auth } = useContext(AuthProvider);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getHighscore() {
            const response = await api.get("/highscore");
            const highscore = response.data.players;
            setRows(highscore);
        }
        getHighscore();
    }, []);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container component={Paper}>
            <ContainerTitle>
                <Title 
                    variant="h6" 
                    component="div"
                    style={{ fontWeight: "bold", textAlign: "right" }}
                >
                    {"Ranking"}
                </Title>
            </ContainerTitle>
            <Table sx={{ minWidth: 500}} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            style={{
                                
                                fontWeight: "bold",
                            }}
                        >
                            Rank
                        </TableCell>
                        <TableCell
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            Nome
                        </TableCell>
                        <TableCell
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            Título
                        </TableCell>
                        <TableCell
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            Nível
                        </TableCell>
                            <TableCell
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Pontuação
                            </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                          )
                        : rows
                    ).map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {
                                    index + 1 === 1 ?
                                        <img
                                            src={rank1}
                                            alt="1"
                                            style={{ width: "20px" }}
                                        />
                                    : index + 1 === 2 ? 
                                        <img
                                            src={rank2}
                                            alt="2"
                                            style={{ width: "15px" }}
                                        />
                                    : index + 1 === 3 ?
                                        <img
                                            src={rank3}
                                            alt="3"
                                            style={{ width: "15px" }}
                                        /> 
                                    : index + 1
                                }
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.rank}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Nível {row.level}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.score}
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
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
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
        </Container>
    );
}
