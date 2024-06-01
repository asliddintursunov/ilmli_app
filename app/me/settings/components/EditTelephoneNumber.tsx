import { Dispatch, SetStateAction, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
type Props = {
  phoneNumber: string | undefined;
  setPhoneNumber: Dispatch<SetStateAction<string | undefined>>;
};
export default function EditTelephoneNumber({
  phoneNumber,
  setPhoneNumber,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const baseStyle = {
    outline: "none",
    border: "2px solid rgb(209, 213, 219)",
    backgroundColor: "rgba(229, 231, 235, 0.2)",
    borderRadius: "6px",
    transition: "all 0.2s",
    fontWeight: "600",
    height: "44px",
    width: "100%",
  };

  const focusStyle = {
    borderColor: "rgb(59, 130, 246)",
    backgroundColor: "inherit",
  };
  const combinedStyle = {
    ...baseStyle,
    ...(isFocused ? focusStyle : {}),
  };

  return (
    <div className="w-full">
      <label htmlFor="edit_phonenumber">Telefon raqam</label>
      <PhoneInput
        placeholder="+998901234567"
        onChange={setPhoneNumber}
        value={phoneNumber}
        inputStyle={combinedStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        country={"uz"}
        inputProps={{
          required: true,
        }}
      />
    </div>
  );
}
