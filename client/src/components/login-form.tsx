import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SyncLoader from "react-spinners/ClipLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { Separator } from "@/components/ui/separator";
import { UserIcon, ShieldCheckIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const res: any = await loginUser(data).unwrap();
      if (res?.success === true) {
        const u = res?.data?.user?.status;
        if (u == "inactive") {
          toast.error(
            "Your account is inactive by an admin. Please contact Admin."
          );
          reset();
          return;
        }
        const { token } = res.data;
        toast.success(res?.message || "User logged in successfully.");
        const decoded = jwtDecode(token);
        dispatch(setUser({ user: decoded, token }));
        navigate("/");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const fillDemoCredentials = (type: "user" | "admin") => {
    if (type === "user") {
      setValue("usernameOrEmail", "user123");
      setValue("password", "user123");
    } else {
      setValue("usernameOrEmail", "john123");
      setValue("password", "123456");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm z-10">
            <SyncLoader size={35} speedMultiplier={0.7} color="#EAB308" />
          </div>
        )}

        <Card className="border-yellow-500/20 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Login to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="identifier" className="font-medium">
                      Email or Username
                    </Label>
                    <Input
                      id="identifier"
                      placeholder="Enter email or username"
                      {...register("usernameOrEmail", {
                        required: "This field is required",
                      })}
                      className="focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-0"
                    />
                    {errors.usernameOrEmail && (
                      <p className="text-red-500 text-sm">
                        {errors.usernameOrEmail.message as string}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="font-medium">
                        Password
                      </Label>
                      <a
                        href="#"
                        className="ml-auto text-sm text-yellow-600 hover:text-yellow-700 hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className="focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-0 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-600 focus:outline-none"
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or Login With Demo Accounts
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-600"
                    onClick={() => fillDemoCredentials("user")}
                  >
                    <UserIcon className="mr-2 h-4 w-4" /> Demo User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-600"
                    onClick={() => fillDemoCredentials("admin")}
                  >
                    <ShieldCheckIcon className="mr-2 h-4 w-4" /> Demo Admin
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="text-yellow-600 hover:text-yellow-700 hover:underline underline-offset-4"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-yellow-600 hover:text-yellow-700 hover:underline underline-offset-4"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
