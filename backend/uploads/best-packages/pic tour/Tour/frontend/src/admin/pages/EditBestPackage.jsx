import AdminLayout from "../components/AdminLayout";
import FormCard from "../components/FormCard";
import FormHeader from "../components/FormHeader";

export default function EditBestPackage() {
  const data = {
    title: "Goa Holiday",
    price: "₹25,000",
    days: "3 Days / 2 Nights",
    tags: "Beach, Family"
  };

  return (
    <AdminLayout>
      <FormHeader
        title="Edit Best Package"
        subtitle="Update tour card details"
      />

      <FormCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input" defaultValue={data.title} />
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input className="input" defaultValue={data.price} />
          </div>

          <div>
            <label className="block text-sm mb-1">Days</label>
            <input className="input" defaultValue={data.days} />
          </div>

          <div>
            <label className="block text-sm mb-1">Tags</label>
            <input className="input" defaultValue={data.tags} />
          </div>

          <button className="btn-primary md:col-span-2">
            Update Package
          </button>
        </div>
      </FormCard>
    </AdminLayout>
  );
}
