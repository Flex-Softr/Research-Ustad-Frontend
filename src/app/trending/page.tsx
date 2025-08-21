import { TrendingUp, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

const TrendingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <TrendingUp className="h-12 w-12 text-orange-600" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Trending
        </h1>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <Clock className="h-4 w-4" />
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're working hard to bring you specialized training courses in the most in-demand technologies and skills. 
          Get ready for cutting-edge content in cybersecurity, AI & machine learning, data science, and more.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Cybersecurity Training</h3>
            <p className="text-sm text-gray-600">Advanced security protocols and best practices</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI & Machine Learning</h3>
            <p className="text-sm text-gray-600">Cutting-edge AI technologies and applications</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Science</h3>
            <p className="text-sm text-gray-600">Comprehensive data analysis and visualization</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">LLM & ChatGPT</h3>
            <p className="text-sm text-gray-600">Large language models and AI assistants</p>
          </div>
        </div>

        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TrendingPage;
