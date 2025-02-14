import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();

  return (
    <div className="px-20 pt-10 flex flex-col min-h-screen max-w-[800px] mx-auto gap-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Detalhes do Usuário</h2>
      <p>{id}</p>
    </div>
  );
}
