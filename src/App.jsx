import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import BiayaKuliah from './pages/BiayaKuliah';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/biaya/rincian-lengkap" exact element={<BiayaKuliah />} />
        <Route path="*" element={<Navigate replace to="/biaya/rincian-lengkap" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

