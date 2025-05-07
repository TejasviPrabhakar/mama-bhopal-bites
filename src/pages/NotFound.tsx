
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f5f0] px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#5c2018] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#5c2018] mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="bg-[#5c2018] hover:bg-[#421410]">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
