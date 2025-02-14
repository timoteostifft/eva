import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { User as UserType } from "../types/user";
import { useEffect, useState } from "react";
import { UserInfo } from "../components/UserInfo";
import Search from "../components/Search";
import { Journey } from "../types/journey";
import JourneysList from "../components/JourneysList";
import { useDebounce } from "../hooks/useDebounce";
import { Paginate } from "../components/Paginate";

export default function User() {
  const { id } = useParams();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    fetch: userFetch,
  } = useApi<UserType>({
    method: "GET",
    endpoint: `/users/${id}`,
  });

  useEffect(() => {
    userFetch();
  }, [id]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: journeysData,
    loading: journeysLoading,
    fetch: journeysFetch,
  } = useApi<Journey[]>({
    method: "GET",
    endpoint: `/journeys?page=${page}${search ? `&name=${search}` : ""}`,
  });

  const debounced = useDebounce(search, 500);

  useEffect(() => {
    journeysFetch();
  }, [debounced, page]);

  return (
    <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto gap-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Usuário</h2>
      <UserInfo data={userData} loading={userLoading} error={userError} />

      <h2 className="text-2xl font-bold text-gray-800 mt-4">Jornadas</h2>
      <Search value={search} onChange={setSearch} />
      <JourneysList journeys={journeysData} loading={journeysLoading} />

      {journeysData && (
        <Paginate
          current={page}
          onChange={setPage}
          length={journeysData.length}
        />
      )}
    </div>
  );
}
