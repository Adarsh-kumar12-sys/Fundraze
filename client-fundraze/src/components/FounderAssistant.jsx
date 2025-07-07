import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;
import { toast } from "react-toastify";
import { redToast } from "../utils/toastStyles";



const FounderAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your Fundraze AI assistant. How can I help with your startup?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  // Typing animation function
  const typeMessage = async (fullText) => {
    let displayText = "";
    for (let i = 0; i < fullText.length; i++) {
      displayText += fullText[i];
      await new Promise((r) => setTimeout(r, 15)); // typing delay
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = displayText;
        return updated;
      });
    }
  };

  // Format reply with spacing + bullets
  const formatReply = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    return lines
      .map((line) => {
        // Remove markdown asterisks and bold markers
        return line
          .replace(/^\*\s*\*\*(.*?)\*\*:/, "• $1:") // "* **Bold**:" → "• Bold:"
          .replace(/^\*\*(.*?)\*\*:/, "• $1:")      // "**Bold**:" → "• Bold:"
          .replace(/^\*\s*/, "• ")                  // "* something" → "• something"
          .replace(/\*\*/g, "");                    // Remove leftover **
      })
      .join("\n");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        GEMINI_API_URL,
        {
          contents: [
            {
              parts: [{ text: `${input}. Keep it short, to the point, and under 3 bullet points.` }]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY
          }
        }
      );

      const raw = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn’t get that.";
      const formatted = formatReply(raw);

      // Add placeholder message and animate
      setMessages((prev) => [...prev, { role: "ai", text: "" }]);
      await typeMessage(formatted);
    } catch (err) {
      console.error("❌ Gemini API error:", err?.response?.data || err.message);

      toast("❌ Failed to get response from Fundraze AI.", redToast);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error talking to AI. Please try again later." }
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full px-4 py-2 shadow-md flex items-center gap-2 hover:bg-blue-700"
        >
          <MessageCircle size={18} />
          Ask Assistant
        </button>
      ) : (
        <div className="w-80 bg-white border shadow-xl rounded-lg overflow-hidden flex flex-col">
          <div className="bg-gray-200 text-black p-3 flex justify-between items-center">
            <span className="font-semibold">🤖 Ask Fundraze AI</span>
            <button onClick={toggleChat}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-72 space-y-2 text-sm whitespace-pre-wrap">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${msg.role === "user"
                    ? "bg-gray-100 text-right"
                    : "bg-blue-100 text-left"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-sm text-gray-500">Typing...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 text-sm px-3 py-1.5 border rounded-l outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-r hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FounderAssistant;
