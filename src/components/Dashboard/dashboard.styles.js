import styled from "styled-components/macro";

export const Container = styled.div`
  margin: 15px auto;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  max-width: 80vw;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;

  @media screen and (max-width: 700px) {
    margin-top: 5px;
    margin-bottom: 50px;
    max-width: 94vw;
    padding-left: 0px;
  }
`;

export const ContainerRow = styled.div`
  display: grid;
  grid-template-areas: "column1 column2";
  grid-template-columns: 1fr 1fr;
  height: 27vh;

  @media screen and (max-width: 1600px) {
  grid-template-columns: 80vh 1fr;
  }

  @media screen and (max-width: 1600px), screen and (max-height: 900px) {
    height: 35vh;
  }

  @media screen and (max-width: 1025px) {
    grid-template-columns: 55vh 1fr;
  }

  @media screen and (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "column2"
      "column1";
  }

  @media screen and (max-width: 376px) {
    grid-template-areas:
      "column2"
      "column1";
    grid-template-rows: 2fr 1fr;
  }
`;

export const ContainerRowChildrens = styled.div`
  @media screen and (max-width: 860px) {
    margin-top: 23vh;
  }
  @media screen and (max-width: 376px) {
    margin-top: 38vh;
  }
`;

export const Column1 = styled.div`
  display: grid;
  grid-area: column1;
  border-right: 1px solid #e0e0e0;
  grid-template-areas:
    "piechart";
  height: 27vh;

  @media screen and (max-width: 1600px), screen and (max-height: 900px) {
    height: 35vh;
  }

  @media screen and (max-width: 860px) {
    height: 50vh;
    border-right: none;
  }

  @media screen and (max-width: 376px) {
    border-right: none;
    margin-top: 15vh;
    border-top: 1px solid #e0e0e0;
  }
`;

export const Column2 = styled.div`
  display: grid;
  grid-area: column2;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "gamegraph info";

  @media screen and (max-width: 1369px) {
    grid-template-areas:
      "gamegraph"
      "info";
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 1025px) {
    grid-template-rows: 1fr 1fr;
  }

  @media screen and (max-width: 860px) {
    height: 27vh;
    grid-template-areas:
      "gamegraph info";
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #e0e0e0;
  }
  
  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr 0.5fr;
  }

  @media screen and (max-width: 376px) {
    grid-template-areas:
      "gamegraph"
      "info";
    grid-template-columns: 1fr;
    border-bottom: none;
  }
`;

export const GameGraph = styled.div`
  display: grid;
  grid-area: gamegraph;
  height: 25vh;
  width: 100%;

  @media screen and (max-width: 1369px) {
    height: 20vh;
  }
  
  @media screen and (max-width: 1025px) {
    height: 21vh;
  }

  @media screen and (max-width: 860px) {
    height: 30vh;
  }
  
  @media screen and (max-width: 376px) {
    height: 24vh;
  }
`;

export const Chart2 = styled.div`
  align-items: center;
  justify-items: center;
  padding-top: 10px;
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 860px) {
    height: 80px;
    border-bottom: 1px solid #e0e0e0;
  }
`;

export const InsideColumnFilter = styled.div`
  display: grid;
  grid-area: filters;
  padding-top: 12px;
  grid-template-areas:
    "levelfilter"
    "userfilter";
`;

export const LevelFilter = styled.div`
  display: grid;
  grid-area: levelfilter;
`;

export const UserFilter = styled.div`
  display: grid;
  grid-area: userfilter;
`;

export const GeneralGraph = styled.div`
  display: grid;
  grid-area: piechart;
  grid-template-areas:
    "chart";
`;

export const Info = styled.div`
  display: inline-block;
  grid-area: info;
  padding: 10px;
`;

export const Chart = styled.div`
  display: grid;
  grid-area: chart;
  justify-content: center;
`;

export const Date = styled.div`
  grid-area: date;
`;

export const Title = styled.div`
  grid-area: title;
  border-bottom: 1px solid #e0e0e0;
  font-size: 22px;
  padding: 0px 10px 0px 18px;
  font-weight: bold;
  font-family: "Roboto";
  color: #444446;
`;

export const TitleChart = styled.div`
  font-size: 18px;
  padding: 10px 10px 10px 18px;
  font-weight: bold;
  font-family: "Roboto";
  color: #444446;
  text-align: center;
`;

export const InsideRowChart = styled.div`
  border-top: 1px solid #e0e0e0;
`;

export const TitleFilters = styled.div`
  font-size: 18px;
  padding: 10px 10px 10px 18px;
  font-weight: bold;
  font-family: "Roboto";
  color: #444446;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 860px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
  }

  @media screen and (max-width: 320px) {
    // diminua o tamanho do campo do autocomplete
    width: 120%;
  }
    
`;
