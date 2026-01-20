import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import BiayaKuliah from './pages/BiayaKuliah';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/biayakuliah" exact element={<BiayaKuliah />} />
        <Route path="*" element={<Navigate replace to="/biayakuliah" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

