import React, { useState } from 'react'

const Weather = () => {
    
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("")

    const apiKey = "da7551408932508b1360afe0d76642d0";

    const handleData = async()=>{
        try {
            
            setError("");
            const response= await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
           
            if(!response.ok)throw new Error("City Not Found");
            
            const data = await response.json();
            setWeather(data);

        } catch (error) {
            setError(error.message);
            setWeather(null);
        }
    }
    console.log(weather);
    
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
        
        <div className='w-full max-w-md bg-black opacity-75 backdrop-blur-lg rounded-3xl shadow-2xl text-white p-6'>
            <h1 className='text-5xl font-semibold text-center mb-6'>
                Weather App
            </h1>
            <div className='flex flex-col gap-5'>
                <input type="text"
                 placeholder='Enter City Name...'
                 value={city}
                 onChange={(e)=> setCity(e.target.value)}
                 className='p-3 rounded-xl text-black focus:outline-none bg-white' 
                 />
                <button className='bg-white text-red-500 font-semibold py-2 rounded-xl hover:bg-green-500
                hover:text-white hover:cursor-pointer'
                onClick={handleData}>Search Weather</button>
            </div>

            {error && <p className='text-red-500 mt-4 text-center' >{error}</p>}

            {
                weather &&  <div className='text-center'>
                <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt="cloud image" 
                className='mx-auto h-32 w-32 object-contain mb-4' />
                <h2 className='text-3xl font-bold'>{weather.name} / {weather.sys.country}</h2>
                <p className='text-xl capitalize'>{weather.weather[0].description}</p>
                <p className='text-5xl font-extrabold mt-2'> {weather.main.temp}°C</p>

                <div className='grid grid-cols-3 gap-2 mt-4 text-sm text-white'>
                    <div className='bg-white opacity-90 rounded-xl p-2 text-black'>
                        <p className='font-semibold' >Humidity</p>
                        <p>{weather.main.humidity} %</p>
                    </div>
                    <div className='bg-white opacity-90 rounded-xl p-2 text-black'>
                        <p className='font-semibold' >Wind</p>
                        <p>{weather.wind.speed} m/s</p>
                    </div>
                    <div className='bg-white opacity-90 rounded-xl p-2 text-black'>
                        <p className='font-semibold' >Clouds</p>
                        <p>{weather.clouds.all} %</p>
                    </div>
                </div>
            </div>
            }

        </div>
    </div>
  )
}

export default Weather