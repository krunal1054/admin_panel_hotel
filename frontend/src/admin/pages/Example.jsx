import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-600"
      >
        Delete
      </button>

      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={() => {
          alert("Deleted (dummy)");
          setOpen(false);
        }}
      />
    </>
  );
}
