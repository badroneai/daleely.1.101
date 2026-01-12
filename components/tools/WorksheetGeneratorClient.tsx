"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type WorksheetType = 
  | "multiplication" 
  | "addition" 
  | "subtraction" 
  | "division"
  | "mixed-math"
  | "arabic-letters" 
  | "arabic-words";
type GradeLevel = "1-2" | "3-4" | "5-6";
type WorksheetTemplate = 
  | "custom"
  | "practice-with-answer"
  | "homework"
  | "review"
  | "diagnostic"
  | "enrichment"
  | "exit-ticket"
  | "quick-questions"
  | "differentiated"
  | "remedial"
  | "quick-activity";

interface WorksheetQuestion {
  id: number;
  question: string;
  answer: string;
}

export default function WorksheetGeneratorClient() {
  const [worksheetType, setWorksheetType] = useState<WorksheetType>("multiplication");
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>("3-4");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [includeAnswers, setIncludeAnswers] = useState<boolean>(false);
  const [worksheet, setWorksheet] = useState<WorksheetQuestion[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [template, setTemplate] = useState<WorksheetTemplate>("custom");
  const [worksheetTitle, setWorksheetTitle] = useState<string>("");

  // Check URL params for template
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const templateParam = params.get("template");
      if (templateParam && isValidTemplate(templateParam)) {
        setTemplate(templateParam as WorksheetTemplate);
        applyTemplateSettings(templateParam as WorksheetTemplate);
      }
    }
  }, []);

  const isValidTemplate = (t: string): t is WorksheetTemplate => {
    return [
      "custom", "practice-with-answer", "homework", "review", "diagnostic",
      "enrichment", "exit-ticket", "quick-questions", "differentiated", "remedial", "quick-activity"
    ].includes(t);
  };

  const applyTemplateSettings = (t: WorksheetTemplate) => {
    switch (t) {
      case "practice-with-answer":
        setIncludeAnswers(true);
        setQuestionCount(15);
        setWorksheetTitle("ورقة تدريب");
        break;
      case "homework":
        setIncludeAnswers(false);
        setQuestionCount(10);
        setWorksheetTitle("واجب منزلي");
        break;
      case "review":
        setIncludeAnswers(false);
        setQuestionCount(20);
        setWorksheetTitle("مراجعة قبل الاختبار");
        break;
      case "diagnostic":
        setIncludeAnswers(true);
        setQuestionCount(15);
        setWorksheetTitle("تقويم تشخيصي");
        break;
      case "enrichment":
        setIncludeAnswers(false);
        setQuestionCount(15);
        setWorksheetTitle("إثراء للمتفوقين");
        break;
      case "exit-ticket":
        setIncludeAnswers(false);
        setQuestionCount(3);
        setWorksheetTitle("بطاقة خروج");
        break;
      case "quick-questions":
        setIncludeAnswers(false);
        setQuestionCount(5);
        setWorksheetTitle("أسئلة سريعة");
        break;
      case "differentiated":
        setIncludeAnswers(false);
        setQuestionCount(10);
        setWorksheetTitle("ورقة مفرّدة");
        break;
      case "remedial":
        setIncludeAnswers(true);
        setQuestionCount(10);
        setWorksheetTitle("ورقة دعم للمتعثرين");
        break;
      case "quick-activity":
        setIncludeAnswers(false);
        setQuestionCount(5);
        setWorksheetTitle("نشاط سريع");
        break;
    }
  };

  const generateMultiplicationQuestions = (count: number, grade: GradeLevel): WorksheetQuestion[] => {
    const questions: WorksheetQuestion[] = [];
    let maxTable = 10;

    if (grade === "1-2") maxTable = 5;
    else if (grade === "3-4") maxTable = 10;
    else if (grade === "5-6") maxTable = 12;

    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxTable) + 2;
      const b = Math.floor(Math.random() * 12) + 1;
      questions.push({
        id: i + 1,
        question: `${a} × ${b} = `,
        answer: `${a * b}`,
      });
    }
    return questions;
  };

  const generateAdditionQuestions = (count: number, grade: GradeLevel): WorksheetQuestion[] => {
    const questions: WorksheetQuestion[] = [];
    let maxNum = 20;

    if (grade === "1-2") maxNum = 20;
    else if (grade === "3-4") maxNum = 100;
    else if (grade === "5-6") maxNum = 200;

    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxNum) + 1;
      const b = Math.floor(Math.random() * maxNum) + 1;
      questions.push({
        id: i + 1,
        question: `${a} + ${b} = `,
        answer: `${a + b}`,
      });
    }
    return questions;
  };

  const generateSubtractionQuestions = (count: number, grade: GradeLevel): WorksheetQuestion[] => {
    const questions: WorksheetQuestion[] = [];
    let maxNum = 20;

    if (grade === "1-2") maxNum = 20;
    else if (grade === "3-4") maxNum = 100;
    else if (grade === "5-6") maxNum = 200;

    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxNum) + 10;
      const b = Math.floor(Math.random() * a) + 1;
      questions.push({
        id: i + 1,
        question: `${a} - ${b} = `,
        answer: `${a - b}`,
      });
    }
    return questions;
  };

  const generateDivisionQuestions = (count: number, grade: GradeLevel): WorksheetQuestion[] => {
    const questions: WorksheetQuestion[] = [];
    let maxTable = 10;

    if (grade === "1-2") maxTable = 5;
    else if (grade === "3-4") maxTable = 10;
    else if (grade === "5-6") maxTable = 12;

    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxTable) + 2;
      const b = Math.floor(Math.random() * 12) + 1;
      const product = a * b;
      questions.push({
        id: i + 1,
        question: `${product} ÷ ${a} = `,
        answer: `${b}`,
      });
    }
    return questions;
  };

  const generateMixedMathQuestions = (count: number, grade: GradeLevel): WorksheetQuestion[] => {
    const questions: WorksheetQuestion[] = [];
    const types: Array<"multiplication" | "addition" | "subtraction" | "division"> = 
      ["multiplication", "addition", "subtraction", "division"];
    
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      let question: WorksheetQuestion;

      switch (type) {
        case "multiplication": {
          let maxTable = 10;
          if (grade === "1-2") maxTable = 5;
          else if (grade === "3-4") maxTable = 10;
          else if (grade === "5-6") maxTable = 12;
          const a = Math.floor(Math.random() * maxTable) + 2;
          const b = Math.floor(Math.random() * 12) + 1;
          question = {
            id: i + 1,
            question: `${a} × ${b} = `,
            answer: `${a * b}`,
          };
          break;
        }
        case "addition": {
          let maxNum = 20;
          if (grade === "1-2") maxNum = 20;
          else if (grade === "3-4") maxNum = 100;
          else if (grade === "5-6") maxNum = 200;
          const a = Math.floor(Math.random() * maxNum) + 1;
          const b = Math.floor(Math.random() * maxNum) + 1;
          question = {
            id: i + 1,
            question: `${a} + ${b} = `,
            answer: `${a + b}`,
          };
          break;
        }
        case "subtraction": {
          let maxNum = 20;
          if (grade === "1-2") maxNum = 20;
          else if (grade === "3-4") maxNum = 100;
          else if (grade === "5-6") maxNum = 200;
          const a = Math.floor(Math.random() * maxNum) + 10;
          const b = Math.floor(Math.random() * a) + 1;
          question = {
            id: i + 1,
            question: `${a} - ${b} = `,
            answer: `${a - b}`,
          };
          break;
        }
        case "division": {
          let maxTable = 10;
          if (grade === "1-2") maxTable = 5;
          else if (grade === "3-4") maxTable = 10;
          else if (grade === "5-6") maxTable = 12;
          const a = Math.floor(Math.random() * maxTable) + 2;
          const b = Math.floor(Math.random() * 12) + 1;
          const product = a * b;
          question = {
            id: i + 1,
            question: `${product} ÷ ${a} = `,
            answer: `${b}`,
          };
          break;
        }
      }
      questions.push(question);
    }
    return questions;
  };

  const generateArabicLettersQuestions = (count: number): WorksheetQuestion[] => {
    const arabicLetters = [
      "أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر",
      "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف",
      "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"
    ];
    const letterNames = [
      "ألف", "باء", "تاء", "ثاء", "جيم", "حاء", "خاء", "دال", "ذال", "راء",
      "زاي", "سين", "شين", "صاد", "ضاد", "طاء", "ظاء", "عين", "غين", "فاء",
      "قاف", "كاف", "لام", "ميم", "نون", "هاء", "واو", "ياء"
    ];

    const questions: WorksheetQuestion[] = [];

    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * arabicLetters.length);
      questions.push({
        id: i + 1,
        question: `ما اسم الحرف "${arabicLetters[index]}"؟`,
        answer: letterNames[index],
      });
    }
    return questions;
  };

  const generateArabicWordsQuestions = (count: number): WorksheetQuestion[] => {
    const words = [
      { word: "باب", meaning: "مدخل المنزل" },
      { word: "كتاب", meaning: "مصدر للقراءة والتعلم" },
      { word: "قلم", meaning: "أداة للكتابة" },
      { word: "مدرسة", meaning: "مكان التعلم" },
      { word: "بيت", meaning: "مكان السكن" },
      { word: "شجرة", meaning: "نبات كبير" },
      { word: "سيارة", meaning: "مركبة للنقل" },
      { word: "طائرة", meaning: "مركبة تطير في السماء" },
      { word: "قطة", meaning: "حيوان أليف" },
      { word: "كلب", meaning: "حيوان أليف" },
      { word: "شمس", meaning: "نجم يضيء الأرض" },
      { word: "قمر", meaning: "جرم سماوي يضيء ليلاً" },
      { word: "نجمة", meaning: "جرم سماوي مضيء" },
      { word: "بحر", meaning: "مسطح مائي كبير" },
      { word: "نهر", meaning: "مسطح مائي جاري" },
      { word: "جبل", meaning: "ارتفاع عالي من الأرض" },
      { word: "صحراء", meaning: "أرض جافة" },
      { word: "مدينة", meaning: "مكان كبير للسكن" },
      { word: "قرية", meaning: "مكان صغير للسكن" },
      { word: "حديقة", meaning: "مكان للزراعة والترفيه" },
      { word: "مكتبة", meaning: "مكان للكتب" },
      { word: "مستشفى", meaning: "مكان للعلاج" },
      { word: "مطعم", meaning: "مكان لتناول الطعام" },
      { word: "سوق", meaning: "مكان للبيع والشراء" },
      { word: "مسجد", meaning: "مكان للصلاة" },
      { word: "مطار", meaning: "مكان للطائرات" },
      { word: "محطة", meaning: "مكان للقطارات" },
      { word: "ميناء", meaning: "مكان للسفن" },
      { word: "جسر", meaning: "طريق فوق الماء" },
      { word: "طريق", meaning: "مسار للسيارات" },
    ];

    const questions: WorksheetQuestion[] = [];

    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * words.length);
      questions.push({
        id: i + 1,
        question: `ما معنى الكلمة "${words[index].word}"؟`,
        answer: words[index].meaning,
      });
    }
    return questions;
  };

  const handleGenerate = () => {
    let questions: WorksheetQuestion[] = [];

    switch (worksheetType) {
      case "multiplication":
        questions = generateMultiplicationQuestions(questionCount, gradeLevel);
        break;
      case "addition":
        questions = generateAdditionQuestions(questionCount, gradeLevel);
        break;
      case "subtraction":
        questions = generateSubtractionQuestions(questionCount, gradeLevel);
        break;
      case "division":
        questions = generateDivisionQuestions(questionCount, gradeLevel);
        break;
      case "mixed-math":
        questions = generateMixedMathQuestions(questionCount, gradeLevel);
        break;
      case "arabic-letters":
        questions = generateArabicLettersQuestions(questionCount);
        break;
      case "arabic-words":
        questions = generateArabicWordsQuestions(questionCount);
        break;
    }

    setWorksheet(questions);
    setIsGenerated(true);
    trackEvent("worksheet_generated", {
      type: worksheetType,
      template,
      gradeLevel,
      questionCount,
    });
  };

  const handlePrint = () => {
    window.print();
    trackEvent("worksheet_printed", {
      type: worksheetType,
      template,
      questionCount,
    });
  };

  const handleDownloadTXT = () => {
    let content = `${worksheetTitle || `ورقة عمل - ${getWorksheetTypeName(worksheetType)}`}\n`;
    if (worksheetType !== "arabic-letters" && worksheetType !== "arabic-words") {
      content += `الصف: ${getGradeLevelName(gradeLevel)}\n`;
    }
    content += `عدد الأسئلة: ${questionCount}\n\n`;
    content += "=".repeat(40) + "\n\n";

    worksheet.forEach((q) => {
      content += `${q.id}. ${q.question}`;
      if (includeAnswers) {
        content += ` ${q.answer}`;
      }
      content += "\n";
    });

    if (includeAnswers) {
      content += "\n" + "=".repeat(40) + "\n";
      content += "الإجابات:\n\n";
      worksheet.forEach((q) => {
        content += `${q.id}. ${q.answer}\n`;
      });
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `worksheet-${worksheetType}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    trackEvent("worksheet_downloaded", {
      type: worksheetType,
      template,
      questionCount,
      format: "txt",
    });
  };

  const handleDownloadPDF = () => {
    // Create HTML content for PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          @page {
            margin: 2cm;
          }
          body {
            font-family: Arial, sans-serif;
            direction: rtl;
            text-align: right;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          .info {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
          }
          .question {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #ccc;
          }
          .question-number {
            font-weight: bold;
            margin-left: 10px;
          }
          .answers {
            margin-top: 30px;
            page-break-before: always;
            padding-top: 20px;
            border-top: 2px solid #333;
          }
          .answer-item {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>${worksheetTitle || `ورقة عمل - ${getWorksheetTypeName(worksheetType)}`}</h1>
        <div class="info">
          ${worksheetType !== "arabic-letters" && worksheetType !== "arabic-words" ? `<p>الصف: ${getGradeLevelName(gradeLevel)}</p>` : ""}
          <p>عدد الأسئلة: ${questionCount}</p>
        </div>
        <div class="questions">
    `;

    worksheet.forEach((q) => {
      htmlContent += `
        <div class="question">
          <span class="question-number">${q.id}.</span>
          <span>${q.question}</span>
          ${includeAnswers ? `<span style="color: #2563eb; font-weight: bold; margin-right: 10px;">${q.answer}</span>` : ""}
        </div>
      `;
    });

    htmlContent += `</div>`;

    if (includeAnswers) {
      htmlContent += `
        <div class="answers">
          <h2>الإجابات:</h2>
      `;
      worksheet.forEach((q) => {
        htmlContent += `<div class="answer-item"><strong>${q.id}.</strong> ${q.answer}</div>`;
      });
      htmlContent += `</div>`;
    }

    htmlContent += `
      </body>
      </html>
    `;

    // Open print dialog (user can save as PDF)
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }

    trackEvent("worksheet_downloaded", {
      type: worksheetType,
      template,
      questionCount,
      format: "pdf",
    });
  };

  const getWorksheetTypeName = (type: WorksheetType): string => {
    const names: Record<WorksheetType, string> = {
      multiplication: "جدول الضرب",
      addition: "الجمع",
      subtraction: "الطرح",
      division: "القسمة",
      "mixed-math": "أسئلة منوعة (رياضيات)",
      "arabic-letters": "الحروف العربية",
      "arabic-words": "الكلمات العربية",
    };
    return names[type];
  };

  const getGradeLevelName = (level: GradeLevel): string => {
    const names: Record<GradeLevel, string> = {
      "1-2": "الصف الأول والثاني",
      "3-4": "الصف الثالث والرابع",
      "5-6": "الصف الخامس والسادس",
    };
    return names[level];
  };

  const getTemplateName = (t: WorksheetTemplate): string => {
    const names: Record<WorksheetTemplate, string> = {
      custom: "مخصص",
      "practice-with-answer": "ورقة تدريب + إجابة نموذجية",
      homework: "واجب منزلي",
      review: "مراجعة قبل اختبار",
      diagnostic: "تقويم تشخيصي",
      enrichment: "إثراء للمتفوقين",
      "exit-ticket": "بطاقة خروج",
      "quick-questions": "أسئلة سريعة",
      differentiated: "ورقة مفرّدة",
      remedial: "دعم للمتعثرين",
      "quick-activity": "نشاط سريع",
    };
    return names[t];
  };

  const isMathType = (type: WorksheetType): boolean => {
    return type === "multiplication" || 
           type === "addition" || 
           type === "subtraction" || 
           type === "division" ||
           type === "mixed-math";
  };

  return (
    <div className="space-y-6">
      {/* Templates Section */}
      <div className="bg-primary-50 rounded-lg p-6 border-r-4 border-primary-500">
        <h3 className="text-xl font-bold text-gray-900 mb-4">قوالب جاهزة</h3>
        <p className="text-gray-600 mb-4 text-sm">
          اختر قالباً جاهزاً لإنشاء ورقة عمل مخصصة لهدف تعليمي محدد
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(
            [
              { value: "custom", label: "مخصص", icon: "⚙️" },
              { value: "practice-with-answer", label: "تدريب + إجابة", icon: "📝" },
              { value: "homework", label: "واجب منزلي", icon: "🏠" },
              { value: "review", label: "مراجعة", icon: "📚" },
              { value: "diagnostic", label: "تشخيصي", icon: "🔍" },
              { value: "enrichment", label: "إثراء", icon: "⭐" },
              { value: "exit-ticket", label: "بطاقة خروج", icon: "🎫" },
              { value: "quick-questions", label: "أسئلة سريعة", icon: "⚡" },
              { value: "differentiated", label: "مفرّدة", icon: "🎯" },
              { value: "remedial", label: "دعم", icon: "💪" },
              { value: "quick-activity", label: "نشاط سريع", icon: "🚀" },
            ] as Array<{ value: WorksheetTemplate; label: string; icon: string }>
          ).map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTemplate(t.value);
                applyTemplateSettings(t.value);
              }}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                template === t.value
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              <span className="text-lg">{t.icon}</span>
              <div className="mt-1">{t.label}</div>
            </button>
          ))}
        </div>
        {template !== "custom" && (
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>القالب المختار:</strong> {getTemplateName(template)}
              {worksheetTitle && ` - ${worksheetTitle}`}
            </p>
          </div>
        )}
      </div>

      {/* Configuration Panel */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">إعدادات ورقة العمل</h3>

        {/* Worksheet Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع التمرين:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Math Types */}
            <div className="col-span-full mb-2">
              <p className="text-xs font-semibold text-gray-600 mb-2">الرياضيات:</p>
            </div>
            {(
              [
                { value: "multiplication", label: "جدول الضرب" },
                { value: "addition", label: "الجمع" },
                { value: "subtraction", label: "الطرح" },
                { value: "division", label: "القسمة" },
                { value: "mixed-math", label: "أسئلة منوعة" },
              ] as Array<{ value: WorksheetType; label: string }>
            ).map((type) => (
              <button
                key={type.value}
                onClick={() => setWorksheetType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  worksheetType === type.value
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {type.label}
              </button>
            ))}
            
            {/* Arabic Types */}
            <div className="col-span-full mb-2 mt-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">اللغة العربية:</p>
            </div>
            {(
              [
                { value: "arabic-letters", label: "الحروف العربية" },
                { value: "arabic-words", label: "الكلمات العربية" },
              ] as Array<{ value: WorksheetType; label: string }>
            ).map((type) => (
              <button
                key={type.value}
                onClick={() => setWorksheetType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  worksheetType === type.value
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Level - Only for Math */}
        {isMathType(worksheetType) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المرحلة الدراسية:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { value: "1-2", label: "الصف الأول والثاني" },
                  { value: "3-4", label: "الصف الثالث والرابع" },
                  { value: "5-6", label: "الصف الخامس والسادس" },
                ] as Array<{ value: GradeLevel; label: string }>
              ).map((level) => (
                <button
                  key={level.value}
                  onClick={() => setGradeLevel(level.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    gradeLevel === level.value
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عدد الأسئلة: {questionCount}
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5</span>
            <span>30</span>
          </div>
        </div>

        {/* Include Answers */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeAnswers"
            checked={includeAnswers}
            onChange={(e) => setIncludeAnswers(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <label htmlFor="includeAnswers" className="text-sm font-medium text-gray-700">
            تضمين الإجابات في ورقة العمل
          </label>
        </div>

        {/* Custom Title */}
        {template !== "custom" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان ورقة العمل (اختياري):
            </label>
            <input
              type="text"
              value={worksheetTitle}
              onChange={(e) => setWorksheetTitle(e.target.value)}
              placeholder={getTemplateName(template)}
              className="input-field w-full"
            />
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full btn-primary text-lg py-3"
        >
          إنشاء ورقة العمل
        </button>
      </div>

      {/* Generated Worksheet */}
      {isGenerated && worksheet.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 print:border-0" id="worksheet-content">
          <div className="mb-6 print:hidden">
            <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {worksheetTitle || getWorksheetTypeName(worksheetType)}
                </h3>
                <p className="text-gray-600">
                  {isMathType(worksheetType) && `${getGradeLevelName(gradeLevel)} - `}
                  {questionCount} سؤال
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handlePrint}
                  className="btn-primary px-6 py-2"
                >
                  🖨️ طباعة
                </button>
                <button
                  onClick={handleDownloadTXT}
                  className="btn-secondary px-6 py-2"
                >
                  💾 تحميل TXT
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="btn-secondary px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  📄 تحميل PDF
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {worksheet.map((q) => (
              <div
                key={q.id}
                className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-0"
              >
                <span className="font-bold text-gray-700 min-w-[30px]">{q.id}.</span>
                <div className="flex-1">
                  <span className="text-lg text-gray-900">{q.question}</span>
                  {includeAnswers && (
                    <span className="text-lg text-primary-600 font-semibold mr-2">
                      {q.answer}
                    </span>
                  )}
                  <div className="mt-2 border-b border-dashed border-gray-300 w-full"></div>
                </div>
              </div>
            ))}
          </div>

          {includeAnswers && (
            <div className="mt-8 pt-6 border-t-2 border-gray-300 print:break-before-page">
              <h4 className="text-xl font-bold text-gray-900 mb-4">الإجابات:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {worksheet.map((q) => (
                  <div key={q.id} className="text-gray-700">
                    <span className="font-semibold">{q.id}.</span> {q.answer}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:break-before-page {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
}
