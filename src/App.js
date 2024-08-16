import './App.css';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
//1. 앱이 실행되자마자 현재 기반의 날씨가 보인다
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태
//3. 5개의 버튼이 있다(1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWater]=useState(null);
  //1번
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat=position.coords.latitude;
      let lon=position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    })
  }

  useEffect(()=>{
    getCurrentLocation();
  },[])

  //api
  const getWeatherByCurrentLocation=async(lat,lon)=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=87cf1a8fc2b8458fc1bc4be5c9c458eb&units=metric`
    let response = await fetch(url)
    let data=await response.json();
    setWater(data);
    console.log(data)
  }

  return (
    <div className='container'>
      <WeatherBox weather={weather}/>
      <WeatherButton/>
    </div>
  );
}

export default App;
