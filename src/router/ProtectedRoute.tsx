import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   // Lấy token từ localStorage
   const token = localStorage.getItem("token");

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung của route
  return children;
};

export default ProtectedRoute;