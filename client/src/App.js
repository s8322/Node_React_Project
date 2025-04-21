import './App.css';
import Auth from './Components/Auth/Auth';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';
import './flags.css';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
// import Apartment from './Components./apartments/Apartments';
import Apartments from './Components/apartments/Apartments';
function App() {
  const navigate = useNavigate()


  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    },
    {
      label: 'דירות',
      icon: 'pi pi-star',
      command: () => {
        navigate('./apartments')
      }
    },
    {
      label: 'כניסה',
      icon: 'pi pi-search',
      command: () => {
        navigate('./auth')
      }
      // items: [
      //   {
      //     label: 'Core',
      //     icon: 'pi pi-bolt'
      //   },
      //   {
      //     label: 'Blocks',
      //     icon: 'pi pi-server'
      //   },
      //   {
      //     label: 'UI Kit',
      //     icon: 'pi pi-pencil'
      //   },
      //   {
      //     separator: true
      //   },
      //   {
      //     label: 'Templates',
      //     icon: 'pi pi-palette',
      //     items: [
      //       {
      //         label: 'Apollo',
      //         icon: 'pi pi-palette'
      //       },
      //       {
      //         label: 'Ultima',
      //         icon: 'pi pi-palette'
      //       }
      //     ]
      //   }
      // ]
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope'
    }
  ];

  const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
      <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
    </div>
  );
  return (
    <PrimeReactProvider>
      <div className="App">

        {<div className="card">
          <Menubar model={items} start={start} end={end} />
        </div>}
        <Routes>
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path='/apartments' element={<Apartments />} />
          <Route path='/auth' element={<Auth />} />
          {/* {<Route path='/products' element={<Product />} />} */}
        </Routes>
      </div>
    </PrimeReactProvider>
  );

}

export default App;
