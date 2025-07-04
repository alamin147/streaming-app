import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { RegisterPageImports } from "./imports";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    cn,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
  } = RegisterPageImports;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const onSubmit = async (data: any) => {
    if (data.password !== data.conpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res: any = await registerUser(data).unwrap();

      if (res?.status === 201) {
        toast.success(
          res?.message || "Registration successfully! Please login to continue."
        );
        navigate("/login");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {isLoading && (
        <SyncLoader
          className="position absolute z-50"
          size={50}
          speedMultiplier={0.7}
          color="yellow"
        />
      )}

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="abc123"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm">
                        {errors.username.message as string}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email format",
                        },
                      })}
                      className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Confirm Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("conpassword", {
                        required: "Confirm Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="focus:ring-2 focus:ring-red-400 focus:outline-none"
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
                    Register
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>

            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
