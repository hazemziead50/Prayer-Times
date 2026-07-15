// ============================================
// 1. استيراد الموديولات
// ============================================

import { CONFIG, CALCULATION_METHODS } from './modules/config.js';
import { fetchCountries, fetchCities, fetchPrayerTimes, clearCityCache } from './modules/api.js';
import { Utiles } from './modules/utils.js';
import { UI } from './modules/ui.js';

// ============================================
// 2. حالة التطبيق
// ============================================

const state = {
    continent: '',
    country: '',
    city: '',
    method: CONFIG.DEFAULT_METHOD,
    prayers: [],
    nextPrayer: null,
    timerInterval: null
};

// ============================================
// 3. تهيئة التطبيق
// ============================================

function init() { 
    // تهيئة القوائم
    UI.initContinents();

    UI.initMethods(CONFIG.DEFAULT_METHOD);
    
    // ربط الأحداث
    bindEvents();
    
    // استعادة الحالة المحفوظة
    restoreState();
}

// ============================================
// 4. ربط الأحداث
// ============================================

function bindEvents() {
    document.getElementById('continent').addEventListener('change', onContinentChange);
    document.getElementById('country').addEventListener('change', onCountryChange);
    document.getElementById('city').addEventListener('change', onCityChange);
    document.getElementById('method').addEventListener('change', onMethodChange);
    document.getElementById('resetBtn').addEventListener('click', resetApp);
}

// ============================================
// 5. معالجة تغيير القارة
// ============================================

async function onContinentChange(e) {
    const continent = e.target.value;
    
    if (!continent) {
        state.continent = '';
        UI.resetUI();
        saveState();
        return;
    }
    
    state.continent = continent;
    state.country = '';
    state.city = '';
    saveState();
    
    try {
        UI.showLoading('country');
        
        const countries = await fetchCountries(continent);
        
        UI.renderCountries(countries);
        clearPrayerData();
    } catch (error) {
        UI.showError(error.message);
    }
}

// ============================================
// 6. معالجة تغيير الدولة
// ============================================

async function onCountryChange(e) {
    const country = e.target.value;
    
    if (!country) {
        state.country = '';
        saveState();
        return;
    }
    
    state.country = country;
    state.city = '';
    saveState();
    
    try {
        UI.showLoading('city');
        const cities = await fetchCities(country);
        UI.renderCities(cities);
        clearPrayerData();
    } catch (error) {
        UI.showError(error.message);
    }
}

// ============================================
// 7. معالجة تغيير المدينة
// ============================================

async function onCityChange(e) {
    const city = e.target.value;
    
    if (!city) {
        state.city = '';
        saveState();
        return;
    }
    
    state.city = city;
    saveState();
    await fetchAndDisplayPrayers();
}

// ============================================
// 8. معالجة تغيير طريقة الحساب
// ============================================

function onMethodChange(e) {
    state.method = parseInt(e.target.value);
    saveState();
    
    if (state.city) {
        fetchAndDisplayPrayers();
    }
}// ============================================
// 9. جلب وعرض الصلوات
// ============================================

async function fetchAndDisplayPrayers() {
    if (!state.city || !state.country) {
        UI.showError('الرجاء اختيار مدينة ودولة');
        return;
    }
    
    try {
        UI.showInfo('⏳ جاري جلب أوقات الصلاة...');
        
        const prayers = await fetchPrayerTimes(
            state.city,
            state.country,
            state.method
        );
        
        state.prayers = prayers;
        
        // عرض جدول الصلوات
        UI.renderPrayerTable(prayers);
        
        
        // تحديد الصلاة القادمة
        const nextPrayer = Utiles.getNextPrayer(prayers);
        state.nextPrayer = nextPrayer;
        
        if (nextPrayer) {
            UI.renderNextPrayer(nextPrayer);
            startTimer();
        } else {
            UI.showError('لا توجد صلاة قادمة');
        }
        
        UI.showInfo(`✅ تم تحديث الأوقات - ${state.city}`);
        saveState();
        
    } catch (error) {
        UI.showError(error.message);
        clearPrayerData([]);
    }
}

// ============================================
// 10. العداد التنازلي
// ============================================

function startTimer() {
    // إيقاف المؤقت القديم
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    if (!state.nextPrayer) return;
    
    state.timerInterval = setInterval(() => {
        const now = new Date();
        const targetDate = state.nextPrayer.date;
        
        // إذا انتهى الوقت، نجلب أوقات جديدة
        if (now >= targetDate) {
            fetchAndDisplayPrayers();
            return;
        }
        
        // حساب الوقت المتبقي
        const timeRemaining = Utiles.getTimeRemaining(targetDate);
        UI.updateCountdown(timeRemaining);
        
    }, 1000);
}

// ============================================
// 11. مسح بيانات الصلاة
// ============================================

function clearPrayerData() {
    state.prayers = [];
    state.nextPrayer = null;
    
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    UI.renderPrayerTable([]);
    UI.renderNextPrayer(null);
}

// ============================================
// 12. حفظ واسترجاع الحالة
// ============================================

function saveState() {
    const data = {
        continent: state.continent,
        country: state.country,
        city: state.city,
        method: state.method
    };
    Utiles.saveToStorage(CONFIG.STORAGE_KEY, data);
}

function restoreState() {
    const saved = Utiles.loadFromStorage(CONFIG.STORAGE_KEY);
    if (!saved) return;
    
    state.continent = saved.continent || '';
    state.country = saved.country || '';
    state.city = saved.city || '';
    state.method = saved.method || CONFIG.DEFAULT_METHOD;
    
    // استعادة في الواجهة
    if (state.continent) {
        document.getElementById('continent').value = state.continent;
        // نحتاج إلى تحميل الدول والمدن تلقائياً
        restoreCountriesAndCities();
    }
    
    if (state.method) {
        document.getElementById('method').value = state.method;
    }
}

async function restoreCountriesAndCities() {
    try {
        if (state.continent) {
            const countries = await fetchCountries(state.continent);
                UI.renderCountries(countries);
            
            if (state.country) {
                document.getElementById('country').value = state.country;
                const cities = await fetchCities(state.country);
                UI.renderCities(cities);
                
                if (state.city) {
                    
                    document.getElementById('city').value = state.city;
                    await fetchAndDisplayPrayers();
                    
                }
            }
        }
    } catch (error) {
        console.error('فشل في استعادة الحالة:', error);
    }
}

// ============================================
// 13. إعادة تعيين التطبيق
// ============================================

function resetApp() {
    // إيقاف المؤقت
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    // إعادة تعيين الحالة
    state.continent = '';
    state.country = '';
    state.city = '';
    state.prayers = [];
    state.nextPrayer = null;
    state.method = CONFIG.DEFAULT_METHOD;
    
    // إعادة تعيين الواجهة
    UI.resetUI();
    UI.initMethods(CONFIG.DEFAULT_METHOD);
    
    // مسح localStorage
    Utiles.clearStorage(CONFIG.STORAGE_KEY);
    
    // مسح الكاش
    clearCityCache();
    
    UI.showInfo('🔄 تم إعادة تعيين التطبيق');
    
}

// ============================================
// 14. بدء التطبيق
// ============================================

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', init);