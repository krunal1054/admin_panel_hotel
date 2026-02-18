export default function FormCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}
