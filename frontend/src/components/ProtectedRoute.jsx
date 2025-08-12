import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { token, status } = useSelector((state) => state.auth)

  if (status === 'loading') return <div>Проверка авторизации...</div>
  return token ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
