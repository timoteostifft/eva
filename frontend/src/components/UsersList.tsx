import { User } from "../types/user";
import {
  InboxIcon,
  PhoneIcon,
  ArrowLeftEndOnRectangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface Props {
  users: User[] | null;
  loading: boolean;
}

export default function UsersList({ users, loading }: Props) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg shadow">
        <ul role="list" className="divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="flex justify-between gap-x-6 px-6 py-6 animate-pulse"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="mt-1 flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-1">
                      <InboxIcon className="h-4 w-4 text-gray-200" />
                      <div className="h-3 bg-gray-200 rounded w-40"></div>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <PhoneIcon className="h-4 w-4 text-gray-200" />
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <div className="flex items-center gap-x-1">
                  <ArrowLeftEndOnRectangleIcon className="h-4 w-4 text-gray-200" />
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="w-full bg-white rounded-lg shadow">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ExclamationCircleIcon className="h-12 w-12 mb-4" />
            <p className="text-sm">Nenhum usuário encontrado</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <li
            key={user.email}
            className="flex justify-between gap-x-6 px-6 py-6 hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {user.first_name} {user.last_name}
                </p>
                <div className="mt-1 flex flex-col gap-y-1 text-xs/5 text-gray-500">
                  <span className="flex items-center gap-x-1">
                    <InboxIcon className="h-4 w-4" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-x-1">
                    <PhoneIcon className="h-4 w-4" />
                    {user.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <p className="mt-1 text-xs/5 text-gray-500 flex items-center gap-x-1">
                <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
                <time dateTime={user.created_at}>
                  {new Date(user.created_at).toLocaleDateString("pt-BR")}
                </time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
