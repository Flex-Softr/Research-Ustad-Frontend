"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Globe, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { InternationalConference } from "@/type/internationalConference";
import {
  GetAllInternationalConferences,
  DeleteInternationalConference,
} from "@/services/internationalConferences";
import InternationalConferenceForm from "./InternationalConferenceForm";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface ManageInternationalConferencesProps {
  data: InternationalConference[];
}

const ManageInternationalConferences = ({
  data: initialData,
}: ManageInternationalConferencesProps) => {
  const [conferences, setConferences] =
    useState<InternationalConference[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingConference, setEditingConference] =
    useState<InternationalConference | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conferenceToDelete, setConferenceToDelete] =
    useState<InternationalConference | null>(null);

  const fetchConferences = async () => {
    try {
      setLoading(true);
      const response = await GetAllInternationalConferences();
      if (response?.success && response?.data) {
        setConferences(response.data);
      }
    } catch (error) {
      console.error("Error fetching conferences:", error);
      toast.error("Failed to fetch conferences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setConferences(initialData);
  }, [initialData]);

  const filteredConferences = conferences.filter(
    (conference) =>
      conference.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conference.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (conference: InternationalConference) => {
    setEditingConference(conference);
    setShowForm(true);
  };

  const handleDelete = (conference: InternationalConference) => {
    setConferenceToDelete(conference);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!conferenceToDelete) return;

    try {
      await DeleteInternationalConference(conferenceToDelete._id);
      toast.success("Conference deleted successfully");
      fetchConferences();
      setDeleteDialogOpen(false);
      setConferenceToDelete(null);
    } catch (error) {
      console.error("Error deleting conference:", error);
      toast.error("Failed to delete conference");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingConference(null);
  };

  const handleFormSuccess = () => {
    fetchConferences();
    handleFormClose();
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Section */}

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conferences by title or description..."
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
          Add Conference
        </Button>
      </div>

      {/* Conferences Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="overflow-hidden border-0 shadow-lg bg-white"
            >
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <CardHeader className="pb-3">
                <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredConferences.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery ? "No conferences found" : "No conferences yet"}
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? "Try adjusting your search terms."
              : "Get started by creating your first international conference."}
          </p>
          {!searchQuery && (
            <Button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Conference
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConferences.map((conference, index) => (
            <Card
              key={conference._id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {conference.imageUrl ? (
                  <img
                    src={conference.imageUrl}
                    alt={conference.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🌍</div>
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
                      onClick={() => handleEdit(conference)}
                      className="bg-white/90 hover:bg-white text-gray-800 shadow-lg cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(conference)}
                      className="bg-red-500/90 hover:bg-red-600 text-white shadow-lg cursor-pointer"
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
                    {conference.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1">
                    {conference.description}
                  </p>

                  {/* Footer - Always at bottom */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-300 mt-4 flex-shrink-0">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(conference.createdAt).toLocaleDateString(
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
                        onClick={() => handleEdit(conference)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(conference)}
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

      {/* Conference Form Modal */}
      {showForm && (
        <InternationalConferenceForm
          conference={editingConference}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Conference"
        itemName={conferenceToDelete?.title || null}
        itemType="conference"
        description={`Are you sure you want to delete "${conferenceToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ManageInternationalConferences;
