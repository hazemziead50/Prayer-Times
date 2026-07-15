import { CONTINENTS, CALCULATION_METHODS, PRAYER_NAMES_AR, PRAY_ICONS , } from './config.js';
import { Utiles } from './utils.js';

const DOM = {
    continent: document.getElementById('continent'),
    country: document.getElementById('country'),
    city: document.getElementById('city'),
    method: document.getElementById('method'),
    resetBtn: document.getElementById('resetBtn'),
    prayerBody: document.getElementById('prayerBody'),
    nextPrayer: document.getElementById('nextPrayer'),
    errorMessage: document.getElementById('errorMessage'),
    infoText: document.getElementById('infoText')
}
export function initContinents() {
    const select = DOM.continent;
    select.innerHTML = '<option value="">-- اختر القارة --</option>';
    
    CONTINENTS.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
    });
}

export function initMethods(defaultMethod = 2) {
    const select = DOM.method;
    select.innerHTML = '';
    
    CALCULATION_METHODS.forEach(m => {
        const option = document.createElement('option');
        option.value = m.id;
        option.textContent = m.name;
        if (m.id === defaultMethod) option.selected = true;
        select.appendChild(option);
    });
}

export function renderCountries(countries) {
    const select = DOM.country;
    select.innerHTML = '<option value="">-- اختر الدولة --</option>';
    select.disabled = false;
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = Utiles.sanitizeText(country);
        option.textContent = Utiles.sanitizeText(country);
        select.appendChild(option);
    });
}


export function renderCities(cities) {
    const select = DOM.city;
    select.innerHTML = '<option value="">-- اختر المدينة --</option>';
    select.disabled = false;
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = Utiles.sanitizeText(city);
        option.textContent = Utiles.sanitizeText(city);
        select.appendChild(option);
    });
}


export function renderPrayerTable(prayers) {
    const tbody = DOM.prayerBody;
    if (!prayers || prayers.length === 0) {
        
        tbody.innerHTML = '<tr><td colspan="2">لا توجد صلوات</td></tr>';
        return;
    }
    
    let html = '';
    prayers.forEach(prayer => {
        const icon = PRAY_ICONS[prayer.name] || '🕌';
        const nameAr = PRAYER_NAMES_AR[prayer.name] || prayer.name;
        const time12 = Utiles.formatTime12(prayer.time);
        
        html += `
            <tr>
                <td>${icon} ${nameAr}</td>
                <td>${time12}</td>
            </tr>
        `;
    })
    
    
    
    tbody.innerHTML = html;
    return 
}

// 5. عرض الصلاة القادمة
// ============================================

export function renderNextPrayer(prayer) {
    const section = DOM.nextPrayer;
    
    if (!prayer) {
        section.innerHTML = '<p>⏳ لا توجد صلاة قادمة</p>';
        return;
    }
    
    const nameAr = PRAYER_NAMES_AR[prayer.name] || prayer.name;
    const icon = PRAY_ICONS[prayer.name] || '🕌';
    const dayLabel = prayer.isTomorrow ? 'غداً' : 'اليوم';
    const time12 = Utiles.formatTime12(prayer.time);
    
    section.innerHTML = `
        <div>
            <div style="font-size:0.9rem; opacity:0.8;">الصلاة القادمة</div>
            <div style="font-size:2rem; font-weight:bold;">${icon} ${nameAr}</div>
            <div style="font-size:1.2rem; margin:10px 0;">🕐 ${time12}</div>
            <div style="font-size:0.9rem; opacity:0.8;">${dayLabel}</div>
            <div class="countdown" style="font-size:2.5rem; font-weight:bold; font-family:monospace; background:rgba(255,255,255,0.2); padding:10px 20px; border-radius:10px; display:inline-block; margin-top:10px;">
                <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
            </div>
        </div>
    `;
}

export function updateCountdown(timeRemaining) {
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    if (!hours || !minutes || !seconds) return;
    
    hours.textContent = String(timeRemaining.hours).padStart(2, '0');
    minutes.textContent = String(timeRemaining.minutes).padStart(2, '0');
    seconds.textContent = String(timeRemaining.seconds).padStart(2, '0');
}

// ============================================
// 6. إدارة الأخطاء والمعلومات
// ============================================

export function showError(message) {
    const el = DOM.errorMessage;
    el.textContent = `⚠️ ${message}`;
    el.style.display = 'block';
    
    setTimeout(() => hideError(), 8000);
}

export function hideError() {
    DOM.errorMessage.style.display = 'none';
}

export function showInfo(message) {
    DOM.infoText.textContent = message;
}

// ============================================
// 7. إعادة تعيين
// ============================================

export function resetUI() {
    DOM.continent.value = '';
    DOM.country.innerHTML = '<option value="">-- اختر الدولة --</option>';
    DOM.country.disabled = true;
    DOM.city.innerHTML = '<option value="">-- اختر المدينة --</option>';
    DOM.city.disabled = true;
    DOM.prayerBody.innerHTML = '';//
    DOM.nextPrayer.innerHTML = '';//
    hideError();
    setTimeout(()=>{
       showInfo('اختر قارة، دولة، ثم مدينة'); 
    },2000)
    
    
}

export function showLoading(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.disabled = true;
    select.innerHTML = '<option value="">⏳ جاري التحميل...</option>';
}

// ============================================
// 8. دوال مساعدة
// ============================================

export function getSelectValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

export function setSelectValue(id, value) {
    const el = document.getElementById(id);
    if (!el) return false;
    el.value = value;
    return true;
}

// تصدير جميع الدوال
export const UI = {
    initContinents,
    initMethods,
    renderCountries,
    renderCities,
    renderPrayerTable,
    renderNextPrayer,
    updateCountdown,
    showError,
    hideError,
    showInfo,
    resetUI,
    showLoading,
    getSelectValue,
    setSelectValue
};
