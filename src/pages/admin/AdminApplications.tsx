import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { VacancyApplication } from '@/types';

export default function AdminApplications() {
  const { applications, updateApplicationStatus } = useData();
  const { toast } = useToast();

  const statusLabels = { new: 'Yangi', reviewed: "Ko'rib chiqilgan", interview: 'Suhbat', accepted: 'Qabul', rejected: 'Rad' };
  const handleStatus = (id: string, status: VacancyApplication['status']) => { updateApplicationStatus(id, status); toast({ title: 'Holat yangilandi' }); };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold">Arizalar</h1><p className="text-muted-foreground">{applications.length} ta ariza</p></div>

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">Ism</th><th className="text-left p-4">Vakansiya</th><th className="text-left p-4">Email</th><th className="text-left p-4">Sana</th><th className="text-left p-4">Holati</th></tr></thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{app.fullName}</td>
                <td className="p-4">{app.vacancyTitle}</td>
                <td className="p-4 text-muted-foreground">{app.email}</td>
                <td className="p-4 text-muted-foreground">{app.submittedAt}</td>
                <td className="p-4">
                  <Select value={app.status} onValueChange={(v) => handleStatus(app.id, v as VacancyApplication['status'])}>
                    <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && <div className="p-8 text-center text-muted-foreground">Arizalar yo'q</div>}
      </div>
    </div>
  );
}
