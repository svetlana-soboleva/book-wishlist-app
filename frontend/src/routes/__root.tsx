import { NavBar } from "@/components/navigation/NavBar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: MainRouteComponent,
});

function MainRouteComponent() {
  return (
    <div className="m-4 mb-8">
      <NavBar />
      <div className="flex justify-center">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  );
}
