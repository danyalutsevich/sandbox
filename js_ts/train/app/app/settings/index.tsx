import { useState } from "react";
import { ScrollView, View, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserIcon, Mail, Calendar, Shield } from "lucide-react-native";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Role } from "@/utils/types/role";
import { Colors } from "@/utils/colors";
import { useAuth } from "@/utils/hooks/auth";

export default function SettingsScreen() {
  const auth = useAuth();
  // const [user, setUser] = useState<User | null>(auth.user);
  const user = auth.user;
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: user?.username,
    email: user?.email,
  });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false);

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  // TODO: Integrate with backend
  // Upload profile updates to the backend, handle errors, and update local user state
  // Upload user avatar

  const handleProfileUpdate = async () => {
    try {
      setIsEditingProfile(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.log("Failed to update profile");
    }
  };

  const handleLogout = () => {
    auth.logout();
    setShowLogoutDialog(false);
  };

  const handlePasswordReset = () => {
    console.log("Password reset link sent to your email");
    setShowPasswordResetDialog(false);
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case Role.admin:
        return "destructive";
      case Role.user:
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.primary,
              marginBottom: 8,
            }}
          >
            Settings
          </Text>
          <Text
            style={{
              fontSize: 16,
              // color: colors.mutedForeground,
            }}
          >
            Manage your account and preferences
          </Text>
        </View>

        {/* Profile Information Card */}
        <Card style={{ padding: 20, marginBottom: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <UserIcon color={colors.foreground} size={20} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.foreground,
                }}
              >
                Profile Information
              </Text>
            </View>
            <Text style={{ color: colors.mutedForeground }}>
              View and manage your account details
            </Text>
          </View>

          {/* Avatar and User Info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1, gap: 8 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: colors.foreground,
                  }}
                >
                  {user?.username}
                </Text>
                {/* <Badge variant={getRoleColor(user.role)}>{user.role}</Badge> */}
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Mail color={colors.mutedForeground} size={16} />
                <Text style={{ color: colors.mutedForeground }}>
                  {user?.email}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Calendar color={colors.mutedForeground} size={16} />
                <Text style={{ color: colors.mutedForeground }}>
                  {/* Member since {user?.createdAt?.toLocaleDateString()} */}
                </Text>
              </View>
            </View>
          </View>

          {/* Form Fields */}
          <View style={{ gap: 16, marginBottom: 20 }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.foreground,
                  marginBottom: 8,
                }}
              >
                Username
              </Text>
              <Input
                value={isEditingProfile ? profileForm.username : user?.username}
                onChangeText={(text) =>
                  setProfileForm((prev) => ({ ...prev, username: text }))
                }
                editable={isEditingProfile}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.foreground,
                  marginBottom: 8,
                }}
              >
                Email
              </Text>
              <Input
                value={isEditingProfile ? profileForm.email : user?.email}
                onChangeText={(text) =>
                  setProfileForm((prev) => ({ ...prev, email: text }))
                }
                editable={isEditingProfile}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            {!isEditingProfile ? (
              <Button onPress={() => setIsEditingProfile(true)}>
                <Text className="text-white">Edit Profile</Text>
              </Button>
            ) : (
              <>
                <Button onPress={handleProfileUpdate} style={{ flex: 1 }}>
                  <Text className="text-white">Save Changes</Text>
                </Button>
                <Button
                  variant="outline"
                  onPress={() => {
                    setIsEditingProfile(false);
                    setProfileForm({
                      username: user?.username,
                      email: user?.email,
                    });
                  }}
                  style={{ flex: 1 }}
                >
                  <Text>Cancel</Text>
                </Button>
              </>
            )}
          </View>
        </Card>

        {/* Security Settings Card */}
        <Card style={{ padding: 20, marginBottom: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Shield color={colors.foreground} size={20} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.foreground,
                }}
              >
                Security Settings
              </Text>
            </View>
            <Text style={{ color: colors.mutedForeground }}>
              Manage your password and account security
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: colors.foreground,
                }}
              >
                Password
              </Text>
              <Text style={{ fontSize: 14, color: colors.mutedForeground }}>
                {/* Last updated {user?.updatedAt?.toLocaleDateString()} */}
              </Text>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <Button
              variant="outline"
              onPress={() => setShowPasswordResetDialog(true)}
            // icon={<Key color={colors.foreground} size={16} />}
            >
              <Text>Change Password</Text>
            </Button>
            <Button
              variant="outline"
              onPress={() => setShowPasswordResetDialog(true)}
            >
              <Text>Reset Password</Text>
            </Button>
          </View>
        </Card>

        {/* Account Actions Card */}
        <Card style={{ padding: 20, marginBottom: 32 }}>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.foreground,
                marginBottom: 8,
              }}
            >
              Account Actions
            </Text>
            <Text style={{ color: colors.mutedForeground }}>
              Manage your account session and access
            </Text>
          </View>

          <AlertDialog
            open={showLogoutDialog}
            onOpenChange={setShowLogoutDialog}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
              // icon={<LogOut color={colors.destructiveForeground} size={16} />}
              >
                <Text>Logout</Text>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout? You will need to sign in
                  again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Text>Cancel</Text>
                </AlertDialogCancel>
                <AlertDialogAction onPress={handleLogout}>
                  <Text className="text-white">Logout</Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>

        {/* Password Reset Confirmation Dialog */}
        <AlertDialog
          open={showPasswordResetDialog}
          onOpenChange={setShowPasswordResetDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Password</AlertDialogTitle>
              <AlertDialogDescription>
                A password reset link will be sent to your email address. You
                will receive instructions on how to create a new password.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction onPress={handlePasswordReset}>
                <Text className="text-white">Send Reset Link</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ScrollView>
    </SafeAreaView>
  );
}
