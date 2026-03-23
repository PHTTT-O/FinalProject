export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ส่วน Hero จำลอง */}
      <div className="bg-gray-200 h-[400px] w-full animate-pulse flex items-center justify-center">
        <div className="h-12 bg-gray-300 w-64 rounded-xl"></div>
      </div>

      {/* ส่วน Catalog จำลอง */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="h-8 bg-gray-200 w-48 mb-8 rounded"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <div className="bg-gray-200 h-48 rounded-2xl mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}