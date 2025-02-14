import UsersList from "../components/UsersList";
import Search from "../components/Search";
import { useApi } from "../hooks/useApi";
import { User } from "../types/user";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const [search, setSearch] = useState("");

  const debounced = useDebounce(search, 500);

  const { data, loading, fetch } = useApi<User[]>({
    method: "GET",
    endpoint: `/users?page=${1}${search ? `&name=${search}` : ""}`,
  });

  useEffect(() => {
    fetch();
  }, [debounced]);

  return (
    <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto gap-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Usuários</h2>
      <Search value={search} onChange={setSearch} />
      <UsersList users={data} loading={loading} />
    </div>
  );
}
