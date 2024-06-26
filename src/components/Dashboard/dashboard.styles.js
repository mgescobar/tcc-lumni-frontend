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

  @media screen and (max-width: 860px) {
    grid-template-areas:
      "column2"
      "column1";
  }
`;

export const ContainerRowChildrens = styled.div`
  @media screen and (max-width: 860px) {
    grid-template-areas:
      "column2"
      "column1";
  }
`;

export const Column1 = styled.div`
  display: grid;
  grid-area: column1;
  border-right: 1px solid #e0e0e0;
  grid-template-areas:
    "filters"
    "piechart";
  padding: 10px;  // Added padding for better spacing
`;

export const Column2 = styled.div`
  display: grid;
  grid-area: column2;
  grid-template-areas:
    "gamegraph"
    "chart2";
`;

export const GameGraph = styled.div`
  display: grid;
  grid-area: gamegraph;
  align-items: left;
  justify-items: left;
  height: 190px;
  @media screen and (max-width: 860px) {
    height: 150px;
  }
`;

export const Chart2 = styled.div`
  align-items: center;
  justify-items: center;
  padding-top: 10px;
  margin-left: 20px;
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

export const InsideColumnChart = styled.div`
  display: grid;
  grid-area: piechart;
  grid-template-areas:
    "filter filter"
    "chart info";
  align-items: center;  // Center align the content
  justify-items: center;  // Center align the content
`;

export const Info = styled.div`
  display: grid;
  grid-area: info;
  width: 100%;  // Adjusted to take full width
  padding: 10px;
  text-align: center;  // Center align the text
`;

export const Chart = styled.div`
  display: grid;
  grid-area: chart;
  justify-content: center;  // Center align the chart
  width: 100%;  // Adjusted to take full width
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
`;
