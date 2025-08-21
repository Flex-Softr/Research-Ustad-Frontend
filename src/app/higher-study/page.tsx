import { GraduationCap, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

const HigherStudyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <GraduationCap className="h-12 w-12 text-purple-600" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Higher Study
        </h1>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <Clock className="h-4 w-4" />
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're preparing comprehensive resources and guidance for international education and scholarship opportunities. 
          Get ready to explore abroad opportunities, scholarship news, university guidance, and application support.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Abroad Opportunities</h3>
            <p className="text-sm text-gray-600">International study programs and universities</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Scholarship News</h3>
            <p className="text-sm text-gray-600">Latest scholarship opportunities and updates</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">University Guidance</h3>
            <p className="text-sm text-gray-600">Expert advice on university selection</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Application Support</h3>
            <p className="text-sm text-gray-600">Step-by-step application assistance</p>
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

export default HigherStudyPage;
