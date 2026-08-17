const BlogSkeleton = () => {
  return (
    <article className="flex flex-col h-full min-h-[380px] rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm animate-pulse">
      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-gray-200"></div>

        <div className="flex-1">
          {/* Author name */}
          <div className="h-4 w-32 rounded bg-gray-200"></div>

          {/* Reading time */}
          <div className="h-3 w-24 rounded bg-gray-200 mt-2"></div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-5 space-y-3">
        <div className="h-7 w-full rounded bg-gray-200"></div>
        <div className="h-7 w-3/4 rounded bg-gray-200"></div>
      </div>

      {/* Description */}
      <div className="mt-4 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 flex items-center justify-between">
        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="h-4 w-8 rounded bg-gray-200"></div>
          <div className="h-4 w-8 rounded bg-gray-200"></div>
          <div className="h-5 w-5 rounded bg-gray-200"></div>
        </div>

        {/* Read More button */}
        <div className="h-10 w-24 rounded-full bg-gray-200"></div>
      </div>
    </article>
  );
};

export default BlogSkeleton;
