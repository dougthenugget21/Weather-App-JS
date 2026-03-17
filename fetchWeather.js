import fs from 'fs'   // File System, allow us to write and read from files we create
import path from 'path'  // Helps build a File Path between files
import dotenv from 'dotenv' //Package to allow us to read our dotenv file
import { pathToFileURL } from "url" 

dotenv.config()

const DATA_DIR = path.join(import.meta.dirname, 'data') //This creates the folder 'data' so that it's a more automated process
if(!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR)
} 

const WEATHER_FILE = path.join(DATA_DIR, 'weather.json')  //This automatically creates the file weather.json
const LOG_FILE = path.join(DATA_DIR, 'weather_log.csv')  //This automatically creates the file weather_log

export async function fetchWeather() {
    const apiKey = process.env.WEATHER_API_KEY
    const city = process.env.CITY || 'London'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const customLabel = "North Sentinel Island";
    city.apiKey = customLabel;


    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`)
        }

        const data = await response.json()
        const nowUTC = new Date().toISOString()
        data._last_updated_utc = nowUTC //This is taking info, and updating it from the weather.json file (in the data folder)
        fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2))

        const header = 'timestamp,city,temperature,description\n' //No spaces for headers as it's the standard layout for CSV files 
        if (!fs.existsSync(LOG_FILE)) {
            fs.writeFileSync(LOG_FILE, header)
        } else {
            const firtLine = fs.readFileSync(LOG_FILE, 'utf8').split('\n')[0]
            if (firtLine !== 'timestamp,city,temperature,description') {
                fs.writeFileSync(LOG_FILE, header + fs.readFileSync(LOG_FILE, 'utf8'))
            }
        }

        const logEntry = `${nowUTC},${city},${data.main.temp},${data.weather[0].description}\n`
        fs.appendFileSync(LOG_FILE, logEntry)
        console.log(`Weather Data Updated for ${city} at ${nowUTC}`)
    }

    catch(err) {
        console.log('Error Fetching Weather:', err)
    }
}


if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    fetchWeather();  //Workaround for Windows 
}
