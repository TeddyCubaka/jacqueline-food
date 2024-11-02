import CompanyList from "@/components/main-page";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-4xl">Jacqueline Food</h1>
      <span>bientôt disponible</span>
      <CompanyList />
    </div>
  );
}
