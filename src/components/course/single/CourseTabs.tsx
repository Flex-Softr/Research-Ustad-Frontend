import { BookOpen, Video, User } from "lucide-react";

interface CourseTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CourseTabs = ({ activeTab, setActiveTab }: CourseTabsProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "curriculum", label: "Curriculum", icon: Video },
    { id: "instructor", label: "Instructor", icon: User },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center md:gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === tab.id
                  ? "border-brand-secondary text-brand-secondary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default CourseTabs;
