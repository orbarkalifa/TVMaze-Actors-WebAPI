import HomePage from "./pages/HomePage"
import { ToastContainer, Flip } from 'react-toastify';

const App = () => {
  return (
    <div>
      <HomePage />
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        transition={Flip}
        limit={3}
      />
    </div>
  )
}

export default App
