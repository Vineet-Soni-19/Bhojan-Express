import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header';

function App() {
  return (
    <>
    <Header/>
    <main className='pt-16 bg-slate-200 min-h-[calc(100vh)]'>
      <Outlet/>
    </main>
    </>
  );
}

export default App;
