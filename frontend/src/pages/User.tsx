import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { User as UserType } from "../types/user";
import { useEffect } from "react";
import {
  InboxIcon,
  PhoneIcon,
  ArrowLeftEndOnRectangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function User() {
  const { id } = useParams();

  const { data, loading, error, fetch } = useApi<UserType>({
    method: "GET",
    endpoint: `/users/${id}`,
  });

  useEffect(() => {
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuário</h2>
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-x-1">
                <InboxIcon className="h-4 w-4 text-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-64"></div>
              </div>
              <div className="flex items-center gap-x-1">
                <PhoneIcon className="h-4 w-4 text-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="flex items-center gap-x-1">
                <ArrowLeftEndOnRectangleIcon className="h-4 w-4 text-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuário</h2>
        <div className="w-full bg-white rounded-lg shadow">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ExclamationCircleIcon className="h-12 w-12 mb-4" />
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuário</h2>
      <div className="w-full bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-xl font-semibold text-gray-900 mb-4">
            {data?.first_name} {data?.last_name}
          </p>
          <div className="space-y-3">
            <p className="flex items-center gap-x-1 text-sm text-gray-500">
              <InboxIcon className="h-4 w-4" />
              {data?.email}
            </p>
            <p className="flex items-center gap-x-1 text-sm text-gray-500">
              <PhoneIcon className="h-4 w-4" />
              {data?.phone}
            </p>
            <p className="flex items-center gap-x-1 text-sm text-gray-500">
              <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
              <time dateTime={data?.created_at}>
                {data?.created_at &&
                  new Date(data.created_at).toLocaleDateString("pt-BR")}
              </time>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
