import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

// If you have a Container component, import it here. Otherwise, use a div with the same classes.
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
);

const posts = [
  {
    title: "10 Data Analytics Trends That Will Shape 2024",
    excerpt:
      "Discover the latest trends in data analytics and how they will impact businesses in the coming year. Learn about AI integration, real-time processing, and predictive analytics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Trends",
  },
  {
    title: "How to Build a Data-Driven Culture in Your Organization",
    excerpt:
      "Learn practical strategies for fostering a data-driven mindset across all levels of your company.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Michael Chen",
    date: "March 12, 2024",
    category: "Strategy",
  },
  {
    title: "The ROI of Business Intelligence: A Complete Guide",
    excerpt:
      "Understand how to measure and maximize the return on investment from your BI initiatives.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    category: "Business",
  },
  {
    title: "Machine Learning in Healthcare: Revolutionizing Patient Care",
    excerpt:
      "Explore how machine learning is transforming healthcare delivery and improving patient outcomes.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Dr. Alex Thompson",
    date: "March 8, 2024",
    category: "Healthcare",
  },
  {
    title: "Cybersecurity Best Practices for Remote Work",
    excerpt:
      "Essential security measures to protect your organization in the era of remote work.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Lisa Wang",
    date: "March 5, 2024",
    category: "Security",
  },
];

const FeaturedBlogCard = ({ post }: { post: (typeof posts)[number] }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 h-full">
    <div className="relative overflow-hidden h-80">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Category badge - top left corner */}
      <div className="absolute top-4 left-4">
        <span className="bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-xs font-semibold shadow-lg border border-gray-200">
          {post.category}
        </span>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Content overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between text-white mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{post.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
        {post.title}
      </h3>

      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 group-hover:w-20 transition-all duration-300"></div>

      <p className="text-gray-600 mb-8 leading-relaxed text-lg text-justify">
        {post.excerpt}
      </p>

      {/* Minimal read more link */}
      <div className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-300">
        Read more →
      </div>
    </div>

    {/* Hover effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/20 group-hover:to-purple-50/20 transition-all duration-500 pointer-events-none rounded-2xl"></div>
  </div>
);

const SmallBlogCard = ({ post }: { post: (typeof posts)[number] }) => (
  <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
    <div className="relative overflow-hidden h-40">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Category badge - top left */}
      <div className="absolute top-3 left-3">
        <span className="bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-gray-200">
          {post.category}
        </span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

      {/* Content overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <User className="h-3 w-3" />
              <span className="text-xs font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Calendar className="h-3 w-3" />
              <span className="text-xs font-medium">{post.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
        {post.title}
      </h3>

      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3 group-hover:w-12 transition-all duration-300"></div>

      <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2 text-justify">
        {post.excerpt}
      </p>

      {/* Minimal read more link */}
      <div className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-300 text-sm">
        Read more →
      </div>
    </div>

    {/* Hover effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/20 group-hover:to-purple-50/20 transition-all duration-500 pointer-events-none rounded-xl"></div>
  </div>
);

const BlogSection = () => {
  const featuredPost = posts[0];
  const smallPosts = posts.slice(1, 5);

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
    >
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Insights
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest trends, best practices, and insights
            from our data experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Blog Card - Left Side */}
          <div className="lg:col-span-1">
            <FeaturedBlogCard post={featuredPost} />
          </div>

          {/* Small Blog Cards Grid - Right Side */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {smallPosts.map((post, idx) => (
                <SmallBlogCard key={idx} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            className="relative group bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand-primary/30 border-0 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden"
            style={{
              borderRadius: "1rem 0 1rem 0",
            }}
          >
            <span className="flex items-center relative z-10 text-lg font-semibold">
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </span>
            {/* Modern gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-white/20 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-brand-secondary/30 rounded-tr-full"></div>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;
