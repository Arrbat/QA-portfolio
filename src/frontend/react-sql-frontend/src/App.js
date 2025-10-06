import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './registration_page';
import TaskPanel from './task_panel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/tasks" element={<TaskPanel />} />
      </Routes>
    </Router>
  );
}

export default App;