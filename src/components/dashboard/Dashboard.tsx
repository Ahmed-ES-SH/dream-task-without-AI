import { useAuth } from "@/store/auth-slice";
import { User } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <div className="flex  flex-1/2 min-h-screen  items-center justify-center bg-background p-5">
      <div className="rounded-xl border border-border/60 bg-card/95 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex max-md:flex-col max-md:items-start w-full max-w-md items-center gap-4 rounded-xl border border-border/60 bg-card/95 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-border">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <User size={28} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-card-foreground">
              {user.display_name}
            </h2>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
