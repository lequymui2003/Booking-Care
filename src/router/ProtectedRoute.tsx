import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Kiểm tra trạng thái đăng nhập (ví dụ: kiểm tra token trong localStorage)
  const isAuthenticated = !!localStorage.getItem("token");

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung của route
  return children;
};

export default ProtectedRoute;