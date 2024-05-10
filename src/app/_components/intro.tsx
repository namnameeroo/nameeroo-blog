import {BlogName} from "./blog-name";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className={"text-4xl md:text-3xl font-bold"}>
        <BlogName />
      </div>
      <h4 className="text-center text-lg mt-5 md:pl-8">(소개글)</h4>
    </section>
  );
}
