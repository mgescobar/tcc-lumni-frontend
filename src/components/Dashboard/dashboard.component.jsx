import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  ContainerRow,
  ContainerRowChildrens,
  Column1,
  Column2,
  Title,
  TitleChart,
  Info,
  Chart,
  InsideColumnChart,
  InsideColumnFilter,
  InsideRowChart,
  LevelFilter,
  UserFilter,
  GameGraph,
  Chart2,
  TitleFilters
} from "./dashboard.styles";
import makeStyles from "@mui/styles/makeStyles";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  LineChart,
  Sector
} from "recharts";
import api from "../../services/api";

// import rank icons from public folder
import rank1 from "../../utils/rank1.gif";
import rank2 from "../../utils/rank2.gif";
import rank3 from "../../utils/rank3.gif";

const generalData = [
  { name: "Scrum", value: 400, correct: 100, incorrect: 300, fill: '#0088FE' },
  { name: "XP", value: 500, correct: 250, incorrect: 250, fill: '#00C49F' },
];

const data4 = [
  { value: 20, fill: "#f94144", name: "Ruim" },
  { value: 20, fill: "#f3722c", name: "Baixo" },
  { value: 20, fill: "#f9c74f", name: "Ok" },
  { value: 20, fill: "#90be6d", name: "Bom" },
  { value: 20, fill: "#43aa8b", name: "Excelente" },
];

const renderNeedle = (value, data) => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  const needleValue = (value / 100) * total;

  const angle = 180 + (needleValue / total) * 180;
  const radians = (angle * Math.PI) / 180;
  const cx = 200;
  const cy = 133;
  const length = 120;

  const x = cx + length * Math.cos(radians);
  const y = cy + length * Math.sin(radians);
  return <line x1={cx} y1={cy} x2={x} y2={y} stroke="black" strokeWidth="3" />;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    option: {
      width: "50%",
      margin: 12,
      fontSize: 15,
    },
    styleTitle: {
      textAlign: "start",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "@media (max-width: 759px)": {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    filters: {
      margin: "0 10px",
      width: "150px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
      },
    },
    progressTextRight: {
      textAlign: "left",
      fontSize: "15px",
      fontWeight: 300,
      fontFamily: "Roboto",
      color: "#444446",
      marginTop: 9,
    },
    h3: {
      display: "inline-block",
      marginBottom: -10,
      marginTop: 10,
      paddingTop: 5,
      fontWeight: 500,
      color: "#444446",
      fontFamily: "Roboto",
      letterSpacing: "normal",
    },
    filterItem: {
      margin: "0 10px",
    },
  }));

