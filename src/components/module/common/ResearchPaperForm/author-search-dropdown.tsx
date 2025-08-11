"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { SearchUsers, GetAllUsers } from '@/services/allreserchPaper';
import { Search, X, User, Plus } from 'lucide-react';

interface User {
  _id: string;
  fullName: string;
  email: string;
  designation?: string;
}

interface AuthorSearchDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const AuthorSearchDropdown: React.FC<AuthorSearchDropdownProps> = ({
  value,
  onChange,
  placeholder = "Search for an author...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedAllUsers, setHasLoadedAllUsers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load all users when component mounts
  useEffect(() => {
    loadAllUsers();
  }, []);





  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchUsers(searchQuery);
      } else if (searchQuery.trim().length === 0 && isOpen) {
        // Show all users when search is empty and dropdown is open
        setUsers(allUsers);
      } else {
        setUsers([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isOpen, allUsers]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadAllUsers = async () => {
    if (hasLoadedAllUsers) return;
    
    setLoading(true);
    try {
      const response = await GetAllUsers();
      const usersData = response.data || [];
      setAllUsers(usersData);
      setHasLoadedAllUsers(true);
    } catch (error) {
      console.error('Error loading all users:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    try {
      const response = await SearchUsers(query);
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error searching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (!hasLoadedAllUsers) {
      loadAllUsers();
    }
    // Show all users when input is focused and no search query
    if (searchQuery.trim().length === 0) {
      setUsers(allUsers);
    }
  };

  const handleUserSelect = (user: User) => {
    onChange(user.fullName);
    setSearchQuery(user.fullName);
    setIsOpen(false);
  };

  const handleCustomInput = () => {
    // Directly add the custom author name without showing modal
    const authorName = searchQuery.trim();
    if (authorName) {
      onChange(authorName);
      setSearchQuery(authorName);
      setIsOpen(false);
    }
  };



  const clearInput = () => {
    setSearchQuery('');
    onChange('');
    setUsers(allUsers); // Show all users when cleared
  };

  // Determine what to show in dropdown
  const getDropdownContent = () => {
    if (loading) {
      return (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <div className="text-sm font-medium">Loading users...</div>
          <div className="text-xs text-gray-400 mt-1">Please wait while we fetch the user list</div>
        </div>
      );
    }

    if (searchQuery.trim().length >= 2) {
      // Search results
      if (users.length > 0) {
        return (
          <>
            <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50 border-b border-gray-100 font-medium">
              Search Results ({users.length})
            </div>
            {users.map((user) => (
              <button
                key={user._id}
                type="button"
                onClick={() => handleUserSelect(user)}
                className="w-full px-3 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {user.fullName}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {user.email}
                    {user.designation && ` • ${user.designation}`}
                  </div>
                </div>
              </button>
            ))}
            <button
              type="button"
              onClick={handleCustomInput}
              className="w-full px-3 py-3 text-left hover:bg-blue-50 flex items-center space-x-3 border-t border-gray-100 text-blue-600 font-medium transition-colors duration-150"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Add custom author</div>
                <div className="text-sm text-blue-500">"{searchQuery}"</div>
              </div>
            </button>
          </>
        );
      } else {
        return (
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-gray-700 font-medium text-lg mb-1">No users found</div>
              <div className="text-sm text-gray-500">No registered users match your search</div>
            </div>
            <button
              type="button"
              onClick={handleCustomInput}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-3 text-blue-600 font-medium transition-colors duration-150 rounded-lg border border-blue-200"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Add custom author</div>
                <div className="text-sm text-blue-500">"{searchQuery}"</div>
              </div>
            </button>
          </div>
        );
      }
    } else {
      // Show all users when no search query
      if (allUsers.length > 0) {
        return (
          <>
            <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50 border-b border-gray-100 font-medium">
              All Users ({allUsers.length})
            </div>
            {allUsers.map((user) => (
              <button
                key={user._id}
                type="button"
                onClick={() => handleUserSelect(user)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {user.fullName}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {user.email}
                    {user.designation && ` • ${user.designation}`}
                  </div>
                </div>
              </button>
            ))}
            <div className="px-3 py-3 text-sm text-gray-500 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">💡</span>
                </div>
                <span>Type to search for specific users or add custom authors</span>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <div className="text-gray-700 font-medium">No users available</div>
            <div className="text-sm text-gray-500 mt-1">Try typing to search or add a custom author</div>
          </div>
        );
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="pr-10"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearInput}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
          {getDropdownContent()}
        </div>
      )}


    </div>
  );
};

export default AuthorSearchDropdown;
