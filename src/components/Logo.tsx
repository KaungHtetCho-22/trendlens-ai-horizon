
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full animate-lens-animation"></div>
        </div>
      </div>
      <span className="text-xl font-display font-bold tracking-tighter">
        Trend<span className="text-primary">Lens</span>
      </span>
    </Link>
  );
}
