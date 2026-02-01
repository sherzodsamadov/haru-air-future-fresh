import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';

export default function VacanciesPage() {
  const { vacancies } = useData();
  const activeVacancies = vacancies.filter((v) => v.isActive);

  const typeLabels = {
    'full-time': 'To\'liq kunlik',
    'part-time': 'Yarim kunlik',
    'contract': 'Shartnoma',
    'internship': 'Amaliyot',
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-nature overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Vakansiyalar
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              HARU AIR jamoasiga qo'shiling va toza kelajak uchun birga ishlaymiz. Biz iste'dodli va ishtiyoqli mutaxassislarni izlayapmiz.
            </p>
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="section-padding">
        <div className="container-page">
          {activeVacancies.length > 0 ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {activeVacancies.map((vacancy) => (
                <Link
                  key={vacancy.id}
                  to={`/vacancies/${vacancy.slug}`}
                  className="block card-eco group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {vacancy.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} />
                          {vacancy.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {vacancy.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {typeLabels[vacancy.type]}
                        </span>
                      </div>
                      {vacancy.salary && (
                        <div className="mt-2 text-primary font-medium">
                          {vacancy.salary}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Batafsil <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hozircha vakansiyalar yo'q</h3>
              <p className="text-muted-foreground">
                Tez orada yangi imkoniyatlar paydo bo'ladi. Qaytib keling!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding bg-muted/30">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Nega HARU AIR?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bizning jamoamizda ishlash afzalliklari
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-semibold text-lg mb-2">Mazmunli ish</h3>
              <p className="text-muted-foreground text-sm">
                Siz real ta'sir qoldiradigan loyihalar ustida ishlaysiz
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg mb-2">O'sish imkoniyati</h3>
              <p className="text-muted-foreground text-sm">
                Professional rivojlanish va karyera o'sishi uchun barcha sharoitlar
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-lg mb-2">Do'stona jamoa</h3>
              <p className="text-muted-foreground text-sm">
                Bir-birini qo'llab-quvvatlaydigan hamkasblar bilan ishlash
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
