import AdminLayout from "../components/AdminLayout";
import FormCard from "../components/FormCard";
import FormHeader from "../components/FormHeader";

export default function EditTopPackage() {
  // 🔹 Dummy existing data
  const data = {
    id: "TP-1023",
    title: "Goa",
    placecountes: "12 Places"
  };

  return (
    <AdminLayout>
      <FormHeader
        title="Edit Top Package"
        subtitle="Update category details"
      />

      <FormCard>
        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Package ID</label>
            <input className="input bg-gray-100" value={data.id} disabled />
          </div>

          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input" defaultValue={data.title} />
          </div>

          <div>
            <label className="block text-sm mb-1">Total Places</label>
            <input className="input" defaultValue={data.placecountes} />
          </div>

          <button className="btn-primary">
            Update Package
          </button>
        </div>
      </FormCard>
    </AdminLayout>
  );
}
