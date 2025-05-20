//componnet/Profile/ProfileField.tsx

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
  let displayValue = "";

  if (value instanceof Date && !isNaN(value.getTime())) {
    displayValue = value.toISOString().split("T")[0];
  } else if (typeof value === "string" || typeof value === "number") {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      displayValue = parsedDate.toISOString().split("T")[0];
    } else {
      displayValue = value.toString();
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
      <label className="font-semibold text-[#426a5a] w-32">{label}:</label>
      {editable && name ? (
        <input
          name={name}
          value={displayValue}
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
