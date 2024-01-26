"use client";
type Props = {
  authType: "signin" | "signup";
};

function Button({ authType }: Props) {
  return (
    <button className="btn btn-circle btn-warning w-full">
      {authType === "signin" && "SIGN IN"}
      {authType === "signup" && "SIGN UP"}
    </button>
  );
}

export default Button;
