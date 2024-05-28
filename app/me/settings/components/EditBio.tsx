export default function EditBio() {
  return (
    <div className="w-full">
      <textarea
        name="edit_bio"
        id="edit_bio"
        className="w-full min-h-40 border border-red-500 p-4"
        placeholder="bio"
      />
    </div>
  );
}
