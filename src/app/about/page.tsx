
import React from "react";
import { Star, UtensilsCrossed, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-foodOrange text-white">
        <div className="container mx-auto px-4 py-2 text-center">
          <Image
            width={200}
            height={200}
            src="/logo.png"
            alt="logo"
            className="mx-auto"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Foodiecat
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Innovating food and tech
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Our Story
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
                Foodiecat started as an idea in 2023 by some friends trying to promote a
                restaurant they founded. There was a huge need for marketing and technology
                to increase the digital presence.
              </p>
              <p className="text-lg">
                Foodiecat branched off of that restaurant and became its very own company dedicated
                to serving others in the same industry. We went from zero to three clients in the span of
                a few months and thousands of paying customers view our product every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>
                Whether it is innovating technology or food, we believe in always improving your experience.
              </p>
            </div>
            <div className="text-center">
              <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Connections</h3>
              <p>
                We believe that small businesses, hole-in-the-wall, and Ma and Pa shops will
                always offer a better food experience. Every place will make their dishes differently
                and we are here to use the best technology to connect you with them.
              </p>
            </div>
            <div className="text-center">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">
                Affordibility
              </h3>
              <p>
                We have humble roots and know the struggle to keep a business running. Foodiecat will
                always be free to our clients for basic usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foodOrange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            View all the businesses we currently service
          </h2>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300">
            <Link href={"/business"}>Businesses</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
