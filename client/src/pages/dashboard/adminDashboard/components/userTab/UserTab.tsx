import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TabsContent } from "@/components/ui/tabs"
import { Check, Edit2, Loader2, MoreHorizontal, Search, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import {
    useGetAllUsersQuery,
    useUpdateUserStatusMutation,
    useUpdateUserRoleMutation,
    useDeleteUserMutation
} from "@/redux/features/dashboard/adminDashboard/userManagementApi"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "react-hot-toast"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const UserTab = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [delayedSearch, setDelayedSearch] = useState("");
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [roleDialog, setRoleDialog] = useState({ isOpen: false, userId: "", currentRole: "" });
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        clearTimeout(Number(localStorage.getItem("searchTimeout")));
        const timeout = setTimeout(() => {
            setDelayedSearch(value);
            setPage(1);
        }, 500);
        localStorage.setItem("searchTimeout", timeout.toString());
    };

    const { data: userData, isLoading, isFetching, error } = useGetAllUsersQuery({
        page,
        limit,
        search: delayedSearch
    });
    const [updateUserStatus, { isLoading: isStatusUpdating }] = useUpdateUserStatusMutation();
    const [updateUserRole, { isLoading: isRoleUpdating }] = useUpdateUserRoleMutation();
    const [, { isLoading: isDeleting }] = useDeleteUserMutation();

    const handleStatusToggle = (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        try {
            updateUserStatus({ userId, status: newStatus })
                .unwrap()
                .then(() => {
                    toast.success(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
                })
                .catch(() => {
                    toast.error("Failed to update user status");
                });
        } catch (err) {
            toast.error("Failed to update user status");
        }
    };

    const handleRoleChange = (userId: string, role: string) => {
        try {
            updateUserRole({ userId, role })
                .unwrap()
                .then(() => {
                    toast.success(`User role updated to ${role}`);
                    setRoleDialog({ isOpen: false, userId: "", currentRole: "" });
                })
                .catch(() => {
                    toast.error("Failed to update user role");
                });
        } catch (err) {
            toast.error("Failed to update user role");
            setRoleDialog({ isOpen: false, userId: "", currentRole: "" });
        }
    };

    const handleUserDelete = async () => {
        if (!userToDelete) return;

        try {
            //   await deleteUser(userToDelete).unwrap();
             toast.success("User deleted funtion disabled")
            setUserToDelete(null);
        } catch (err) {
            toast.error("Failed to delete user");
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (userData && page < userData.pagination.pages) {
            setPage(page + 1);
        }
    };

    return (
        <TabsContent value="users" className="space-y-4">
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                View and manage user accounts
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search users..."
                                    className="w-[200px] pl-8"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <Select value={limit.toString()} onValueChange={(value) => { setLimit(Number(value)); setPage(1); }}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="10 per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Per Page</SelectLabel>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">
                            Failed to load users. Please try again.
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md border">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-muted/50 text-muted-foreground">
                                            <th className="py-3 px-4 text-left font-medium">Name</th>
                                            <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Email</th>
                                            <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Role</th>
                                            <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Status</th>
                                            <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Joined</th>
                                            <th className="py-3 px-4 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData?.data?.users?.map((user: any) => (
                                            <tr key={user._id} className="border-b hover:bg-muted/50 transition-colors">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-muted-foreground text-xs md:hidden">{user.email}</div>
                                                </td>
                                                <td className="py-3 px-4 hidden md:table-cell">{user.email}</td>
                                                <td className="py-3 px-4 hidden lg:table-cell">
                                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-yellow-500/10 text-yellow-500" :
                                                            user.role === "premium" ? "bg-blue-500/10 text-blue-500" :
                                                                "bg-gray-500/10 text-gray-500"
                                                        }`}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 hidden md:table-cell">
                                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-500/10 text-green-500" :
                                                            "bg-red-500/10 text-red-500"
                                                        }`}>
                                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 hidden lg:table-cell">
                                                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <DropdownMenu
                                                        open={dropdownOpen === user._id}
                                                        onOpenChange={(open) => {
                                                            setDropdownOpen(open ? user._id : null);
                                                        }}
                                                    >
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-[160px]">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setDropdownOpen(null);
                                                                    setTimeout(() => {
                                                                        setRoleDialog({ isOpen: true, userId: user._id, currentRole: user.role });
                                                                    }, 100);
                                                                }}
                                                            >
                                                                <Edit2 className="h-4 w-4 mr-2" />
                                                                Change Role
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setDropdownOpen(null);
                                                                    setTimeout(() => {
                                                                        handleStatusToggle(user._id, user.status);
                                                                    }, 100);
                                                                }}
                                                                disabled={isStatusUpdating}
                                                            >
                                                                {user.status === "active" ? (
                                                                    <>
                                                                        <X className="h-4 w-4 mr-2" />
                                                                        Deactivate
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Check className="h-4 w-4 mr-2" />
                                                                        Activate
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-500"
                                                                onClick={() => {
                                                                    setDropdownOpen(null);
                                                                    setTimeout(() => {
                                                                        setUserToDelete(user._id);
                                                                    }, 100);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                        {userData?.users?.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="py-10 text-center text-muted-foreground">
                                                    No users found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    {userData?.pagination && (
                                        `Showing ${((page - 1) * limit) + 1}-${Math.min(page * limit, userData.pagination.total)} of ${userData.pagination.total} users`
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page <= 1 || isFetching}
                                        onClick={handlePreviousPage}
                                    >
                                        {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Previous"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!userData?.pagination || page >= userData.pagination.pages || isFetching}
                                        onClick={handleNextPage}
                                    >
                                        {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Delete User Confirmation Dialog */}
            <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>

                            This is a portfolio project, so the delete function of admin part is disabled. Other edits, changes, and features are functional for admin. Because admin password is open to everyone for testing purposes.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleUserDelete}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Change Role Dialog */}
            <Dialog open={roleDialog.isOpen} onOpenChange={(open) => !open && setRoleDialog({ ...roleDialog, isOpen: false })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change User Role</DialogTitle>
                        <DialogDescription>
                            Select a new role for this user. This will change their permissions.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Select
                            value={roleDialog.currentRole}
                            onValueChange={(value) => setRoleDialog({ ...roleDialog, currentRole: value })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRoleDialog({ isOpen: false, userId: "", currentRole: "" })}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleRoleChange(roleDialog.userId, roleDialog.currentRole)}
                            disabled={isRoleUpdating}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black"
                        >
                            {isRoleUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </TabsContent>
    )
}

export default UserTab
