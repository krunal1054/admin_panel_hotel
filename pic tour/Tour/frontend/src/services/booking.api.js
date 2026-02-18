// frontend/src/services/booking.api.js
import api from "./api";

export const createBooking = data => api.post("/booking", data);
export const markPaid = id => api.put(`/booking/pay/${id}`);
