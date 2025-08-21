import { Globe, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

const LanguagePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Globe className="h-12 w-12 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Language
        </h1>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <Clock className="h-4 w-4" />
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're developing comprehensive language proficiency training programs for global academic and professional opportunities. 
          Get ready for IELTS preparation, PTE training, academic writing, and communication skills development.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">IELTS Preparation</h3>
            <p className="text-sm text-gray-600">Comprehensive IELTS exam preparation</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">PTE Training</h3>
            <p className="text-sm text-gray-600">Pearson Test of English preparation</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Academic Writing</h3>
            <p className="text-sm text-gray-600">Professional academic writing skills</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Communication Skills</h3>
            <p className="text-sm text-gray-600">Effective communication techniques</p>
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

export default LanguagePage;
