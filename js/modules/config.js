// القارات 
export const CONTINENTS = [
    { id: 'africa', name: 'أفريقيا', icon: '🌍' },
    { id: 'americas', name: 'الأمريكتين', icon: '🌎' },
    { id: 'asia', name: 'آسيا', icon: '🌏' },
    { id: 'europe', name: 'أوروبا', icon: '🌍' },
    { id: 'oceania', name: 'أوقيانوسيا', icon: '🌏' }
];

// طرق الحساب المدعومة (حسب وثائق Aladhan)
export const CALCULATION_METHODS = [
    { id: 1, name: 'جامعة أم القرى' },
    { id: 2, name: 'رابطة العالم الإسلامي' },
    { id: 3, name: 'المجمع الفقهي' },
    { id: 4, name: 'اتحاد إسلامي أمريكا الشمالية' },
    { id: 5, name: 'مصر' },
    { id: 7, name: 'الكويت' },
    { id: 8, name: 'تونس' },
    { id: 9, name: 'إيران' },
    { id: 10, name: 'الإمارات' }
];

//أسماء الصلوات 
export const PRAY_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

// أيقونات الصلوات
export const PRAY_ICONS = {
    'Fajr': '🌅',
    'Dhuhr': '☀️',
    'Asr': '🌤️',
    'Maghrib': '🌇',
    'Isha': '🌙'
};
// أسماء الصلوات بالعربية
export const PRAYER_NAMES_AR = {
    'Fajr': 'الفجر',
    'Dhuhr': 'الظهر',
    'Asr': 'العصر',
    'Maghrib': 'المغرب',
    'Isha': 'العشاء'
}
// روابط الapi
export const API = {
    //
    //
    PRAYER: 'https://api.aladhan.com/v1/timingsByCity',
    COUNTRIES: 'https://api.restcountries.com/countries/v5?region={continent}&limit=5',
    CITIES: 'https://countriesnow.space/api/v0.1/countries/cities'
}
export const API_KEY = "rc_live_f8867fba850d411faa854a1736fc8bac";

export const CONFIG = {
    DEFAULT_METHOD: 2, // رابطة العالم الإسلامي 
    STORAGE_KEY: 'prayerAppData',
    CACHE_DURATION: 3600000, // ساعة واحدة (بالميلي ثانية)
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000
};
// رسائل الخطاء 
export const ERROR_MESSAGES = {
    NETWORK: 'فشل الاتصال بالإنترنت، يرجى التحقق من اتصالك',
    NOT_FOUND: 'المدينة غير موجودة، يرجى اختيار مدينة أخرى',
    API_ERROR: 'حدث خطأ في الخادم، يرجى المحاولة مرة أخرى',
    INVALID_CITY: 'الرجاء اختيار مدينة صحيحة',
    INVALID_COUNTRY: 'الرجاء اختيار دولة صحيحة',
    NO_DATA: 'لا توجد بيانات متاحة',
    GENERIC: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى'
};
