import ProjectItem from "../components/ProjectItem";

const Project = () => {
  return (
    <section className="h-screen w-full bg-slate-50 p-8 pt-32">
      <div className="">
        {" "}
        <h1 className="title text-2xl font-bold text-gray-700">Project</h1>
        <div className="mt-5 flex h-full flex-col gap-8 ">
          <ProjectItem
            title={"Notify"}
            link={"https://notify-fajarkusumaa.vercel.app/"}
            desc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa hic rem, placeat veritatis cum, sequi delectus, nobis soluta at quis excepturi maiores magni."
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Project;
