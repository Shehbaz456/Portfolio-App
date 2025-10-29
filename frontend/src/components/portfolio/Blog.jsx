const Blog = ({ data }) => {
  if (!data?.blog || data.blog.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Latest <span className="text-red-500">Blog Posts</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.blog.map((post) => (
            <div
              key={post._id}
              className="card card-hover"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h3>
                <p className="text-slate-600 line-clamp-4">{post.summary}</p>
                <button className="mt-4 text-yellow-500 font-semibold hover:text-yellow-600 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
