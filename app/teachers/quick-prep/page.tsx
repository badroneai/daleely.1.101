import PageLayout from "@/components/PageLayout";
import TeacherNoteTemplate from "@/components/teachers/TeacherNoteTemplate";
import { generatePillarMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePillarMetadata(
  "تحضير سريع (5 دقائق)",
  "نوته جاهزة للتحضير السريع: روتين افتتاح وختام جاهز للطباعة",
  "teachers/quick-prep"
);

export default function QuickPrepPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "الرئيسية", href: "/" },
        { label: "للمعلمين", href: "/teachers" },
        { label: "تحضير سريع (5 دقائق)" },
      ]}
    >
      <TeacherNoteTemplate
        title="تحضير سريع (5 دقائق)"
        instructions="نوته جاهزة للتحضير السريع - يمكنك طباعتها واستخدامها في الصف"
        content={
          <div className="space-y-8">
            {/* روتين الافتتاح */}
            <section className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                روتين الافتتاح (5 دقائق)
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    1. تحية الصف (30 ثانية)
                  </h3>
                  <p className="text-gray-700">
                    &quot;السلام عليكم، صباح الخير، كيف حالكم اليوم؟&quot; - تحية ودودة تخلق جو إيجابي
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    2. سؤال اليوم السريع (دقيقة)
                  </h3>
                  <p className="text-gray-700">
                    سؤال بسيط عن الدرس السابق أو موضوع اليوم - يساعد في تحضير الطلاب ذهنياً
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>مثال:</strong> &quot;ما الذي تعلمناه في الدرس السابق؟&quot;
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    3. مراجعة سريعة (دقيقتان)
                  </h3>
                  <p className="text-gray-700">
                    مراجعة 2-3 نقاط رئيسية من الدرس السابق - ربط المعرفة الجديدة بالقديمة
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    4. عرض أهداف الدرس (دقيقة ونصف)
                  </h3>
                  <p className="text-gray-700">
                    &quot;اليوم سنتعلم...&quot; - إعطاء الطلاب خريطة واضحة لما سيحدث في الدرس
                  </p>
                </div>
              </div>
            </section>

            {/* روتين الختام */}
            <section className="bg-green-50 rounded-lg p-6 border-r-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                روتين الختام (5 دقائق)
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    1. تلخيص سريع (دقيقة)
                  </h3>
                  <p className="text-gray-700">
                    &quot;ما الذي تعلمناه اليوم؟&quot; - طلب من الطلاب تلخيص الدرس بكلماتهم
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    2. سؤال ختامي (30 ثانية)
                  </h3>
                  <p className="text-gray-700">
                    سؤال واحد لقياس الفهم - يساعد في معرفة من يحتاج دعم إضافي
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    3. بطاقة خروج (دقيقة)
                  </h3>
                  <p className="text-gray-700">
                    سؤال سريع على ورقة صغيرة - تقييم فوري للفهم
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>نصيحة:</strong> استخدم مولّد أوراق العمل لإنشاء بطاقات خروج جاهزة
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    4. تذكير بالواجب (30 ثانية)
                  </h3>
                  <p className="text-gray-700">
                    &quot;الواجب المنزلي هو...&quot; - تذكير واضح ومباشر
                  </p>
                </div>
              </div>
            </section>

            {/* نصائح سريعة */}
            <section className="bg-yellow-50 rounded-lg p-6 border-r-4 border-yellow-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                نصائح للنجاح
              </h2>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>التزم بالوقت المحدد لكل جزء</li>
                <li>كن مرناً - يمكنك تعديل الروتين حسب احتياجات صفك</li>
                <li>استخدم نفس الروتين يومياً لخلق عادة</li>
                <li>راقب تفاعل الطلاب وعدّل حسب الحاجة</li>
              </ul>
            </section>
          </div>
        }
      />
    </PageLayout>
  );
}
