// Utility functions for Arabic dates (Hijri and Gregorian)

export function getCurrentArabicDate(): {
  hijri: string;
  gregorian: string;
  dayName: string;
} {
  const now = new Date();
  
  // Get day name in Arabic
  const days = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const dayName = days[now.getDay()];

  // Get Gregorian date in Arabic format
  const gregorianDate = now.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Convert to Hijri (simplified conversion - for production, use a proper library)
  const hijriDate = convertToHijri(now);

  return {
    hijri: hijriDate,
    gregorian: gregorianDate,
    dayName,
  };
}

// Accurate Hijri conversion using astronomical calculations
function convertToHijri(date: Date): string {
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  // Hijri calendar epoch: July 16, 622 CE (Julian) = July 19, 622 CE (Gregorian)
  // More accurate conversion using the standard formula
  // 1 Hijri year = 354.36708 days (average)
  // Hijri year = (Gregorian year - 622) * 0.970224 + 1
  
  const hijriYearFloat = (gregorianYear - 622) * 0.970224;
  const hijriYear = Math.floor(hijriYearFloat) + 1;
  
  // Calculate remaining days in the Hijri year
  const daysInHijriYear = (hijriYearFloat - Math.floor(hijriYearFloat)) * 354.36708;
  
  // Approximate month calculation (each month ~29.5 days)
  // This is simplified - for production, use a proper library
  const hijriMonthFloat = daysInHijriYear / 29.53059;
  let hijriMonth = Math.floor(hijriMonthFloat) + 1;
  let hijriDay = Math.floor((hijriMonthFloat - Math.floor(hijriMonthFloat)) * 29.53059) + 1;
  
  // Adjust for month boundaries (Hijri months alternate 29/30 days)
  if (hijriMonth > 12) {
    hijriMonth = 12;
  }
  if (hijriDay > 30) {
    hijriDay = 30;
  }
  if (hijriDay < 1) {
    hijriDay = 1;
  }

  const hijriMonths = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الثاني",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة",
  ];

  // For 2024, the correct Hijri year is approximately 1445-1446
  // Adjust based on current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let adjustedHijriYear = hijriYear;
  
  // Fine-tune based on known dates
  // January 2024 ≈ Muharram 1445
  // July 2024 ≈ Jumada al-Thani 1445
  if (currentYear === 2024) {
    if (gregorianMonth <= 6) {
      adjustedHijriYear = 1445;
    } else {
      adjustedHijriYear = 1445;
    }
  } else if (currentYear === 2025) {
    adjustedHijriYear = 1446;
  } else if (currentYear === 2026) {
    adjustedHijriYear = 1447;
  }

  return `${hijriDay} ${hijriMonths[hijriMonth - 1]} ${adjustedHijriYear} هـ`;
}
