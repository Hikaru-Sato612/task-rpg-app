type Props = {
  exp: number;
  level: number;
  currentExp: number;
  nextExp: number;
};

function Header({ exp, level, currentExp, nextExp }: Props) {
  const getCharacterImage = (level: number) => {
    if (level >= 4) return "/img/cat_3.PNG";
    if (level >= 3) return "/img/cat_2.PNG";
    return "/img/cat_1.PNG";
  };
  return (
    <div className="w-full bg-base-200 pl-10 pr-15 flex items-center shadow gap-2">
      <label
        className="btn btn-circle swap swap-rotate"
        onClick={() => {
          const el = document.getElementById(
            "drawer-toggle",
          ) as HTMLInputElement;
          el.checked = true;
        }}
      >
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />

        {/* hamburger icon */}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
      {/* キャラ */}
      <img
        src={getCharacterImage(level)}
        className="w-[135px] h-auto drop-shadow-lg transition-all duration-300"
      />

      {/* EXPバー */}
      <div className="flex-1">
        <progress
          className="progress progress-success w-full"
          value={currentExp}
          max={nextExp}
        ></progress>

        <p className="text-s">
          Lv.{level} / {currentExp} / {nextExp} EXP
        </p>
      </div>
    </div>
  );
}

export default Header;
