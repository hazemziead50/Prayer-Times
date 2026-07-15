import { CONFIG } from "./config.js"
export const Utiles = {
    //تنسيق الوقت من صيغة 24 ساعة إلى صيغة 12 ساعة
formatTime12:(timeStr)=>{
    if(!timeStr) return '--:--'
    const [hours,minutes] = timeStr.split(':')  // السبليت تبحث على النقطتين في النص وتفصل النص عندهما
    const hour = parseInt(hours)
    const ampm = hour >= 12 ?'pm':'am'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm.toUpperCase()}`
},
//حساب الوقت المتبقي لصلاة 
getTimeRemaining:(targetTime)=>{
    const nowTime = new Date()
    const difr = targetTime.getTime() - nowTime.getTime()

    if(difr <= 0) {
        return{
            hours: 0,
            minutes: 0,
            seconds: 0,
            isPast: true
        }
    }
    const hours = Math.floor(difr / 3600000) //
    const minutes = Math.floor((difr %3600000) / 60000)
    const seconds = Math.floor((difr % 60000) / 1000)

    return {
        hours,
        minutes,
        seconds,
        isPast: false
    }
}
,
// الصلاة القادمة 
getNextPrayer:(prayers)=>{
    // التحقق من وجود البيانات
    if(!prayers || prayers.length === 0){
        console.warn(' لا توجد صلوات ');
        return null;
    }
    // التحقق من صحة البيانات
    const validPrayers = prayers.filter(prayer => {
        return prayer&& prayer.name && prayer.time
    })
   

    if(validPrayers.length===0){
        console.log('لا توجد صلوات')
    }
   
    const now = new Date()
    // انشاء بداية اليوم 
    const today = new Date(now)
    today.setHours(0,0,0,0)

    //تحويل وقت الصلاة لكائنات
    const prayersWithDate =validPrayers.map(prayer =>{
        const [hours,minuts] = prayer.time.split(':').map(Number)

            if (isNaN(hours) || isNaN(minuts)) {
                    console.warn(`⚠️ وقت غير صحيح: ${prayer.time} للصلاة ${prayer.name}`);
                    return null;
                }
            //انشاء كائن لليوم 
            const date = new Date(today)
            date.setHours(hours,minuts,0,0)

        return{
            ...prayer ,
            date:date // خاصية جديدة الوقت ومعها قسمتها 
        }
    }) 
    //ترتيب الصلوات حسب الوقت ا
        prayersWithDate.sort((a,b) => a.date -b.date)
    
        //الصلاة التالية 
        let nextprayer = null
        for( const prayer of prayersWithDate){
            if(prayer.date > now){
                nextprayer = {
                    ...prayer,
                    isTomorrow : false
                }
                break;
            }
        }
        // في حال كل الصلوات مضت
        if(!nextprayer){
            const firstPrayer = prayersWithDate[0]
            const tomorrow = new Date(firstPrayer)
            tomorrow.setDate(tomorrow.getDate()+1)

            nextprayer = {
            ...firstPrayer,
            date: tomorrow,
            isTomorrow: true
        }
        }
        const timeRemaining = nextprayer.date - now

        function getTimeRemainingText(timeRemaining) {
    if (timeRemaining <= 0) return 'الآن';
    
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    
    const parts = [];
    if (hours > 0) parts.push(`${hours} ساعة`);
    if (minutes > 0) parts.push(`${minutes} دقيقة`);
    if (seconds > 0 && hours === 0) parts.push(`${seconds} ثانية`);
    
    return parts.join(' و ') || '0 ثانية';
}
    
    

        return{
            ...nextprayer,
            timeRemaining:{
                total:timeRemaining,
                hours:Math.floor(timeRemaining/3600000),
                minutes:Math.floor((timeRemaining % 3600000)/60000),
                seconds:Math.floor((timeRemaining%60000)/1000)
            },

            timeRemainingText:getTimeRemainingText(timeRemaining)
            

        }

    },
saveToStorage:(key,data)=>{
        try{
            localStorage.setItem(CONFIG.STORAGE_KEY,JSON.stringify(data))
            return true
        }catch(error){
            console.log(`فشل في حفظ البيانات`);
            return false
        }
    },
loadFromStorage:(key)=>{
    try {
        const data  = localStorage.getItem(CONFIG.STORAGE_KEY)
        return data ? JSON.parse(data): null
    } catch (error) {
        console.error('فشل في الاسترجاع:', error);
        return null;
    }
}  ,
clearStorage:(key)=>{
    try{
    localStorage.removeItem(CONFIG.STORAGE_KEY)
    return true
    }catch(error){
    console.error('فشل في المسح:', error);
        return false
    }
} ,
isValidTime:(timeStr) =>{

    if (!timeStr){
        return false
    }else {
        return timeStr
    };
},
delay:(ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms))
    
},
sanitizeText:(text)=>{
        if (!text) return '';
        const div = document.createElement('div');

        div.textContent = text;
        return div.innerHTML;
}
    
}

    





