import UsersList from "../components/UsersList";
import Search from "../components/Search";
import { useApi } from "../hooks/use-api";
import { User } from "../types/user";

export default function Home() {
  const { data, loading, error } = useApi<User[]>({
    method: "GET",
    endpoint: "/users?page=1",
  });

  return (
    <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto gap-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Usuários</h2>
      <Search />
      {!error && <UsersList users={data} loading={loading} />}
    </div>
  );
}
