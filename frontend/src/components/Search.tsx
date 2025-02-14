import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full rounded-lg bg-white py-4 pl-14 pr-6 text-sm/6 text-gray-900 shadow outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
