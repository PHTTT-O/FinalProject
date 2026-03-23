export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="mb-12 border-l-4 border-slate-200 pl-6">
          <div className="h-10 w-64 bg-slate-200 rounded-lg mb-3"></div>
          <div className="h-4 w-48 bg-slate-100 rounded-md"></div>
        </div>

        {/* Card Skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-[32px] h-48 border border-slate-100 flex overflow-hidden shadow-sm">
            {/* Left Side (Dark Section) */}
            <div className="bg-slate-100 w-1/3 h-full"></div>
            
            {/* Right Side (Content) */}
            <div className="p-8 flex-1 space-y-4">
              <div className="h-8 w-3/4 bg-slate-100 rounded-lg"></div>
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-slate-50 rounded-md"></div>
                <div className="h-4 w-20 bg-slate-50 rounded-md"></div>
              </div>
              <div className="h-4 w-full bg-slate-50 rounded-md mt-auto"></div>
            </div>
          </div>
        ))}

        {/* Floating Luxury Icon */}
        <div className="fixed bottom-10 right-10 flex items-center gap-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Refining Experience...
            </span>
        </div>
      </div>
    </div>
  );
}