import Layout from "@/components/Layout";
import { useUsersQuery } from "@/graphql/generated/schema";

export default function Home() {
  const { data } = useUsersQuery();
  const users = data?.users || [];
  return (
    <Layout pageTitle="Home">
      <div className="p-4">
        <h2>Example users from API</h2>
        {users.map((u) => (
          <p key={u.id}>{u.email}</p>
        ))}
      </div>
    </Layout>
  );
}
