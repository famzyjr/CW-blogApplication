const DetailsSkeleton = () => {
  return (
    <article className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden animate-pulse">
      
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        
        {/* Blog Badge */}
        <div className="h-6 w-12 rounded-full bg-gray-200"></div>

        {/* Title */}
        <div className="mt-7">
          <div className="h-10 w-3/5 rounded-lg bg-gray-200"></div>
        </div>

        {/* Author + Actions */}
        <div className="mt-16 flex items-center justify-between flex-wrap gap-5">
          
          {/* Author */}
          <div className="flex items-center gap-4">
            
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>

            {/* Author Details */}
            <div className="space-y-2">
              <div className="h-4 w-20 rounded bg-gray-200"></div>

              <div className="h-3 w-48 rounded bg-gray-200"></div>
            </div>
          </div>

          {/* Edit + Delete */}
          <div className="flex gap-3">
            <div className="h-10 w-12 rounded-lg bg-gray-200"></div>

            <div className="h-10 w-16 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-8 min-h-[150px]">
        
        {/* Content lines */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200"></div>

          <div className="h-4 w-11/12 rounded bg-gray-200"></div>

          <div className="h-4 w-9/12 rounded bg-gray-200"></div>
        </div>
      </div>
      
    </article>
  );
};

export default DetailsSkeleton;