import { Journey } from "../types/journey";
import {
  DocumentTextIcon,
  ClockIcon,
  ArrowLeftEndOnRectangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
  journeys: Journey[] | null;
  loading: boolean;
}

export default function JourneysList({ journeys, loading }: Props) {
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
                      <DocumentTextIcon className="h-4 w-4 text-gray-200" />
                      <div className="h-3 bg-gray-200 rounded w-40"></div>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <ClockIcon className="h-4 w-4 text-gray-200" />
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

  if (!journeys?.length) {
    return (
      <div className="w-full bg-white rounded-lg shadow">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ExclamationCircleIcon className="h-12 w-12 mb-4" />
            <p className="text-sm">Nenhuma jornada encontrada</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {journeys.map((journey) => (
          <li
            key={journey.id}
            className="flex justify-between gap-x-6 px-6 py-6"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {journey.name}
                </p>
                <div className="mt-1 flex flex-col gap-y-1 text-xs/5 text-gray-500">
                  <span className="flex items-center gap-x-1">
                    <DocumentTextIcon className="h-4 w-4" />
                    {journey.description}
                  </span>
                  <span className="flex items-center gap-x-1">
                    <ClockIcon className="h-4 w-4" />
                    {Math.floor(journey.interval / (1000 * 60 * 60 * 24))}{" "}
                    {Math.floor(journey.interval / (1000 * 60 * 60 * 24)) === 1
                      ? "dia"
                      : "dias"}
                  </span>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <p className="mt-1 text-xs/5 text-gray-500 flex items-center gap-x-1">
                <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
                <time dateTime={journey.created_at}>
                  {new Date(journey.created_at).toLocaleDateString("pt-BR")}
                </time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
