export default function BookingModal({ open, onClose, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Book Tour</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            onSubmit({
              name: form.name.value,
              date: form.date.value,
              people: form.people.value,
            });
          }}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Your Name"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="date"
            name="date"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="number"
            name="people"
            placeholder="No. of People"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white py-2 rounded"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
