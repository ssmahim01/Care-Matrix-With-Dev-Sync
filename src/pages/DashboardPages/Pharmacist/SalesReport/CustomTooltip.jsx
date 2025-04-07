// Color schemes for charts
export const COLORS = {
  revenue: {
    primary: "#06b6d4",
    secondary: "#0ea5e9",
    gradient: ["#0ea5e9", "#06b6d4"],
  },
  orders: {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    gradient: ["#8b5cf6", "#a78bfa"],
  },
  items: {
    primary: "#f97316",
    secondary: "#fb923c",
    gradient: ["#f97316", "#fb923c"],
  },
};

// Custom tooltip component for charts
const CustomTooltip = ({
  active,
  payload,
  label,
  valuePrefix = "",
  valueSuffix = "",
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3 text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload?.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry?.color }}
            className="flex items-center gap-2"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            ></span>
            <span>
              {entry?.name}: {valuePrefix}
              {Number(entry?.value).toLocaleString()}
              {valueSuffix}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip