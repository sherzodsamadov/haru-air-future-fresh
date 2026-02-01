import { useData } from '@/contexts/DataContext';

export default function AdminAnnouncements() {
  const { announcements } = useData();
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold">E'lonlar</h1></div>
      <div className="bg-card rounded-xl shadow-sm p-6">
        {announcements.map((a) => (
          <div key={a.id} className="p-4 bg-muted/30 rounded-lg mb-3">
            <div className="flex justify-between mb-2"><h3 className="font-medium">{a.title}</h3><span className={`px-2 py-1 rounded text-xs ${a.isActive ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>{a.isActive ? 'Faol' : 'Nofaol'}</span></div>
            <p className="text-muted-foreground text-sm">{a.content}</p>
          </div>
        ))}
        {announcements.length === 0 && <p className="text-muted-foreground">E'lonlar yo'q</p>}
      </div>
    </div>
  );
}
