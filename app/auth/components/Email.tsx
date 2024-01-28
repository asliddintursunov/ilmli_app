type Props = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isEmailValid: boolean | null;
};

function Email({ setUserData, isEmailValid }: Props) {
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        className="auth_input"
        style={{
          borderColor: isEmailValid === false ? "red" : "",
        }}
        placeholder="example@gmail.com"
        onChange={(e) =>
          setUserData((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      {isEmailValid === false && (
        <span className="text-xs text-red-500">
          Emailingizni tekshiring, nimadir xato ketti!
        </span>
      )}
    </div>
  );
}

export default Email;
