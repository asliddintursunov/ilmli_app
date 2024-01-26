export default function SocialAuth() {
  const Buttons: string[] = ["Facebook", "Twitter", "Google"];
  return (
    <div className="grid grid-cols-2 gap-1">
      {Buttons.map((button: string, index: number) => (
        <button key={index} className="btn btn-primary flex-1" type="button">
          {button}
        </button>
      ))}
    </div>
  );
}
