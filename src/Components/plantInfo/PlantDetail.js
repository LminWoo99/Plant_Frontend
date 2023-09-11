import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import myImage from './스크린샷 2023-09-04 오후 6.41.40.png';
function PlantDetail() {
  const [plantDto, setPlantDto] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPlantDetail() {
      try {
        const response = await axios.get(`http://localhost:8080/api/plantList/${id}`);
        setPlantDto(response.data);
      } catch (error) {
        console.error("[PlantDetail.js] fetchPlantDetail() error:", error);
      }
    }

    fetchPlantDetail();
  }, [id]);

  const renderField = (label, value) => {
    return (
      value && (
        <PlantInfoItem key={label}>
          <Title>{label}</Title>
          <Value>{value}</Value>
        </PlantInfoItem>
      )
    );
  };

  return (
    <div>
    <Container>
      <PlantImage src={plantDto.image} alt="식물 이미지" />
      <PlantInfo>
        <PlantName>{plantDto.plantName}</PlantName>
        <ul style={{ display: "flex", listStyle: "none" }}>
  <li style={{ marginRight: "10px" }}>
    <PlantTags>{plantDto.manage}</PlantTags>
  </li>
  <li>
    <PlantTags>{plantDto.category}</PlantTags>
  </li>
</ul>
        <PlantSpecial>{plantDto.special}</PlantSpecial>
        <InfoTable>
          <tbody>
          <PlantInfoContainer>
            
          
          <CrossLayout>
            {renderField("팁", plantDto.plantInfo)}
            {renderField("높이", plantDto.height && `${plantDto.height}cm`)}
            {renderField("번식시기", plantDto.breed)}
            {renderField("기르는 난이도", plantDto.manage)}
            {renderField("생장속도", plantDto.growthRate)}
            {renderField("잘 자라는 온도", plantDto.growthTmp)}
            {renderField("비료", plantDto.fertilizer)}
            {renderField("습도", plantDto.humidity)}
            {renderField("광", plantDto.light)}
            {renderField("발화계절", plantDto.season)}
            </CrossLayout>
            </PlantInfoContainer>
          </tbody>
        </InfoTable>
      </PlantInfo>
    </Container>
    <AdditionalInfoContainer>
      <SectionTitle>계절별 물주는 방법</SectionTitle>
      <SubTitle>자세히 알아보기</SubTitle>
      <SeasonalWateringInfo>
     
        <SeasonInfo>
        
          <SeasonName>봄</SeasonName>
          <SeasonDescription>
            {plantDto.plantSpring}
          </SeasonDescription>
        </SeasonInfo>
        <SeasonInfo>
          <SeasonName>여름</SeasonName>
          <SeasonDescription>
          {plantDto.plantSummner}
          </SeasonDescription>
        </SeasonInfo>
        <SeasonInfo>
          <SeasonName>가을</SeasonName>
          
          <SeasonDescription>
          {plantDto.plantAutumn}  
          </SeasonDescription>
        </SeasonInfo>
        <SeasonInfo>
          <SeasonName>겨울</SeasonName>
          <SeasonDescription>
          {plantDto.plantWinter}
          </SeasonDescription>
          
        </SeasonInfo>
        
      </SeasonalWateringInfo>
    </AdditionalInfoContainer>
    </div>
  );
}

export default PlantDetail;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

const PlantImage = styled.img`
  max-width: 50%;
  height: 100%;
  margin-right: 50px;
`;

const PlantInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
`;

const PlantName = styled.h2`
  font-size: 40px;
  margin-bottom: 10px;
  color: #000;
`;
const PlantSpecial = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  color: #000;
`;

const InfoTable = styled.table`
  width: 120%;
  
  
`;
const PlantInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border:1px solid #ccc;
  justify-content: space-between;
`;
const CrossLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  
`;

const PlantInfoItem = styled.div`
  flex-basis: calc(50% - 20px);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Title = styled.div`
  width: 90%;
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const Value = styled.div`
  width: 90%
  `;
  const AdditionalInfoContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #000;
  text-align: center;
  margin-bottom: 10px;
  padding-top:20px;
  border-top: 1px solid #ccc;
`;

const SubTitle = styled.h3`
  font-size: 30px;
  color: #04B486;
  text-align: center;
  
`;


const SeasonalWateringInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border-collapse: collapse;
  
`;
const PlantTags = styled.div`
font-size: 20px; /* 글자 크기 설정 */
margin-bottom: 10px;
color: #000;
background-color: rgba(169, 169, 169, 0.5); /* 투명 회색 배경색 설정 */
padding: 5px; /* 패딩 설정 */
border-radius: 5px;

`;


const SeasonInfo = styled.div`
  flex-basis: calc(50% - 20px);
`;

const SeasonName = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`;

const SeasonDescription = styled.p`
  font-size: 16px;
  color: #000;
`;

