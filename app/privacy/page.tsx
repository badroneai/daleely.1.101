import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - Daleely.ai",
  description: "سياسة الخصوصية وخصوصية الأطفال في Daleely.ai",
  alternates: {
    canonical: "https://daleely.ai/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "الخصوصية" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">سياسة الخصوصية</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">مقدمة</h2>
            <p className="text-gray-600 leading-relaxed">
              نحن في Daleely.ai ملتزمون بحماية خصوصيتك وخصوصية أطفالك. هذه السياسة توضح
              كيفية جمعنا واستخدامنا للمعلومات على موقعنا.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">المعلومات التي نجمعها</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              نحن لا نجمع أي معلومات شخصية من المستخدمين. الموقع يعمل بدون تسجيل دخول
              أو إنشاء حساب.
            </p>
            <p className="text-gray-600 leading-relaxed">
              قد نجمع معلومات مجهولة الهوية عن استخدام الموقع (مثل عدد مرات فتح أداة معينة)
              لتحسين تجربة المستخدم، لكن هذه المعلومات لا يمكن ربطها بهوية شخصية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
            <p className="text-gray-600 leading-relaxed">
              نحن لا نستخدم ملفات تعريف الارتباط للتتبع أو الإعلانات. قد يستخدم الموقع
              ملفات تعريف ارتباط تقنية ضرورية لعمل الموقع بشكل صحيح.
            </p>
          </section>

          <section className="bg-primary-50 border-r-4 border-primary-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">خصوصية الأطفال</h2>
            <p className="text-gray-900 font-semibold mb-4">
              لا نجمع أي بيانات شخصية من الأطفال
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              موقع Daleely.ai مصمم خصيصاً للأطفال من 6-12 سنة، ونحن ملتزمون بحماية خصوصيتهم
              بشكل خاص. نحن:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>لا نطلب أي معلومات شخصية من الأطفال</li>
              <li>لا نستخدم ملفات تعريف ارتباط للتتبع</li>
              <li>لا نعرض إعلانات موجهة</li>
              <li>لا نشارك أي معلومات مع أطراف ثالثة</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>ماذا نجمع:</strong> قد نجمع معلومات مجهولة الهوية عن استخدام الأدوات
              (مثل عدد الإجابات الصحيحة) لتحسين المحتوى، لكن هذه المعلومات لا تحتوي على
              أي بيانات شخصية ولا يمكن ربطها بهوية الطفل.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>عدم التتبع:</strong> لا نستخدم أي تقنيات تتبع سلوكي للأطفال. جميع
              البيانات مجهولة الهوية وتستخدم فقط لتحسين تجربة التعلم.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>التواصل:</strong> إذا كان لديك أي استفسار حول خصوصية الأطفال، يرجى
              التواصل معنا عبر صفحة{" "}
              <a href="/contact" className="text-primary-600 hover:text-primary-700">
                تواصل معنا
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">التغييرات على هذه السياسة</h2>
            <p className="text-gray-600 leading-relaxed">
              قد نحدث هذه السياسة من وقت لآخر. سنقوم بنشر أي تغييرات على هذه الصفحة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">التواصل معنا</h2>
            <p className="text-gray-600 leading-relaxed">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى{" "}
              <a href="/contact" className="text-primary-600 hover:text-primary-700">
                التواصل معنا
              </a>
              .
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
