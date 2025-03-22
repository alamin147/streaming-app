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
import { FaApple, FaGoogle } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameOrEmail: "afd",
      password: "123456",
    },
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const res: any = await loginUser(data).unwrap();
      if (res?.success === true) {
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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg">
            <SyncLoader size={50} speedMultiplier={0.7} color="yellow" />
          </div>
        )}

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="identifier">Email or Username</Label>
                    <Input
                      id="identifier"
                      placeholder="Enter email or username"
                      {...register("usernameOrEmail", {
                        required: "This field is required",
                      })}
                      className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                    {errors.usernameOrEmail && (
                      <p className="text-red-500 text-sm">
                        {errors.usernameOrEmail.message as string}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="hover:bg-yellow-300 w-full hover:text-black"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>

            <div className="my-5 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className=" hover:bg-yellow-300 w-full hover:text-black"
              >
                <FaApple />
              </Button>
              <Button
                variant="outline"
                className=" hover:bg-yellow-300 w-full hover:text-black"
              >
                <FaGoogle />
              </Button>
              <Button
                variant="outline"
                className=" hover:bg-yellow-300 w-full hover:text-black"
              >
                <FaMeta />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
