import { useApi } from "../hooks/useApi";
import { Journey } from "../types/journey";
import { User } from "../types/user";
import { useState } from "react";
import { toast } from "../services/toast";

interface ConfirmationModalProps {
  journey: Journey;
  user: User;
  onChange: () => void;
}

export function ConfirmationModal({
  journey,
  user,
  onChange,
}: ConfirmationModalProps) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const { fetch, loading, error } = useApi({
    method: "POST",
    endpoint: `/user-journey`,
    data: {
      user_id: user.id,
      journey_id: journey.id,
      start_at: date && time ? new Date(`${date}T${time}`).toISOString() : null,
    },
  });

  const handleConfirm = async () => {
    await fetch();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Jornada associada com sucesso!");

    onChange();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Confirmar Associação
        </h3>
        <p className="mb-6 text-gray-600">
          Deseja associar o usuário {user.first_name} à jornada {journey.name}?
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Data de início
            </label>
            <input
              type="date"
              id="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Hora de início
            </label>
            <input
              type="time"
              id="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
            onClick={onChange}
          >
            Cancelar
          </button>
          <button
            className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
            onClick={handleConfirm}
            disabled={loading || !date || !time}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
