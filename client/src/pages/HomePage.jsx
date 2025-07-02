import anime from "../assets/anime.webp";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                  <span className="block">Human stories</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    & ideas
                  </span>
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  A modern platform to read, write, and deepen your
                  understanding. Join our community of thinkers and
                  storytellers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {authUser ? (
                  <Link
                    to="/blog/create"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1"
                  >
                    Write Something...
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1"
                  >
                    Get Started
                  </Link>
                )}
                <Link
                  to="/blogs"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-md ring-1 ring-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Explore Stories
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <p className="text-gray-600">
                  Join <span className="font-bold text-blue-600">10,000+</span>{" "}
                  creators
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>

              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={anime}
                  alt="Featured content"
                  className="w-full h-auto object-cover transform transition-all duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">
                    Featured Story
                  </h3>
                  <p className="text-gray-200">
                    Discover what our community is writing about
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Designed for storytellers
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to share your ideas with the world
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
                title: "Beautiful Writing",
                description:
                  "Our editor makes your words look as good as they sound with clean formatting options.",
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Engaged Community",
                description:
                  "Connect with readers who care about what you have to say and build your audience.",
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
                title: "Performance Insights",
                description:
                  "Understand how your stories perform with detailed analytics and reader engagement metrics.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6 h-12 w-12 rounded-lg bg-white shadow-md flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to share your story?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of writers who've found their voice on our platform.
          </p>
          <div className="mt-8">
            {authUser ? (
              <Link
                to="blogs"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                Start Writing Now
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                Create Your Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
