import { RegisterPageImports } from "./imports";

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
    FaApple,
    FaGoogle,
    FaMeta,
  } = RegisterPageImports;
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Username</Label>
                      <Input
                        id="email"
                        type="text"
                        placeholder="abc123"
                        required
                        className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="focus:ring-2 focus:ring-red-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button
                      type="submit"
                      className="hover:bg-yellow-300 w-full hover:text-black"
                    >
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Login
                    </a>
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
                  <FaApple className="" />
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
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
