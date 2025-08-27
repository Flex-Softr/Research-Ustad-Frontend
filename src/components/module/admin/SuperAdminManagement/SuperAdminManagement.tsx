"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Users,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  GetCurrentSuperAdmin,
  ReplaceSuperAdmin,
} from "@/services/Users/superAdmin";
import { GetAllUsers } from "@/services/Users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import UserAvatar from "@/components/shared/UserAvatar";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  designation: string;
  image: string;
}

interface SuperAdmin {
  id: string;
  email: string;
  fullName: string;
  role: string;
  designation: string;
}

const SuperAdminManagement = () => {
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState<SuperAdmin | null>(
    null
  );
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [replacing, setReplacing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [superAdminResponse, usersResponse] = await Promise.all([
        GetCurrentSuperAdmin(),
        GetAllUsers(),
      ]);

      if (superAdminResponse?.success) {
        setCurrentSuperAdmin(superAdminResponse.data);
      }

      if (usersResponse?.success) {
        // Filter out the current superAdmin and only show admin and user roles
        const filteredUsers = usersResponse.data.filter(
          (user: User) => user.role !== "superAdmin"
        );
        setUsers(filteredUsers);
      }
    } catch (err) {
      setError("Failed to fetch data");
      toast.error("Failed to load SuperAdmin management data");
    } finally {
      setLoading(false);
    }
  };

  const handleReplaceSuperAdmin = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user to replace SuperAdmin");
      return;
    }

    const selectedUser = users.find((user) => user._id === selectedUserId);
    if (!selectedUser) {
      toast.error("Selected user not found");
      return;
    }

    // Show custom confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmReplace = async () => {
    const selectedUser = users.find((user) => user._id === selectedUserId);
    if (!selectedUser) {
      toast.error("Selected user not found");
      return;
    }

    try {
      setReplacing(true);
      const response = await ReplaceSuperAdmin(selectedUserId);

      if (response?.success) {
        toast.success("SuperAdmin replaced successfully!");
        setCurrentSuperAdmin(response.data.newSuperAdmin);
        setSelectedUserId("");
        setShowConfirmDialog(false);

        // Refresh the users list
        await fetchData();
      } else {
        toast.error(response?.message || "Failed to replace SuperAdmin");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to replace SuperAdmin");
    } finally {
      setReplacing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <AlertDialog>
        <AlertTriangle className="h-4 w-4" />
        <AlertDialogDescription>{error}</AlertDialogDescription>
      </AlertDialog>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            SuperAdmin Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage SuperAdmin privileges and transfer ownership
          </p>
        </div>
      </div>

      {/* Current SuperAdmin Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Current SuperAdmin
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentSuperAdmin ? (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Crown className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {currentSuperAdmin.fullName}
                  </h3>
                  <p className="text-gray-600">{currentSuperAdmin.email}</p>
                  <p className="text-sm text-gray-500">
                    {currentSuperAdmin.designation}
                  </p>
                </div>
              </div>
              <Badge variant="default" className="bg-blue-500">
                SuperAdmin
              </Badge>
            </div>
          ) : (
            <AlertDialog>
              <AlertTriangle className="h-4 w-4" />
              <AlertDialogDescription>
                No SuperAdmin found in the system
              </AlertDialogDescription>
            </AlertDialog>
          )}
        </CardContent>
      </Card>

      {/* Replace SuperAdmin Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-orange-500" />
            Replace SuperAdmin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 mb-1">
                  ⚠️ Important Warning
                </h4>
                <p className="text-sm text-orange-700">
                  This action will demote you to Admin role and promote the selected user to SuperAdmin. 
                  Only perform this action if you are certain about the transfer of ownership. 
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New SuperAdmin
              </label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {selectedUserId
                      ? users.find((u) => u._id === selectedUserId)?.fullName
                      : "Choose a user to promote to SuperAdmin"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{user.fullName}</span>
                        <Badge variant="outline" className="ml-auto">
                          {user.role}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUserId && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-blue-800">
                    Selected Candidate
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={users.find((u) => u._id === selectedUserId)?.image}
                    alt={users.find((u) => u._id === selectedUserId)?.fullName || ""}
                    name={users.find((u) => u._id === selectedUserId)?.fullName || ""}
                    size="md"
                  />
                  <div>
                    <p className="text-sm text-blue-700">
                      <strong>
                        {users.find((u) => u._id === selectedUserId)?.fullName}
                      </strong>{" "}
                      will be promoted to SuperAdmin role.
                    </p>
                    <p className="text-xs text-blue-600">
                      {users.find((u) => u._id === selectedUserId)?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleReplaceSuperAdmin}
              disabled={!selectedUserId || replacing}
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              {replacing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Replacing SuperAdmin...
                </>
              ) : (
                <>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Replace SuperAdmin
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Available Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <UserAvatar
                      src={user?.image}
                      alt={user?.fullName}
                      name={user?.fullName}
                      size="md"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <p className="text-xs text-gray-500">{user?.designation}</p>
                  </div>
                </div>
                <Badge
                  variant={user?.role === "admin" ? "default" : "secondary"}
                >
                  {user?.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm SuperAdmin Replacement
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <span className="block bg-red-50 p-4 rounded-lg border border-red-200">
                <span className="block text-sm text-red-800 font-medium mb-2">
                  Are you absolutely sure you want to replace yourself as SuperAdmin?
                </span>
                <span className="block text-xs text-red-700">
                  This action cannot be undone and will permanently change your role.
                </span>
              </span>
              
              <span className="block space-y-3">
                <span className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="p-2 bg-orange-100 rounded-full">
                    <Crown className="h-4 w-4 text-orange-600" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-orange-800">You will become:</span>
                    <span className="block text-xs text-orange-700">Admin Role</span>
                  </span>
                </span>
                
                <span className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="p-2 bg-green-100 rounded-full">
                    <User className="h-4 w-4 text-green-600" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-green-800">
                      {users.find((u) => u._id === selectedUserId)?.fullName} will become:
                    </span>
                    <span className="block text-xs text-green-700">SuperAdmin Role</span>
                  </span>
                </span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={replacing}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReplace}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={replacing}
            >
              {replacing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Replacing...
                </>
              ) : (
                "Confirm Replacement"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SuperAdminManagement;
