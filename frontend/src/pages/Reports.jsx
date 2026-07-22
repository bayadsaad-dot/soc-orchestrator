import MainLayout from "../layouts/MainLayout";

export default function Reports() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-white mb-8">
        Reports
      </h1>

      <div className="rounded-xl bg-slate-900 p-8">
        <a
          href="http://127.0.0.1:8000/reports/incidents/pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          📄 Download Incident Report
        </a>
      </div>
    </MainLayout>
  );
}