type Props = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  RegExp: boolean | null;
};

function Email({ setUserData, RegExp }: Props) {
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        className="auth_input"
        style={{
          borderColor: RegExp === false ? "red" : "",
        }}
        placeholder="example@gmail.com"
        onChange={(e) =>
          setUserData((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      {RegExp === false && (
        <span className="text-xs text-red-500">
          Double check your email, somethiong&#39;s missing!
        </span>
      )}
    </div>
  );
}

export default Email;
