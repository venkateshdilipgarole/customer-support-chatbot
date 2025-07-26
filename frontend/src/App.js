import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      let response = null;

      // Check for specific question patterns
      if (question.toLowerCase().includes("top 5")) {
        response = await axios.get("http://localhost:5000/api/chatbot/top-products");
        setAnswer("Top 5 products: " + response.data.topProducts.map(p => p.name).join(", "));
      } 
      else if (question.toLowerCase().includes("order id")) {
        const id = question.match(/\d+/)?.[0] || "";
        response = await axios.get(`http://localhost:5000/api/chatbot/order/${id}`);
        setAnswer(`Order Status: ${response.data.status}`);
      } 
      else if (question.toLowerCase().includes("classic")) {
        response = await axios.get(`http://localhost:5000/api/chatbot/stock/classic t-shirt`);
        setAnswer(`Stock left: ${response.data.stock}`);
      } 
      else {
        setAnswer("Sorry, I don't understand that question.");
      }
    } catch (error) {
      setAnswer("Error fetching data.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customer Support Chatbot</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me something..."
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={handleAsk} style={{ padding: "10px", marginLeft: "10px" }}>
        Ask
      </button>
      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{answer}</p>
    </div>
  );
}

export default App;
