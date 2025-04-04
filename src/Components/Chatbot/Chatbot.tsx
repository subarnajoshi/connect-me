import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { AzureOpenAI } from "openai";

interface Message {
  text: string;
  isUser: boolean;
  imageUrl?: string;
}

interface ChatbotProps {
  open: boolean;
  onClose: () => void;
}

// Azure OpenAI configuration
const endpoint = "";
const gpt4Deployment = "gpt-4o";
const dallEDeployment = "dall-e-3";
const apiKey = "";
const apiVersionDalle = "2025-01-01-preview";
const apiVersionGpt = "2024-04-01-preview";

// GPT-4 client configuration
const gpt4Options = { 
  endpoint, 
  apiKey, 
  deployment: gpt4Deployment, 
  apiVersion: apiVersionGpt,
  dangerouslyAllowBrowser: true 
}
const gpt4Client = new AzureOpenAI(gpt4Options);

// DALL-E endpoint
const dallEEndpoint = `${endpoint}openai/deployments/${dallEDeployment}/images/generations`;

const Chatbot = ({ open, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today? You can ask me anything or type 'generate - image' followed by a description to create an image.", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = { text: newMessage, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setIsLoading(true);

      try {
        if (newMessage.toLowerCase().startsWith("generate - image")) {
          console.log("Image generation triggered");
          // Extract the image description
          const description = newMessage.substring("generate - image".length).trim();
          console.log("Description:", description);
          
          try {
            // Generate image using DALL-E
            const response = await fetch(`${dallEEndpoint}?api-version=${apiVersionDalle}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
              },
              body: JSON.stringify({
                prompt: description,
                n: 1,
                size: "1024x1024"
              })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("DALL-E Response:", data);

            if (data.data?.[0]?.url) {
              const imageUrl = data.data[0].url;
              setBackgroundImage(imageUrl);
              const botMessage: Message = {
                text: `Here's the image you requested: "${description}"`,
                isUser: false,
                imageUrl
              };
              setMessages((prev) => [...prev, botMessage]);
            } else {
              throw new Error("No image URL in response");
            }
          } catch (error) {
            console.error("DALL-E API Error:", error);
            throw error;
          }
        } else {
          // Regular chat response using GPT-4
          const response = await gpt4Client.chat.completions.create({
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              ...messages.map(msg => ({
                role: msg.isUser ? "user" as const : "assistant" as const,
                content: msg.text
              })),
              { role: "user", content: newMessage }
            ],
            max_tokens: 4096,
            temperature: 0.7,
            top_p: 1,
            model: gpt4Deployment
          });

          if (!response.choices?.[0]?.message?.content) {
            throw new Error("Invalid response from API");
          }

          const botMessage: Message = {
            text: response.choices[0].message.content,
            isUser: false,
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      } catch (error) {
        console.error("Error:", error);
        const errorMessage: Message = {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: { 
          height: "600px",
          position: "fixed",
          bottom: 90,
          right: 24,
          margin: 0,
          width: "400px",
          maxWidth: "calc(100vw - 48px)",
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: backgroundImage ? 'rgba(255, 255, 255, 0.9)' : 'white'
        },
      }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-end',
          justifyContent: 'flex-end'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        backgroundColor: backgroundImage ? 'rgba(255, 255, 255, 0.9)' : 'white'
      }}>
        Chat Assistant
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent 
        dividers 
        sx={{ 
          p: 2, 
          display: "flex", 
          flexDirection: "column", 
          bgcolor: backgroundImage ? 'rgba(245, 245, 245, 0.9)' : '#f5f5f5',
          backdropFilter: backgroundImage ? 'blur(2px)' : 'none'
        }}
      >
        <List sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: message.isUser ? "flex-end" : "flex-start",
                mb: 1,
                padding: "4px 8px",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: "8px 16px",
                  maxWidth: "70%",
                  backgroundColor: message.isUser ? "#1976d2" : "white",
                  color: message.isUser ? "white" : "black",
                  borderRadius: "18px",
                  borderTopRightRadius: message.isUser ? "4px" : "18px",
                  borderTopLeftRadius: message.isUser ? "18px" : "4px",
                  wordBreak: "break-word",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                <ListItemText 
                  primary={message.text}
                  primaryTypographyProps={{
                    sx: { 
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      lineHeight: 1.4,
                      margin: 0
                    }
                  }}
                />
                {message.imageUrl && (
                  <Box sx={{ mt: 1 }}>
                    <img 
                      src={message.imageUrl} 
                      alt="Generated" 
                      style={{ 
                        maxWidth: '100%', 
                        borderRadius: '8px',
                        marginTop: '8px'
                      }} 
                    />
                  </Box>
                )}
              </Paper>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: "flex-start", mb: 1, padding: "4px 8px" }}>
              <Paper
                elevation={0}
                sx={{
                  p: "8px 16px",
                  backgroundColor: "white",
                  borderRadius: "18px",
                  borderTopLeftRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                <CircularProgress size={16} sx={{ margin: "4px" }} />
              </Paper>
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ 
        p: 2, 
        display: "flex", 
        bgcolor: backgroundImage ? 'rgba(255, 255, 255, 0.9)' : 'white', 
        borderTop: '1px solid rgba(0,0,0,0.1)',
        backdropFilter: backgroundImage ? 'blur(2px)' : 'none'
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          sx={{ 
            mr: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: '#f5f5f5',
              '& fieldset': {
                borderColor: 'transparent'
              },
              '&:hover fieldset': {
                borderColor: 'transparent'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent'
              }
            }
          }}
          disabled={isLoading}
        />
        <Button
          variant="contained"
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isLoading}
          sx={{
            borderRadius: '20px',
            minWidth: '100px'
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Chatbot; 