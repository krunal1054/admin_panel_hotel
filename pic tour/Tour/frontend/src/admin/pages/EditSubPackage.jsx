import AdminLayout from "../components/AdminLayout";
import FormCard from "../components/FormCard";
import FormHeader from "../components/FormHeader";

export default function EditSubPackage() {
  const data = {
    title: "Goa Beach Tour",
    location: "Goa",
    tourType: "Family",
    price: "₹30,000",
    inclusions: "Hotel, Meals, Pickup",
    exclusions: "Flights, Insurance"
  };

  return (
    <AdminLayout>
      <FormHeader
        title="Edit Sub Package"
        subtitle="Update full tour details"
      />

      <FormCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input" defaultValue={data.title} />
          </div>

          <div>
            <label className="block text-sm mb-1">Location</label>
            <input className="input" defaultValue={data.location} />
          </div>

          <div>
            <label className="block text-sm mb-1">Tour Type</label>
            <select className="input" defaultValue={data.tourType}>
              <option>Family</option>
              <option>Couple</option>
              <option>Adventure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input className="input" defaultValue={data.price} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Inclusions</label>
            <textarea
              className="input h-24"
              defaultValue={data.inclusions}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Exclusions</label>
            <textarea
              className="input h-24"
              defaultValue={data.exclusions}
            />
          </div>

          <button className="btn-primary md:col-span-2">
            Update Sub Package
          </button>
        </div>
      </FormCard>
    </AdminLayout>
  );
}
