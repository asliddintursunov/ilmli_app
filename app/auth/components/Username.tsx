type Props = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isUserNameValid: boolean | null;
};

function Username({ setUserData, isUserNameValid }: Props) {
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="auth_input"
        style={{
          borderColor: isUserNameValid === false ? "red" : "",
        }}
        placeholder="User0046"
        onChange={(e) =>
          setUserData((prev) => ({ ...prev, username: e.target.value }))
        }
        required
      />
      {isUserNameValid === false && (
        <span className="text-xs text-red-500">
          Username faqat harflar va raqamlar qabul qila oladi
        </span>
      )}
    </div>
  );
}

export default Username;
