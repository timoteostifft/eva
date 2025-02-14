import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginateProps {
  current: number;
  onChange: (page: number) => void;
  length: number;
}

export const Paginate = ({ current, onChange, length }: PaginateProps) => {
  return (
    <div className="sticky bottom-4 py-2 flex items-center gap-4 justify-center">
      <button
        onClick={() => onChange(current - 1)}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
        aria-label="Página anterior"
        disabled={current <= 1}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <span className="font-medium">{current}</span>

      <button
        onClick={() => onChange(current + 1)}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
        aria-label="Próxima página"
        disabled={length < 10}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
