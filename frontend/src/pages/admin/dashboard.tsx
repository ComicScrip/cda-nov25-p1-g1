import { useRouter } from "next/router";
import BackgroundLayout from "@/components/BackgroundLayout";
import { useMeQuery, useLogoutMutation } from "@/graphql/generated/schema";

export default function AdminPage() {
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const { data, loading: meLoading, error, refetch } = useMeQuery({
    fetchPolicy: "network-only",
  });

  const me = data?.me;

  // sécurité: si pas admin => dehors
if (meLoading || error || !me || me.role !== "admin") return null;

  const handleLogout = async () => {
    try {
      await logout();
      await refetch();
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <BackgroundLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Bienvenue Admin</h1>

        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="rounded-md bg-[#E8D2A6] px-4 py-2 text-white disabled:opacity-60"
        >
          {logoutLoading ? "Déconnexion..." : "Déconnexion"}
        </button>
      </div>

      <p className="mt-4">Page en construction</p>
    </BackgroundLayout>
  );
}
