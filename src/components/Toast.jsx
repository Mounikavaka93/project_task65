import { useMall } from '../context/MallContext';

export default function Toast() {
  const { toast } = useMall();
  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      className="fixed bottom-5 left-1/2 z-[70] max-w-[90vw] -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-sm text-paper shadow-card"
    >
      {toast.message}
    </div>
  );
}
