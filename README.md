## 🧠 AI-Powered Notes App with Chatbot

A full-stack Notes Application powered by AI, built with the **MERN stack** — **MongoDB**, **Express.js**, **React.js**, and **Node.js**. The app supports secure user authentication, full CRUD operations for notes, and automatic summarization using a local LLM via **Ollama** running the **Mistral model**. It also features a clean, responsive UI, a real-time chat interface, and robust RESTful API integration for seamless interaction.

---

## 🚀 Features

- 🔐 **User Authentication** – JWT-based login and registration system with bcrypt-secured password encryption.
- 📝 **Notes Management** – Create, read, update, and delete notes with a user-friendly interface.
- 🧠 **AI Summarization** – Automatic note summaries generated via a local Ollama instance running the Mistral model.
- 💬 **Chatbot Integration** – Interactive chatbox to converse with the local LLM, with support for:
  - Typing indicator
  - Auto-scroll
  - Multiline input (`Shift+Enter`)
  - Persistent message history (stored in MongoDB)
- 📱 **Responsive Design** – Clean UI built using custom CSS and React Hooks.
- ⚙️ **API Testing & DB Management** – Postman for API testing and Mongosh for database operations.

---

## 🧰 Tech Stack

**Frontend**  
🔹 React.js  
🔹 Axios  
🔹 React Hooks  
🔹 Custom CSS  

**Backend**  
🔹 Node.js  
🔹 Express.js  
🔹 MongoDB & Mongoose  
🔹 Ollama (LLM API)  
🔹 JWT & bcrypt  

---

## 📦 Installation

1. **Clone the repo:**

```bash
git clone https://github.com/najim11rahman/AI-Powered-Notes-App.git
cd AI-Powered-Notes-App
```

2. **Backend Setup:**

```bash
cd backend
npm install
```

Create a `.env` file with:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

Then run:

```bash
npm start
```

3. **Frontend Setup:**

```bash
cd ../frontend
npm install
npm start
```

> Ensure Ollama is running locally on port `11434` with the Mistral model pulled using:
> ```
> ollama run mistral
> ```

---

## 📬 API Endpoints

- `/api/auth` – Authentication (register/login)
- `/api/notes` – CRUD operations
- `/api/ai` – AI summarization
- `/api/messages` – Chatbot conversation

---

## 💡 Future Improvements

- Add rich text formatting to notes  
- Support for tags and search  
- Voice input for chatbot  
- Deployment on cloud (e.g., Render, Vercel, or Railway)

---

Let me know if you'd like a version with emojis removed, markdown flattened for LinkedIn/portfolio sites, or if you're planning on deploying—can help with that too!
