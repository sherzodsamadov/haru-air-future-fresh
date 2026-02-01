import { Trash2, Eye, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { ContactMessage } from '@/types';

export default function AdminMessages() {
  const { messages, markMessageRead, deleteMessage } = useData();
  const { toast } = useToast();
  const [viewingMsg, setViewingMsg] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openView = (msg: ContactMessage) => { setViewingMsg(msg); if (!msg.isRead) markMessageRead(msg.id); };
  const handleDelete = () => { if (deletingId) { deleteMessage(deletingId); toast({ title: "Xabar o'chirildi" }); setDeletingId(null); } };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold">Xabarlar</h1><p className="text-muted-foreground">{messages.length} ta xabar</p></div>

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">Ism</th><th className="text-left p-4">Mavzu</th><th className="text-left p-4">Sana</th><th className="text-left p-4">Holati</th><th className="text-right p-4">Amallar</th></tr></thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className={`border-b hover:bg-muted/30 ${!msg.isRead ? 'bg-primary/5' : ''}`}>
                <td className="p-4 font-medium">{msg.name}</td>
                <td className="p-4">{msg.subject}</td>
                <td className="p-4 text-muted-foreground">{msg.submittedAt}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${!msg.isRead ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>{msg.isRead ? "O'qilgan" : 'Yangi'}</span></td>
                <td className="p-4"><div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openView(msg)}><Eye size={16} /></Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeletingId(msg.id)}><Trash2 size={16} /></Button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && <div className="p-8 text-center text-muted-foreground">Xabarlar yo'q</div>}
      </div>

      <Dialog open={!!viewingMsg} onOpenChange={() => setViewingMsg(null)}>
        <DialogContent><DialogHeader><DialogTitle><Mail className="inline mr-2" size={18} />{viewingMsg?.subject}</DialogTitle></DialogHeader>
          {viewingMsg && <div className="space-y-3"><p><strong>Ism:</strong> {viewingMsg.name}</p><p><strong>Email:</strong> {viewingMsg.email}</p>{viewingMsg.phone && <p><strong>Tel:</strong> {viewingMsg.phone}</p>}<p><strong>Xabar:</strong></p><p className="bg-muted p-3 rounded-lg">{viewingMsg.message}</p></div>}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>O'chirishni tasdiqlang</AlertDialogTitle></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Bekor</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive">O'chirish</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}
