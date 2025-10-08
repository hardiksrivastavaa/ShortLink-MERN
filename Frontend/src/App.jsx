import UrlAnalyticsForm from "./components/UrlAnalyticsForm";
import UrlForm from "./components/UrlShortnerForm";

function App() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 flex flex-col items-center justify-start py-10 px-4">

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 sm:p-10">

        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
          ShortLink
        </h1>

        <div className="space-y-5">
          <UrlForm />
          <UrlAnalyticsForm />
        </div>
      </div>
    </div>
  );
}

export default App;
