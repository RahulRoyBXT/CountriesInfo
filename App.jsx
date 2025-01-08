import Header from './components/Header'
import {Outlet} from 'react-router-dom'
import './App.css';

const App = () => {
  console.log('App component rendered')
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App