"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthorSearchDropdown from "./author-search-dropdown";
import { Users, Plus, X } from "lucide-react";
import { Author } from "./types";

interface AuthorsSectionProps {
  authors: Author[];
  onAuthorChange: (index: number, author: Author) => void;
  onAddAuthor: () => void;
  onRemoveAuthor: (index: number) => void;
}

const AuthorsSection: React.FC<AuthorsSectionProps> = ({
  authors,
  onAuthorChange,
  onAddAuthor,
  onRemoveAuthor,
}) => {
  const getAuthorDisplayName = (author: Author): string => {
    return author.name || "";
  };

  const handleAuthorChange = (index: number, name: string, role: string, userId?: string) => {
    const updatedAuthor: Author = {
      name,
      role,
      user: userId,
      isRegisteredUser: !!userId,
    };
    onAuthorChange(index, updatedAuthor);
  };

  const handleRoleChange = (index: number, role: string) => {
    const author = authors[index];
    const updatedAuthor: Author = {
      ...author,
      role,
    };
    onAuthorChange(index, updatedAuthor);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Authors</h3>
        <span className="text-red-500 text-sm">*</span>
      </div>

      <div className="space-y-4">
        {authors.map((author, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1">
              <Label className="text-sm text-gray-600 mb-2 block">
                Author {index + 1}
              </Label>
              
              {/* Author Name/Selection */}
              <div className="mb-3">
                <AuthorSearchDropdown
                  value={getAuthorDisplayName(author)}
                  userId={author.user}
                  role={author.role}
                  onChange={(name: string, role: string, userId?: string) => {
                    // console.log(`Author ${index} changed to:`, { name, role, userId });
                    handleAuthorChange(index, name, role, userId);
                  }}
                  placeholder={`Search for author ${index + 1}`}
                />
              </div>

              {/* Author Role */}
              <div className="mb-3">
                <Label className="text-sm text-gray-600 mb-2 block">
                  Role
                </Label>
                <Input
                  type="text"
                  value={author.role || ""}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  placeholder="e.g., Lead Author, Co-Author, Corresponding Author"
                  className="w-full"
                />
              </div>

              {/* Validation Messages */}
              {getAuthorDisplayName(author).trim() !== "" && getAuthorDisplayName(author).trim().length < 2 && (
                <p className="text-sm text-red-500 mt-1">
                  Author name must be at least 2 characters
                </p>
              )}
              
              {author.role && author.role.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">
                  Author role is required
                </p>
              )}
              
              {author.isRegisteredUser && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ Registered user
                </p>
              )}
            </div>
            {authors.length > 1 && (
              <Button
                type="button"
                onClick={() => onRemoveAuthor(index)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-6"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Add Author Button */}
      <Button
        variant="outline"
        type="button"
        onClick={onAddAuthor}
        className="w-full mt-4 border-dashed border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Author
      </Button>
    </div>
  );
};

export default AuthorsSection;
