import api from "./api";

/* ================= GET ALL TOURS ================= */
/*
  tourType example:
  "Family" | "Couple" | "Adventure" | "All"
*/
export const fetchTours = (tourType = "All") => {
  return api.get("/tours", {
    params: tourType !== "All" ? { tourType } : {},
  });
};

/* ================= GET TOUR BY ID ================= */
export const fetchTourById = (id) => {
  return api.get(`/tours/${id}`);
};

/* ================= CREATE TOUR (ADMIN) ================= */
/*
  data should be FormData
  fields:
  title, location, price, tourType, mainImage
*/
export const createTour = (data) => {
  return api.post("/tours", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= UPDATE TOUR (ADMIN) ================= */
/*
  data can be:
  - FormData (if image update)
  - JSON (if only text fields)
*/
export const updateTour = (id, data, isFormData = false) => {
  return api.put(`/tours/${id}`, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : {},
  });
};

/* ================= DELETE TOUR (ADMIN) ================= */
export const deleteTour = (id) => {
  return api.delete(`/tours/${id}`);
};
