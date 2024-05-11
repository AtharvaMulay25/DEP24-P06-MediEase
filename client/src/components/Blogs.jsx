import React from "react";
import Button from "../layouts/Button";
import BlogCard from "../layouts/BlogCard";
import img1 from "../assets/img/blog1.jpg";
import img2 from "../assets/img/blog2.jpg";
import img3 from "../assets/img/blog3.jpg";
import img4 from "../assets/img/blog4.jpg";
import img5 from "../assets/img/blog5.jpg";
import img6 from "../assets/img/blog6.jpg";

const Blogs = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Latest Posts
          </h1>
        </div>
      </div>
      <div className=" my-8">
        <div className=" flex flex-wrap justify-center gap-5">
          <BlogCard 
            img={img1} 
            headlines="Unraveling the Mysteries of Sleep" 
            post="Ever wondered why we sleep? Dive into the fascinating world of sleep science with us."
          />
          <BlogCard img={img2} headlines="The Heart-Healthy Diet" post="Love your heart with the right foods. Discover the essentials of a heart-healthy diet." />
          <BlogCard
            img={img3}
            headlines="Understanding Pediatric Vaccinations"
            post="Protecting our little ones. Learn about the importance of pediatric vaccinations."
          />
          <BlogCard img={img4} headlines="Navigating Mental Health" post="Mental health matters. Explore insights and support for your well-being."/>
          <BlogCard img={img5} headlines="The Importance of Regular Exercise" post="Move for health. Discover the benefits of staying active."/>
          <BlogCard img={img6} headlines="Skin Health 101" post="Love your skin. Learn how to care for it and keep it glowing."/>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
