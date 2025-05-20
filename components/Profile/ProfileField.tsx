//componnet/Profile/ProfileField.tsx - This file defines a ProfileField component that displays a label and a value, with an optional input field for editing the value. It handles different types of values, including strings, numbers, and dates.

import React from "react";

function ProfileField({
  label,
  value,
  name,
  onChange,
  editable = false,
  disabled = false,
  type = "text",
}: {
  label: string;
  value?: string | number | Date | null;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editable?: boolean;
  disabled?: boolean;
  type?: string;
}) {
  let displayValue: string | number = ""; // Allow both string and number types for displayValue.

  // Handle Date formatting only if type is not "number"
  if (type !== "number" && value instanceof Date && !isNaN(value.getTime())) {
    displayValue = value.toISOString().split("T")[0];
  }

  if (value instanceof Date && !isNaN(value.getTime())) {
    displayValue = value.toISOString().split("T")[0];
  } else if (type === "number" && typeof value === "number") {
    displayValue = value; // Keep numeric value as-is for number inputs.
  } else if (typeof value === "string" || typeof value === "number") {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      displayValue = parsedDate.toISOString().split("T")[0];
    } else {
      displayValue = value.toString(); // Convert to string for other types.
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
      <label className="font-semibold text-[#426a5a] w-32">{label}:</label>
      {editable && name ? (
        <input
          name={name}
          value={displayValue} // Pass numeric value directly if type="number".
          onChange={onChange}
          type={type}
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-1 w-full sm:w-[300px] focus:outline-none focus:ring-2 focus:ring-[#426a5a]"
        />
      ) : (
        <span>{displayValue || "Not provided"}</span>
      )}
    </div>
  );
}

export default React.memo(ProfileField);
