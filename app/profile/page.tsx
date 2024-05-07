export default function Profile() {
  return (
    <main className="flex min-h-screen items-stretch justify-between max-w-[1440px] mx-auto ">
      <div id="userprofile_left" className="ml-4">
        <div className="text-5xl font-semibold">
          <h1>User Fullname</h1>
        </div>
        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="username_tab"
            role="tab"
            className="tab"
            aria-label="Home"
          />
          <div role="username_tabpanel" className="tab-content p-10">
            Home content
          </div>

          <input
            type="radio"
            name="username_tab"
            role="tab"
            className="tab ml-4"
            aria-label="About"
          />
          <div role="username_tabpanel" className="tab-content p-10">
            About content
          </div>
        </div>
      </div>
      <div id="userprofile_right" className="mr-4">
        Userprofile Right
      </div>
    </main>
  );
}
