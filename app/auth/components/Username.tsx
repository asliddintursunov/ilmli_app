type Props = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  RegExp: boolean | null;
};

function Username({ setUserData, RegExp }: Props) {
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="auth_input"
        style={{
          borderColor: RegExp === false ? "red" : "",
        }}
        placeholder="User0046"
        onChange={(e) =>
          setUserData((prev) => ({ ...prev, username: e.target.value }))
        }
        required
      />
      {RegExp === false && (
        <span className="text-xs text-red-500">
          Username can only contain letters and numbers
        </span>
      )}
    </div>
  );
}

export default Username;