export default function DashboardData() {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userPlayer = JSON.parse(localStorage.getItem("player"));
  const defaultPlayerOptions = [{ id: userPlayer?.id, name: user.name, user_id: userPlayer?.user_id }];

  const [playerOptions, setPlayerOptions] = useState([]);
  const [player, setPlayer] = useState([]);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [question, setQuestion] = useState(null);

  const [themeOptions, setThemeOptions] = useState([
    { name: "Todos", value: 0 },
    { name: "Scrum", value: 1 },
    { name: "Extreme Programming", value: 2 },
  ]);
  const [theme, setTheme] = useState(themeOptions[0]);

  // ---------------------------------------------- //

  const [ acessDataChart, setAcessDataChart ] = useState([]);
  const [ gamePerformance, setGamePerformance ] = useState([]);
  const [ performanceDataGraph, setPerformanceDataGraph ] = useState([]);
  const [ generalDataGraph, setGeneralDataGraph ] = useState([]);

  // ---------------------------------------------- //


  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    let correctRate = ((payload.corretas / payload.respondidas) * 100).toFixed(2);
    let incorrectRate = ((payload.incorretas / payload.respondidas) * 100).toFixed(2);

    if (correctRate === "NaN") {
      correctRate = 0;
    }
    if (incorrectRate === "NaN") {
      incorrectRate = 0;
    }
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.tema}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
          {`Perguntas registradas: ${value}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#333">
          {`Respostas: ${payload.respondidas}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="green">
          {`Acertos: ${payload.corretas} (${correctRate}%)`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={54} textAnchor={textAnchor} fill="red">
          {`Erros: ${payload.incorretas} (${incorrectRate}%)`}
        </text>
      </g>
    );
  };

  
  // filtros jogadores
  useEffect(() => {
    async function allPlayers() {
      const { data } = await api.get("/findAllPlayers")
      data.players.unshift({ id: 0, user_id: 0, name: "Todos" });
      setPlayerOptions(data.players);
      setPlayer(data.players[0]);
    }
    
    if(user.type === 3) {
      setPlayerOptions(defaultPlayerOptions);
      setPlayer(defaultPlayerOptions[0]);
    } else {
      allPlayers();
    }
  }, []);
  
  // filtros perguntas
  useEffect(() => {
    async function data() {
      const { data } = await api.post("/findAllProblemsWithFilters", {
        theme: theme ? theme.value : null,
        player_id: player ? player.id : null,
      });
      data.unshift({ id: 0, description: "Todas" });
      setQuestionOptions(data);
      setQuestion(data[0]);
    }
    data();
  }, [theme, player]);
  
  useEffect(() => {
    async function getGamePerformanceForGraph() {
      const { data } = await api.post("/gamePerformance", {
        player_id: player ? player.id : null,
      });
      setGamePerformance(data);
    }
    async function getAcessDataForGraph() {
      const { data } = await api.post("/numberOfAccessesByDayOfWeek", {
        user_id: player ? player.user_id : null,
      });
      setAcessDataChart(data);
    }

    getGamePerformanceForGraph();
    getAcessDataForGraph();
  }, [player]);

  useEffect(() => {
    async function getGeneralDataForGraph() {
      const { data } = await api.post("/generalStats", {
        player_id: player ? player.id : 0,
        theme: theme ? theme.value : 0,
        problem_id: question ? question.id : 0,
      });
      setGeneralDataGraph(data);
    }
    async function getPerformanceDataForGraph() {
      const { data } = await api.post("/performanceByQuestionLvl", {
        player_id: player ? player.id : null,
        theme: theme ? theme.value : null,
        problem_id: question ? question.id : null,
      });
      setPerformanceDataGraph(data);
    }

    getGeneralDataForGraph();
    getPerformanceDataForGraph();
  }, [player, theme, question]);

  // ---------------------------------------------- //

  return (
    <>
      {" "}
      <Container>
        {" "}
        <Title className={classes.styleTitle}>
          <TitleFilters className={classes.filters}>
            Filtros:
            <Autocomplete
              id="combo-box-demo"
              className={classes.filters}
              options={playerOptions}
              noOptionsText={'Sem alunos'}
              value={player}
              disabled={user.type === 3}
              getOptionLabel={(option) => option.name || ''}
              style={{ width: window.innerWidth > 320 ? 250 : 300 }}
              renderInput={(params) => <TextField {...params} label="Aluno(s)" variant="outlined" size="small" />}
              onChange={(event, value) => {
                if(!value) setPlayer(playerOptions[0]);
                else setPlayer(value);
              }}
            />
            <Autocomplete
              id="combo-box-demo"
              className={classes.filters}
              options={themeOptions}
              noOptionsText={'Sem temas'}
              value={theme}
              getOptionLabel={(option) => option.name || ''}
              style={{ width: window.innerWidth > 320 ? 250 : 300 }}
              renderInput={(params) => <TextField {...params} label="Tema(s)" variant="outlined" size="small" />}
              onChange={(event, value) => {
                if(!value) setTheme(themeOptions[0]);
                else setTheme(value);
              }}
            />
            <Autocomplete
              id="combo-box-demo"
              className={classes.filters}
              options={questionOptions}
              noOptionsText={'Sem perguntas respondidas'}
              value={question}
              getOptionLabel={(option) => option.description || ''}
              style={{ width: window.innerWidth > 320 ? 250 : 300 }}
              renderInput={(params) => <TextField {...params} label="Pergunta(s)" variant="outlined" size="small" />}
              onChange={(event, value) => {
                if(!value) setQuestion(questionOptions[0]);
                else setQuestion(value);
              }}
            />
          </TitleFilters>
        </Title>
        {" "}
        <ContainerRow>
          <Column1>
            <InsideColumnChart>
              <Info>
                {generalData.length >= 1 && (
                  <div className={classes.progressTextRight}>
                    <h3 className={classes.h3}>{generalDataGraph.registradas}</h3> {generalDataGraph.registradas === 1 ? "questão registrada" : "questões registradas"}.
                    <br />
                    <h3 className={classes.h3}>{generalDataGraph.respondidas}</h3> {generalDataGraph.respondidas === 1 ? "questão respondida" : "questões respondidas"}.
                    <br />
                    <h3 className={classes.h3}>{generalDataGraph.corretas}</h3> {generalDataGraph.corretas === 1 ? "acerto" : "acertos"}.
                    <br />
                    <h3 className={classes.h3}>{generalDataGraph.incorretas}</h3> {generalDataGraph.incorretas === 1 ? "erro" : "erros"}.
                  </div>
                )}
              </Info>
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart width={700} height={700}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={generalDataGraph}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="registradas"
                      onMouseEnter={(event, index) => setActiveIndex(index)}
                    />
                  </PieChart>
                </ResponsiveContainer>
            </InsideColumnChart>
          </Column1>
            <Column2>
              <GameGraph>
                <ResponsiveContainer width="50%" height="100%" style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <PieChart>
                    <Pie data={data4} startAngle={180} endAngle={0} innerRadius="50%" outerRadius="95%" dataKey="value" cx={200} cy={130}>
                      {data4.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    {renderNeedle(gamePerformance.desempenho, data4)}
                    <text x={200} y={150} textAnchor="middle" dominantBaseline="middle" className="label" fontSize="24px" fontWeight="bold">
                      {gamePerformance.desempenho}%
                    </text>
                    <text x={200} y={175} textAnchor="middle" dominantBaseline="middle" className="label" fontSize="16px">
                      Desempenho no jogo
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </GameGraph>
              <Chart2>
              {player && player.id !== 0 ?  
                <>
                  Sua posição no ranking é <strong>{
                    gamePerformance.posicao_placar === 1 ?
                    <img
                        src={rank1}
                        alt="1"
                        style={{ margin : "0 5px", width: "20px" }}
                    />
                    : gamePerformance.posicao_placar === 2 ? 
                        <img
                            src={rank2}
                            alt="2"
                            style={{ margin : "0 5px", width: "20px" }}
                        />
                    : gamePerformance.posicao_placar === 3 ?
                        <img
                            src={rank3}
                            alt="3"
                            style={{ margin : "0 5px", width: "20px" }}
                        /> 
                    : gamePerformance.posicao_placar
                  }</strong>
                </> 
              : null}	
              <br />
              <br />
              {!player || player.id === 0 ? "O nível médio da turma é" : "Seu nível de jogador é"} <strong>{gamePerformance.level}</strong>
                <br />
                <br />
                {!player || player.id === 0 ? "O rank médio da turma é" : "Seu rank é" } <strong>{gamePerformance.rank}</strong>
              </Chart2>
            </Column2>
        </ContainerRow>

        <ContainerRowChildrens>
          <InsideRowChart>
            <TitleChart>Desempenho por Nível de Dificuldade das Questões</TitleChart>
            <ResponsiveContainer width="75%" height={250} style={{ marginLeft: "auto", marginRight: "auto" }}>
              <ComposedChart layout="vertical" data={performanceDataGraph}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="Dificuldade" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Acertos" fill="#82ca9d" />
                <Bar dataKey="Erros" fill="#f94144" />
                <Line type="monotone" dataKey="Tempo Médio (segundos)" stroke="#9061f9" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </InsideRowChart>

          <InsideRowChart>
            <TitleChart>Número de acessos por dia da semana</TitleChart>
            <ResponsiveContainer width="80%" height={170} style={{ marginLeft: "auto", marginRight: "auto" }}>
              <LineChart
                width={1300}
                height={245}
                data={acessDataChart}
                margin={{
                  top: 10,
                  right: 30,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Dia da semana" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Número de acessos" stroke="#0088FE" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </InsideRowChart>
        </ContainerRowChildrens>
      </Container>
    </>
  );
}
