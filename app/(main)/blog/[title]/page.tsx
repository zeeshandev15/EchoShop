import BreadcrumbComponent from "@/components/others/Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { blogPosts } from "@/data/blog/blogData";
import Image from "next/image";
import React from "react";
import PopularPosts from "@/components/blog/PopularPosts";
import AboutMe from "@/components/blog/AboutMe";
import CommentSection from "@/components/blog/CommentSection";

const BlogTitlePage = ({ params }: { params: { title: string } }) => {
  // get data from server based on the params

  const title = params.title.split("%20").join(" ");
  const blog = blogPosts.find((item) => item.title === title);

  const renderContent = () => {
    return blog?.content.map((item, index) => {
      if (item.type === "text") {
        // Render text content as separate paragraphs
        return (
          <p key={index} className="text-xl leading-9">
            {item.text}
          </p>
        );
      } else if (item.type === "image") {
        // Render images with flexible positioning
        return (
          <div key={index} className="relative w-full h-[30rem] mb-8">
            <Image
              className="rounded-md object-contain"
              src={item.src || ""}
              alt={item.alt || "image"}
              layout="fill"
            />
          </div>
        );
      }
    });
  };

  return (
    <section>
      <div className="max-w-screen-xl mx-auto p-4 md:p-12">
        <div className="py-2">
          <BreadcrumbComponent
            links={["/blog"]}
            pageText={blog?.title as string}
          />
        </div>
        {/* blog details  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <div className="space-y-4 lg:col-span-2">
            {/* Blog Title */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold capitalize">
                {blog?.title}
              </h2>
              <div className="text-sm md:text-lg flex items-center gap-2 mt-2 text-blue-500">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Pic</AvatarFallback>
                </Avatar>{" "}
                {blog?.author}
              </div>
            </div>
            <div className="relative w-full h-[30rem]">
              <Image
                src={blog?.image!}
                alt={blog?.title!}
                fill
                className="rounded-md object-contain"
              />
            </div>
            {/* Render Content Dynamically */}
            {renderContent()}
          </div>
          <div className="lg:col-span-1 space-y-4">
            <PopularPosts />
            <AboutMe />
          </div>
        </div>
      </div>
      <div>
        <CommentSection />
      </div>
    </section>
  );
};

export default BlogTitlePage;
