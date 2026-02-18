import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", bookings: 40 },
  { name: "Tue", bookings: 60 },
  { name: "Wed", bookings: 80 },
  { name: "Thu", bookings: 55 },
  { name: "Fri", bookings: 30 }
];

export default function BookingChart() {
  return (
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <Tooltip />
      <Bar dataKey="bookings" fill="#10b981" />
    </BarChart>
  );
}
