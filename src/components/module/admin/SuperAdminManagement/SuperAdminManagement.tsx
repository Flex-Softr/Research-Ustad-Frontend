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
// import { Alert, AlertDescription } from "@/components/ui/alert";
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
} from "lucide-react";
import { toast } from "sonner";
import {
  GetCurrentSuperAdmin,
  ReplaceSuperAdmin,
} from "@/services/Users/superAdmin";
import { GetAllUsers } from "@/services/Users";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
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

  console.log("userssss", users);

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

    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to replace yourself as SuperAdmin with ${selectedUser.fullName}?\n\n` +
        `This action will:\n` +
        `• Demote you to Admin role\n` +
        `• Promote ${selectedUser.fullName} to SuperAdmin role\n` +
        `• Give them full system access\n\n` +
        `This action cannot be undone!`
    );

    if (!confirmed) return;

    try {
      setReplacing(true);
      const response = await ReplaceSuperAdmin(selectedUserId);

      if (response?.success) {
        toast.success("SuperAdmin replaced successfully!");
        setCurrentSuperAdmin(response.data.newSuperAdmin);
        setSelectedUserId("");

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
          <AlertDialog>
            <AlertTriangle className="h-4 w-4" />
            <AlertDialogDescription>
              <strong>Warning:</strong> This action will demote you to Admin
              role and promote the selected user to SuperAdmin. Only perform
              this action if you are certain about the transfer of ownership.
            </AlertDialogDescription>
          </AlertDialog>

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
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-orange-800">
                    Confirmation Required
                  </span>
                </div>
                <p className="text-sm text-orange-700">
                  You are about to replace yourself as SuperAdmin with{" "}
                  <strong>
                    {users.find((u) => u._id === selectedUserId)?.fullName}
                  </strong>
                  . This action cannot be undone.
                </p>
              </div>
            )}

            <Button
              onClick={handleReplaceSuperAdmin}
              disabled={!selectedUserId || replacing}
              className="w-full bg-orange-500 hover:bg-orange-600"
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
    </div>
  );
};

export default SuperAdminManagement;
