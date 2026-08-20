import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiEdit3,
  FiGlobe,
} from "react-icons/fi";

const Welcome = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gray-100 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-32 lg:pb-28">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-black"
            />

            <span>Welcome to IBlog</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Where ideas become
            <span className="block text-gray-400">
              stories.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
            Discover thoughtful stories, share your experiences, and connect
            with writers from around the world. Your next great idea starts
            here.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/blogs"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Explore Blogs

              <FiArrowRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/createblogs"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-3.5 font-semibold text-gray-900 transition-all duration-300 hover:border-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Start Writing
            </Link>
          </div>

          {/* Social Proof */}
          <div
            className="mt-10 flex items-center gap-3 text-sm text-gray-500"
            aria-label="Join a growing community of writers"
          >
            <div
              className="flex -space-x-2"
              aria-hidden="true"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white ring-2 ring-white">
                A
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold ring-2 ring-white">
                J
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-xs font-semibold text-white ring-2 ring-white">
                M
              </div>
            </div>

            <span>Join a growing community of writers</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="border-t border-gray-100 bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* Section Heading */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Everything you need
            </p>

            <h2
              id="features-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              A simple place for great ideas.
            </h2>

            <p className="mt-4 text-gray-500">
              Read, write, and connect without the unnecessary complexity.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Read */}
            <article className="group rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                aria-hidden="true"
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"
              >
                <FiBookOpen size={22} />
              </div>

              <h3 className="text-xl font-bold">
                Read
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Discover thoughtful stories, perspectives, and ideas from
                different writers.
              </p>

              <Link
                to="/blogs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                Explore stories

                <FiArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </article>

            {/* Create */}
            <article className="group rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                aria-hidden="true"
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"
              >
                <FiEdit3 size={22} />
              </div>

              <h3 className="text-xl font-bold">
                Create
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Turn your thoughts into meaningful stories and share them
                with the world.
              </p>

              <Link
                to="/createblogs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                Start writing

                <FiArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </article>

            {/* Connect */}
            <article className="group rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                aria-hidden="true"
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"
              >
                <FiGlobe size={22} />
              </div>

              <h3 className="text-xl font-bold">
                Connect
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Share ideas, discover new perspectives, and become part of a
                community of curious minds.
              </p>

              <Link
                to="/blogs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                Join the community

                <FiArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        aria-labelledby="cta-heading"
        className="bg-black text-white"
      >
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
          <h2
            id="cta-heading"
            className="text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Have something to say?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
            Your perspective might be exactly what someone needs to read
            today. Start writing and share your story.
          </p>

          <Link
            to="/createblogs"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            Write your first blog

            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Welcome;