import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: MainRouteComponent,
});

function MainRouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="m-8">
      <div className="navbar bg-neutral text-neutral-content justify-between rounded-xl items my-4">
        <div className="flex flex-row">
          {" "}
          <Link search={{ query: "" }} to="/" className="btn btn-ghost text-xl">
            <img
              src="../../public/reading-book.png"
              alt="Reading Book Logo"
              className="w-12 h-12"
            />
          </Link>
          <SignedIn>
            <Link
              to="/myBooks"
              className="btn btn-ghost text-xl [&.active]:text-amber-300"
            >
              My Books
            </Link>
          </SignedIn>
        </div>

        <SignedOut>
          <Link
            className="btn btn-ghost text-xl [&.active]:text-amber-300"
            onClick={() => navigate({ to: "/signIn" })}
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex justify-center">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  );
}
