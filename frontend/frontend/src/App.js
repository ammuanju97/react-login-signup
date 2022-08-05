import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
// import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Login from './components/login';
import Books from './components/books';
import Layout from './components/Layout';
import Home from './components/Home';
// import { useNavigate } from 'react-router-dom';


// function App() {

//   const [token, setToken] = useState('');

//   const userLogin = (tok) => {
//     setToken(tok);
//   }

//   return (
//     <div className="App">
//       <Login userLogin={userLogin}/>
//       <Books token={token}/>
//       <NotificationContainer/>
//     </div>
//   );
// }

// export default App;
export default function App() {
  const [token, setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);
  }
  //  const navigate = useNavigate();

  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login userLogin={userLogin} />} />

          <Route path="/" element={<Layout />}>
            <Route index path="home" element={<Home />} />

            <Route path="books" element={<Books />} />

            {/* <Route path="*" element={<NoPage />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
      <NotificationContainer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);