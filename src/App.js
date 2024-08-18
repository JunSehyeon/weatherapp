import './App.css';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import Spinner from 'react-bootstrap/Spinner';
//1. 앱이 실행되자마자 현재 기반의 날씨가 보인다
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태
//3. 5개의 버튼이 있다(1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather]=useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 기본값을 true로 설정
  const [selectedCity, setSelectedCity] = useState(''); // 선택된 도시 상태 추가
  const cities=['london','paris','edinburgh','weymouth']
  
  // 현재 위치의 날씨 정보를 가져오는 함수
  const getCurrentLocation=()=>{
    setSelectedCity(''); // 현재 위치를 선택한 경우 selectedCity 초기화
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat=position.coords.latitude;
      let lon=position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    })
  }

  useEffect(()=>{
    getCurrentLocation();// 앱이 실행될 때 현재 위치의 날씨를 가져옴
  },[])

  //api 특정 위치(위도, 경도)의 날씨 정보를 가져오는 함수
  const getWeatherByCurrentLocation=async(lat,lon)=>{
    setLoading(true); // 로딩 시작
    try{
    let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=87cf1a8fc2b8458fc1bc4be5c9c458eb&units=metric`
    let response = await fetch(url)
    let data=await response.json();
    setWeather(data);
    }catch(error){
      console.error("Failed to fetch weather data", error);
    } finally{
      setLoading(false); // 로딩 종료
    }
  }

  // 도시 이름으로 날씨 정보를 가져오는 함수
  const getWeatherByCity = async (city) => {
    setLoading(true); // 로딩 시작
    try{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87cf1a8fc2b8458fc1bc4be5c9c458eb&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
      setSelectedCity(city); // 선택된 도시 업데이트
    } catch(error){
      console.error("Failed to fetch weather data", error);
    } finally{
      setLoading(false); // 로딩 종료
    }
  };

  const handleCityClick = (city) => {
    getWeatherByCity(city); // 선택된 도시의 날씨 정보를 가져옴
  };

  const handleCurrentLocationClick = () => {
    getCurrentLocation(); // 현재 위치의 날씨 정보를 가져옴
  };

  return (
    <div className='container'>
      {loading ? ( // 로딩 중일 때 스피너 표시
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
      <WeatherBox weather={weather}/>
      )}
      <WeatherButton cities={cities} selectedCity={selectedCity} onCityClick={handleCityClick} 
        onCurrentLocationClick={handleCurrentLocationClick}/>
    </div>
  );
}

export default App;
