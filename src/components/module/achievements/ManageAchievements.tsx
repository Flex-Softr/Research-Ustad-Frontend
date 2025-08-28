"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Trophy,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import type { Achievement } from "@/type/achievement";
import { GetAllAchievements, DeleteAchievement } from "@/services/achievements";
import AchievementForm from "./AchievementForm";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface ManageAchievementsProps {
  data: Achievement[];
}

const ManageAchievements = ({ data: initialData }: ManageAchievementsProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] =
    useState<Achievement | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [achievementToDelete, setAchievementToDelete] =
    useState<Achievement | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await GetAllAchievements();
      if (response?.data) {
        setAchievements(response.data);
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
      toast.error("Failed to fetch achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData.length === 0) {
      fetchAchievements();
    }
  }, [initialData]);

  const filteredAchievements = achievements.filter(
    (achievement) =>
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDelete = (achievement: Achievement) => {
    setAchievementToDelete(achievement);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!achievementToDelete) return;

    try {
      await DeleteAchievement(achievementToDelete._id);
      toast.success("Achievement deleted successfully");
      await fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast.error("Failed to delete achievement");
    } finally {
      setDeleteDialogOpen(false);
      setAchievementToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAchievement(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    fetchAchievements();
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search achievements by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer py-5 duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Achievement
        </Button>
      </div>

      {/* Achievements Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="animate-pulse overflow-hidden border-0 shadow-lg"
            >
              <div className="h-48 bg-gray-200"></div>
              <CardHeader className="pb-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? "No achievements found" : "No achievements yet"}
              </h3>
              <p className="text-gray-600 max-w-md">
                {searchQuery
                  ? "Try adjusting your search terms or browse all achievements."
                  : "Get started by creating your first achievement to showcase your team's accomplishments."}
              </p>
            </div>
            {!searchQuery && (
              <Button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Achievement
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <Card
              key={achievement._id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {achievement.imageUrl ? (
                  <img
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🏆</div>
                      <p className="text-sm font-medium">No Image</p>
                    </div>
                  </div>
                )}

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(achievement)}
                      className="bg-white/90 hover:bg-white text-gray-800 shadow-lg cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(achievement)}
                      className="bg-red-500/90 hover:bg-red-600 cursor-pointer text-white shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Section - Flex container */}
              <div className="flex flex-col flex-1">
              <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {achievement.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1">
                    {achievement.description}
                  </p>

                  {/* Footer - Always at bottom */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-300 mt-4 flex-shrink-0">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(achievement.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(achievement)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(achievement)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Achievement Form Modal */}
      {showForm && (
        <AchievementForm
          achievement={editingAchievement}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Achievement"
        itemName={achievementToDelete?.title || null}
        itemType="achievement"
        description={`Are you sure you want to delete "${achievementToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ManageAchievements;
