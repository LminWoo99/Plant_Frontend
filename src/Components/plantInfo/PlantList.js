import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import "../../css/PlantList.css";
function PlantList() {
  const [plants, setPlants] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [pageable, setPageable] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    loadPlants();
  }, [pageable]);

  const loadPlants = () => {
    axios
      .get(`http://localhost:8080/api/plantList?search=${searchVal}&page=${pageable-1}`)
      .then((response) => {
        setPlants(response.data.content);
        setTotalCnt(response.data.totalElements);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    
  };

  const handleSearchSubmit = () => {
    setPageable(1);
    loadPlants();
  };

  const handlePageChange = (pageNumber) => {
    setPageable(pageNumber);
  };

  return (
    <Container>
      <h1>식물 목록</h1>
      <SearchWrapper>
        <SearchInput
         className="search__input"
         id="search__input"
          type="text"
          placeholder="식물 이름을 검색해 주세요"
          value={searchVal}
          onChange={handleSearchChange}
        />
        <SearchButton onClick={handleSearchSubmit}>검색</SearchButton>
      </SearchWrapper>
      <PlantGrid>
        {plants.map((plant) => (
          <div>
          <PlantCard key={plant.id}>
            <Link to={{ pathname: `/plantdetail/${plant.id}` }}>
              <PlantImage src={plant.thumbFile} alt="식물 이미지" />
            </Link>
            
            {/* 다른 필드 출력 */}
          </PlantCard>
          <PlantName>{plant.plantName}</PlantName>
          </div>
        ))}
      </PlantGrid>
      <PaginationWrapper>
        <Pagination
          activePage={pageable}
          itemsCountPerPage={9}
          totalItemsCount={totalCnt}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </PaginationWrapper>
    </Container>
  );
}

export default PlantList;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const SearchWrapper = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

const PlantCard = styled.div`
  border: 1px solid transparent; /* 테두리를 투명으로 설정 */
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  
`;

const PlantImage = styled.img`
width: 60%; 
height: auto;
object-fit: cover; 
border-radius: 20px; 
border: 1px solid rgba(0, 0, 0, 0.1); 
`;

const PlantName = styled.h2`
  margin: 10px 0;
  font-size: 18px; /* 폰트 크기 변경 */
  color: black; /* 글자 색상 변경 */
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
`;
