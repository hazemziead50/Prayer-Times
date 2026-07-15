import {API, CONFIG, ERROR_MESSAGES,API_KEY ,PRAY_NAMES} from './config.js';
import { Utiles } from './utils.js';

const cityCache = new Map();

//1. احضار الدول 
export async function fetchCountries(continent){
    try {
        const url =API.COUNTRIES.replace('{continent}',continent)
        
        
        let response = await fetch(url,{
            headers: { 'Authorization': `Bearer ${API_KEY}`  }
        })

        if(!response.ok){
            throw new Error(`Http${response.status}`)
        }
        
        const data = await response.json()
        
        const countries =  data.data.objects
        .map(country => country.names?.common || '')
        .filter(name => name)
        .sort((a,b) =>a.localeCompare(b))

        if (countries.length === 0) {
            throw new Error("لا توجد دول ");
        }
        return countries

        } catch (error) {
        console.error('خطأ في جلب الدول:', error);
        throw new Error('فشل في جلب الدول');
    }
}
    //2. جلب المدن 
export async function fetchCities(country){
        if(cityCache.has(country)){
            const cached = cityCache.get(country);
            if(Date.now() - cached.timestamp < CONFIG.CACHE_DURATION){
                return cached.data;
            }
            cityCache.delete(country);
        }
        try {
            const response = await fetch(API.CITIES,{
                method:'Post',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({country})
            })
            
                if(!response.ok){
                throw new Error(`Http${response.status}`)
                }

                const result = await response.json()
                if(result.error){
                    throw new Error(result.msg || 'فشل في جلب المدن')
                }
                const cities = result.data 
                .filter(city => city && typeof city === 'string')
                .sort((a,b)=> a.localeCompare (b))

                cityCache.set(country,{
                    data: cities,
                    timestamp: Date.now()}
                )
                return cities;
                
        }catch (error) {
            console.error('خطأ في جلب المدن:', error);
            throw new Error('فشل في جلب المدن');
        }

}
    // جلب أوقات الصلاة 
export async function fetchPrayerTimes(city,country,method){
try {
    if(!city||!country){
        throw new Error('الرجاء اختيار مدينة ودولة');
    }
    const params = new URLSearchParams({
        city: city,
        country: country,
        method: method || CONFIG.DEFAULT_METHOD
    });
    const url =  `${API.PRAYER}?${params}`
    const response = await fetch(url)
    if(!response.ok){
        if (response.status === 404) {
            throw new Error('المدينة غير موجودة');
        }
        throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json()

    if (data.code !== 200) {
            throw new Error(data.status || 'فشل في جلب الأوقات');
        }

        
        const timings = data.data?.timings
        if (!timings) {
            throw new Error('لا توجد أوقات');
        }

        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        const filterdTim =prayerNames.reduce((acc,prayer)=>{
            if(timings?.[prayer]) {
                acc[prayer] = timings[prayer]
            }
            return acc
        },{})
        
        const prayers = [];
    for(const name of prayerNames){
        const time=filterdTim[name]
        if(time && Utiles.isValidTime(time)){
            prayers.push({
                name:name,
                time: time.substring(0, 5)
            })
        }
    }
    
    if (prayers.length === 0) {
            throw new Error('لا توجد أوقات صالحة');
        }
        return prayers

} catch (error) {
    console.error('خطأ في جلب الأوقات:', error)
        throw error
}
}
export function clearCityCache() {
    cityCache.clear();
    
}
