import { Link } from "react-router-dom";


export default function LinkButton({ children, className = "", ...props }) {
    return (
        <Link
          {...props}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow ${className}`}
        >
          {children}
        </Link>
      );
}