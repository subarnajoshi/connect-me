import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import { Fab, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';
import Chatbot from './Components/Chatbot/Chatbot';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${1324134}`
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Chat Button and Dialog */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000
        }}
      >
        <Fab
          color="primary"
          onClick={() => setIsChatOpen(true)}
          aria-label="chat"
        >
          <ChatIcon />
        </Fab>
      </Box>
      
      <Chatbot 
        open={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </Router>
  );
}

export default App;
