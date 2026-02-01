import { useData } from '@/contexts/DataContext';

export default function AdminCategories() {
  const { categories } = useData();
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold">Kategoriyalar</h1></div>
      <div className="bg-card rounded-xl shadow-sm p-6">
        <div className="grid gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div><h3 className="font-medium">{cat.name}</h3><p className="text-sm text-muted-foreground">{cat.description}</p></div>
              <span className="badge-category">{cat.productCount} mahsulot</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
