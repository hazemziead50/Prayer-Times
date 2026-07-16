# 🕋 تطبيق مواقيت الصلاة التفاعلي المتكامل (Prayer Times App)

تطبيق ويب تفاعلي وبسيط يتيح للمستخدمين معرفة مواقيت الصلوات الخمس بدقة في أي مكان حول العالم بمجرد اختيار القارة، الدولة، ثم المدينة. يتميز التطبيق بحساب وتحديد الصلاة القادمة تلقائياً وعرض عداد تنازلي (Timer) ينبض لحظياً كل ثانية للوقت المتبقي للأذان التالي.

تم بناء وتطوير هذا المشروع باستخدام أسلوب **Vibe Coding** الحديث، مع التركيز العالي على جودة وتنسيق الكود، وعمل فحص دقيق (Debugging) وتصحيح لكافة الأخطاء لضمان تجربة مستخدم سلسة وخالية من المشاكل.

[🌍 عرض الموقع مباشر (Live Demo)]() | [📂 معرض أعمالي (Portfolio)]()

---

## ✨ المميزات الرئيسية (Key Features)

* 🌍 **تحديد جغرافي دقيق وديناميكي:** نظام مرن يعتمد على جلب القارات، الدول، والمدن مباشرة عبر الـ APIs وتحديث القوائم المنسدلة بالتسلسل.
* ⏳ **عداد تنازلي لحظي (Countdown Timer):** مؤقت ذكي يُحدث كل ثانية ليظهر الوقت المتبقي بدقة للصلاة القادمة.
* 🔔 **تحديد ذكي للصلاة القادمة:** يقوم التطبيق بمقارنة الوقت الحالي بمواعيد الصلوات الخمس لتحديد الصلاة التالية وتوجيه المؤقت إليها مباشرة.
* 🧼 **كود نظيف وخالٍ من الأخطاء:** تم عمل Debugging شامل ومراجعة واختبار دقيق للأكواد لضمان عملها بأعلى كفاءة.
* 📱 **تصميم متجاوب بالكامل (Responsive Design):** واجهة مستخدم مريحة ومناسبة لجميع الشاشات (الهواتف، الأجهزة اللوحية، والحواسيب).

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

تم بناء المشروع بأحدث معايير تطوير الواجهات الأمامية لضمان الكفاءة وقابلية التوسع:

* **HTML5 & CSS3:** لبناء الهيكل وتصميم واجهة مستخدم عصرية، مريحة للعين، ومتجاوبة.
* **JavaScript (ES6+ Features):** للعمليات الحسابية الخاصة بالوقت، التعامل مع الـ DOM، واستخدام الميزات المتقدمة لـ ES6.
* **ES6 Modules (نظام الموديلز):** لتقسيم منطق المشروع ومكوناته إلى ملفات منفصلة ومنظمة مما يعزز من نظافة الكود (Clean Code).
* **Rest APIs:** استدعاء واجهات برمجية خارجية لجلب قائمة الدول، قائمة المدن التابعة لها، ومواقيت الصلاة لكل مدينة بدقة.
* **FontAwesome:** لإضافة الأيقونات التفاعلية التي تضفي لمسة جمالية وعصرية على واجهة التطبيق.
* **Vibe Coding Methodology:** استخدام وتوجيه تقنيات الذكاء الاصطناعي بشكل ذكي ومكثف لتسريع عملية البناء والتطوير والتركيز على الفكرة الأساسية والتجربة الإبداعية.

---

## 📂 هيكل المشروع (Project Structure)

يعتمد تنظيم الملفات على نظام الـ **Modules** لتسهيل الصيانة والتطوير المستقبلي:

```text
├── index.html
├── style.css
├── .gitignore
├── package.json
├── package-lock.json
└── js/
    ├── app.js               # ملف المدخل الرئيسي (Main Entry Point) لربط الموديلات
    ├── lib/
    │   └── fontawesome.js   # مكتبة الأيقونات لتنسيق الواجهة
    └── modules/
        ├── api.js           # التعامل مع استدعاءات الـ APIs (الدول، المدن، ومواقيت الصلاة)
        ├── config.js        # الثوابت والإعدادات العامة للمشروع
        ├── ui.js            # لتحديث عناصر الواجهة (DOM) وعرض البيانات والعداد التنازلي
        └── utils.js         # دوال مساعدة لحساب الوقت والتنسيق الجغرافي
   
   
   =====================================================================================

   # 🕋 Interactive Prayer Times App

A simple and interactive web application that allows users to find accurate times for the five daily prayers anywhere in the world by selecting the continent, country, and then city. The app features automatic calculation of the upcoming prayer and displays a countdown timer that updates every second to show the remaining time for the next Adhan.

This project was built and developed using the modern **Vibe Coding** approach, with a high emphasis on code quality, formatting, thorough debugging, and error fixing to ensure a smooth and bug-free user experience.

[🌍 Live Demo]() | [📂 My Portfolio]()

---

## ✨ Key Features

* 🌍 **Accurate & Dynamic Geolocation:** A flexible system that fetches continents, countries, and cities directly via APIs, dynamically updating the dropdown menus sequentially.
* ⏳ **Real-Time Countdown Timer:** A smart timer that updates every second to show the exact time remaining for the next prayer.
* 🔔 **Smart Upcoming Prayer Detection:** The app compares the current time with the five prayer times to automatically determine the next prayer and direct the countdown timer towards it.
* 🧼 **Clean & Bug-Free Code:** Extensive debugging, review, and rigorous testing were conducted to ensure the code runs at peak performance.
* 📱 **Fully Responsive Design:** A user-friendly and comfortable interface designed to fit all screen sizes (mobiles, tablets, and desktops).

---

## 🛠️ Tech Stack

The project was built using the latest front-end development standards to ensure efficiency and scalability:

* **HTML5 & CSS3:** For building the structure and designing a modern, eye-friendly, and responsive user interface.
* **JavaScript (ES6+ Features):** For time-related calculations, DOM manipulation, and leveraging advanced ES6 features.
* **ES6 Modules:** To split the project logic into separate, organized files, promoting the principles of "Clean Code."
* **REST APIs:** Fetching external APIs to retrieve the list of countries, their cities, and precise prayer times for each city.
* **FontAwesome:** For adding interactive icons that bring a modern aesthetic to the app's interface.
* **Vibe Coding Methodology:** Utilizing and directing AI assistance in a smart, high-velocity way to speed up development and focus on creative core concepts.

---

## 📂 Project Structure

File organization relies on **ES6 Modules** to facilitate future maintenance and scalability:

```text
├── index.html
├── style.css
├── .gitignore
├── package.json
├── package-lock.json
└── js/
    ├── app.js               # Main Entry Point to initialize and connect modules
    ├── lib/
    │   └── fontawesome.js   # Icon library for UI styling
    └── modules/
        ├── api.js           # Handles API calls (countries, cities, and prayer times)
        ├── config.js        # Global constants and project configuration
        ├── ui.js            # Updates DOM elements, displays data, and runs the countdown
        └── utils.js         # Helper functions for time calculations and geographic formatting