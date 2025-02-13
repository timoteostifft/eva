import { User } from "../types/user";
import {
  InboxIcon,
  PhoneIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const users: User[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@example.com",
    phone: "(11) 99999-9999",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "4",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "5",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "6",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function UsersList() {
  return (
    <div className="w-full max-w-[600px]">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.email} className="flex justify-between gap-x-6 py-6">
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
                <time dateTime={user.created_at.toISOString()}>
                  {user.created_at.toLocaleDateString("pt-BR")}
                </time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
