import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';

const BlogSection = ({ data, updateData }) => {
  const handleBlogChange = (index, field, value) => {
    const newBlog = [...data.blog];
    newBlog[index] = {
      ...newBlog[index],
      [field]: value
    };
    updateData('blog', newBlog);
  };

  const addBlog = () => {
    updateData('blog', [...data.blog, { title: '', summary: '' }]);
  };

  const removeBlog = (index) => {
    const newBlog = data.blog.filter((_, i) => i !== index);
    updateData('blog', newBlog.length > 0 ? newBlog : [{ title: '', summary: '' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            <FaPencilAlt className="inline mr-2 text-yellow-500" />
            Blog Posts (Optional)
          </h3>
          <p className="text-slate-600">Share your thoughts and expertise</p>
        </div>
        <button
          type="button"
          onClick={addBlog}
          className="btn-primary"
        >
          <FaPlus className="inline mr-2" />
          Add Post
        </button>
      </div>

      {data.blog.length > 0 ? (
        <div className="space-y-6">
          {data.blog.map((post, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeBlog(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-colors"
              >
                <FaTrash />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-400 text-slate-900 rounded-full font-bold">
                  {index + 1}
                </div>

                {/* Blog Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={post.title || ''}
                    onChange={(e) => handleBlogChange(index, 'title', e.target.value)}
                    placeholder="e.g., 10 Tips for Better React Performance"
                    className="input-field"
                  />
                </div>

                {/* Blog Summary */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Summary
                  </label>
                  <textarea
                    value={post.summary || ''}
                    onChange={(e) => handleBlogChange(index, 'summary', e.target.value)}
                    placeholder="Brief summary of your blog post..."
                    rows="3"
                    className="input-field resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <FaPencilAlt className="text-5xl text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No blog posts yet (Optional)</p>
          <button type="button" onClick={addBlog} className="btn-secondary">
            <FaPlus className="inline mr-2" />
            Add Your First Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
