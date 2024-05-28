export default function EditUsername() {
  return (
    <div className="w-full">
      <input
        type="text"
        name="edit_username"
        id="edit_username"
        className="w-full border border-red-500 p-4"
        placeholder="username"
      />
    </div>
  );
}
