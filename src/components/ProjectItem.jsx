const ProjectItem = ({ title, link, imgLink, desc }) => {
  return (
    <>
      <div className="flex w-full gap-6 pb-4 pt-0">
        <a
          target="_blank"
          href="https://notify-fajarkusumaa.vercel.app"
          className="w-1/3 overflow-hidden rounded-xl"
        >
          <img
            src="../../src/assets/images/notify.png"
            alt=""
            className=" h-full object-cover"
          />
        </a>

        <div className="h-full w-2/3">
          <h5 className="mb-2 text-xl font-bold">{title}</h5>
          <p className=" line-clamp-2 h-full text-slate-500">{desc}</p>
          <div className="pills mb-4 mt-2 flex gap-2">
            <span className="rounded-md bg-slate-300 p-2 text-xs font-bold text-slate-600">
              React
            </span>
            <span className="rounded-md bg-slate-300 p-2 text-xs font-bold text-slate-600">
              Tailwind
            </span>
            <span className="rounded-md bg-slate-300 p-2 text-xs font-bold text-slate-600">
              Firebase
            </span>
          </div>
          <a
            target="_blank"
            href={link}
            className="mb-auto flex w-fit rounded-lg bg-slate-700 p-3 text-sm font-bold text-white"
          >
            Live Website
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
