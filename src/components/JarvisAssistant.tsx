import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Detailed project knowledge base — Jarvis prioritizes project depth
const PROJECTS: Record<string, string> = {
  newsflux: `**NewsFlux** is a multi-tenant SaaS platform that digitizes the entire workflow of newspaper distribution agencies.

🔹 **Problem it solves:**
Newspaper agencies still rely on manual registers for stock, distribution, and billing — leading to errors, revenue leaks, and zero visibility.

🔹 **Key features:**
- Multi-tenant architecture (multiple agencies, isolated data)
- Role-Based Access Control — Super Admin, Agency Admin, Workers
- Stock & distributor management
- Customer subscription tracking
- Automated monthly billing (Revenue = Sold × Price)
- Offline-friendly data entry for field workers

🔹 **Tech stack:**
React.js, Python (FastAPI), PostgreSQL, Docker, JWT Auth

🔹 **How it works:**
Agencies onboard through a Super Admin, manage their distributors and customers, log daily sold/returned stock, and the system auto-calculates revenue and generates monthly bills — all from a single dashboard.

🔹 **What makes it unique:**
It's built specifically for an underserved industry, achieves 99% uptime, and replaces decades-old paper workflows with a clean, role-aware SaaS — proving that even "boring" industries deserve great software.`,

  smartclassroom: `**Smart Classroom Automation** is an IoT-powered system that automates attendance, access, and energy management in classrooms.

🔹 **Problem it solves:**
Manual attendance wastes class time, classrooms waste power when empty, and there's no real-time visibility into who's inside.

🔹 **Key features:**
- RFID-based student access control
- Face recognition attendance (95% accuracy)
- ESP32-driven IoT controller for lights, fans, projector
- IP camera live monitoring
- Auto power-off when room is empty
- Centralized attendance logs

🔹 **Tech stack:**
ESP32, Arduino, RFID, IP Cameras, Python (OpenCV + face_recognition), MQTT, Node.js dashboard

🔹 **How it works:**
Students tap their RFID card → ESP32 unlocks the door and powers the room → IP camera captures faces → Python service matches faces and marks attendance → when no one is detected, the system shuts everything off.

🔹 **What makes it unique:**
It fuses **embedded hardware + computer vision + automation** into one cohesive system — saving teaching time, cutting energy costs, and producing tamper-proof attendance records.`,
};

const KNOWLEDGE_BASE: Record<string, string> = {
  hello: "Hey there! 👋 I'm Jarvis, Harris Benedict's AI assistant. Ask me about his **projects**, skills, or how to get in touch!",
  who: "Harris Benedict is an AI Developer & Creative Technologist. He builds intelligent systems, immersive interfaces, and next-gen digital experiences — specializing in AI, full-stack development, IoT, and creative tech.",
  about: "Harris combines AI expertise with creative design to build products that feel like the future. His focus areas include machine learning, embedded systems, and immersive web experiences.",
  skills: "Harris's core skills include:\n• **AI & Machine Learning** — NLP, computer vision, model deployment\n• **Full-Stack Development** — React, Node.js, Python, FastAPI\n• **IoT & Embedded Systems** — ESP32, Arduino, RFID, sensor networks\n• **Creative Tech** — Three.js, WebGL, interactive experiences\n• **Cloud & DevOps** — Docker, PostgreSQL, cloud architecture",
  projectsList: "Harris has built some impressive projects:\n\n📰 **NewsFlux** — Multi-tenant SaaS for newspaper distribution agencies.\n\n🏫 **Smart Classroom Automation** — IoT + face recognition system for classrooms.\n\nAsk me about either one for a deep dive!",
  contact: "You can reach Harris at:\n📧 harrisbenadict14@gmail.com\n🔗 github.com/harrisbenadict14-spec\n💼 linkedin.com/in/harrisbenadict",
  experience: "Harris has hands-on experience building production-grade IoT systems, SaaS platforms, and AI-powered applications — including face recognition systems, multi-tenant architectures, and embedded device networks.",
  hire: "Harris is open to exciting opportunities! Reach out at **harrisbenadict14@gmail.com** or connect on LinkedIn.",
  unknown: "I don't have details about that project yet, but I can tell you about **NewsFlux** or **Smart Classroom Automation** — just ask!",
  fallback: "I can tell you about Harris's **projects** (NewsFlux, Smart Classroom), **skills**, **experience**, or how to **contact** him. What interests you?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  // 1) SPECIFIC PROJECT MATCHES — highest priority
  if (lower.includes("newsflux") || lower.includes("news flux") || (lower.includes("news") && lower.includes("paper"))) {
    return PROJECTS.newsflux;
  }
  if (lower.includes("smart classroom") || lower.includes("classroom") || lower.includes("rfid") || lower.includes("face recog") || lower.includes("attendance")) {
    return PROJECTS.smartclassroom;
  }

  // 2) Generic "tell me about a project" — list projects
  if (lower.includes("project") || lower.includes("portfolio") || lower.includes("built") || lower.includes("work on")) {
    // If they mention a specific unknown project name alongside "project"
    const knownTokens = ["newsflux", "classroom", "smart", "rfid"];
    const mentionsUnknown = /tell me about ([a-z0-9\- ]+)/i.test(input) && !knownTokens.some(t => lower.includes(t));
    if (mentionsUnknown && !lower.match(/^(tell me about (his |the |your )?projects?\??$)/)) {
      return KNOWLEDGE_BASE.unknown;
    }
    return KNOWLEDGE_BASE.projectsList;
  }

  // 3) General queries
  if (lower.match(/^(hello|hi|hey|yo|sup)\b/)) return KNOWLEDGE_BASE.hello;
  if (lower.includes("who") || (lower.includes("harris") && !lower.includes("project"))) return KNOWLEDGE_BASE.who;
  if (lower.includes("about")) return KNOWLEDGE_BASE.about;
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) return KNOWLEDGE_BASE.skills;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) return KNOWLEDGE_BASE.contact;
  if (lower.includes("experience") || lower.includes("background")) return KNOWLEDGE_BASE.experience;
  if (lower.includes("hire") || lower.includes("job") || lower.includes("work with")) return KNOWLEDGE_BASE.hire;

  return KNOWLEDGE_BASE.fallback;
}

const JarvisAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Jarvis 🤖 — Harris's AI assistant. Ask me anything about his work, skills, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer bg-foreground"
        style={{
          boxShadow: "0 0 30px hsl(0 0% 100% / 0.15), 0 0 60px hsl(0 0% 100% / 0.05)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? <X size={22} className="text-background" /> : <Bot size={22} className="text-background" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[80] w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden glass-card"
            style={{
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5), 0 0 1px hsl(0 0% 100% / 0.1)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "hsl(0 0% 8%)",
                borderBottom: "1px solid hsl(0 0% 15%)",
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground">
                <Sparkles size={14} className="text-background" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Jarvis AI</p>
                <p className="text-[10px] text-muted-foreground">Harris's Personal Assistant</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-sm bg-foreground text-background"
                        : "rounded-bl-sm text-foreground bg-secondary/80"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 px-4 py-3 bg-secondary/80 rounded-2xl rounded-bl-sm w-fit"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                    />
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Harris..."
                  className="flex-1 bg-secondary/60 text-foreground text-xs rounded-xl px-4 py-2.5 outline-none placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-foreground/30 transition-shadow"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cursor-pointer bg-foreground"
                >
                  <Send size={14} className="text-background" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JarvisAssistant;
