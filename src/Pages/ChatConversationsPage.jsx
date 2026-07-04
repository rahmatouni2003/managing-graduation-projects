import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Student from "../Services/Student.model";
import "./ChatConversationsPage.css";

const AVATAR_COLORS = [
  "#F87171", "#FBBF24", "#34D399", "#60A5FA",
  "#A78BFA", "#F472B6", "#38BDF8", "#4ADE80",
];

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0].charAt(0).toUpperCase()
    : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateDivider(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return new Date(a).toDateString() === new Date(b).toDateString();
}

function Avatar({ name, imageUrl, size = 36, showStatus = true, showTooltip = false }) {
  const style = { width: size, height: size };
  return (
    <div className={`nitr-avatar-wrapper ${showTooltip ? "nitr-avatar-has-tooltip" : ""}`} style={style}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="nitr-chat-avatar" style={style} />
      ) : (
        <div
          className="nitr-chat-avatar nitr-chat-avatar-fallback"
          style={{ ...style, backgroundColor: getAvatarColor(name) }}
        >
          {getInitials(name)}
        </div>
      )}
      {showStatus && <span className="nitr-avatar-status-dot"></span>}
      {showTooltip && name && (
        <span className="nitr-avatar-tooltip">{name}</span>
      )}
    </div>
  );
}

function ParticipantsBar({ participants }) {
  const studentsOnly = participants.filter(
    (p) => p.role_code === "Student" || p.name?.toLowerCase().includes("student")
  );

  return (
    <div className="nitr-chat-participants-bar">
      {studentsOnly.map((p) => (
        <Avatar
          key={p.user_id || p.id}
          name={p.name}
          size={40}
          showStatus={true}
          showTooltip={true}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message, showSender }) {
  const { message: text, sender, created_at, is_mine, type, file_url } = message;

  const renderMessageContent = () => {
    if (type === "image" && file_url) {
      return (
        <a href={file_url} target="_blank" rel="noopener noreferrer" className="nitr-chat-image-link">
          <img src={file_url} alt="attachment" className="nitr-chat-bubble-image" style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '8px' }} />
        </a>
      );
    }

    if (file_url) {
      return (
        <div className="nitr-chat-file-attachment">
          <a href={file_url} target="_blank" rel="noopener noreferrer" className="nitr-chat-file-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: is_mine ? '#fff' : '#2563eb', textDecoration: 'underline', fontWeight: '500' }}>
            📎 View Attachment
          </a>
          {text && <p className="nitr-chat-bubble-text" style={{ marginTop: '6px' }}>{text}</p>}
        </div>
      );
    }

    return <p className="nitr-chat-bubble-text">{text}</p>;
  };

  if (is_mine) {
    return (
      <div className="nitr-chat-msg-row nitr-chat-msg-row-mine">
        <div className="nitr-chat-bubble nitr-chat-bubble-mine">
          {renderMessageContent()}
          <div className="nitr-chat-bubble-meta">
            <span className="nitr-chat-bubble-time">{formatTime(created_at)}</span>
            <span className="nitr-chat-bubble-check">✓✓</span>
          </div>
        </div>
      </div>
    );
  }

  const isStudent = sender?.role_code === "Student" || sender?.name?.toLowerCase().includes("student");
  const roleBadge = isStudent ? (sender?.track || "Engineering") : sender?.role_code;

  return (
    <div className="nitr-chat-msg-row nitr-chat-msg-row-other">
      <Avatar name={sender?.name} size={36} showStatus={false} />
      <div className="nitr-chat-message-col">
        {showSender && (
          <div className="nitr-chat-sender-line">
            <span className="nitr-chat-sender-name">{sender?.name}</span>
            <span className={`nitr-chat-sender-badge ${!isStudent ? 'badge-instructor' : ''}`}>
              {roleBadge}
            </span>
          </div>
        )}
        <div className="nitr-chat-bubble-with-time">
          <div className="nitr-chat-bubble nitr-chat-bubble-other">
            {renderMessageContent()}
          </div>
          <span className="nitr-chat-bubble-time-other">{formatTime(created_at)}</span>
        </div>
      </div>
    </div>
  );
}

export default function ChatConversationPage() {
  const navigate = useNavigate();

  const [conversationId, setConversationId] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    initConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initConversation = async () => {
    setLoading(true);
    setError(null);
    try {
      try {
        const teamRes = await Student.sendChatTeamInfo();
        if (teamRes?.success && teamRes?.data) {
          setTeamInfo(teamRes.data);
        }
      } catch (err) {
        console.error("Error fetching team info:", err);
      }

      const res = await Student.getConversations();
      const list = res?.data ?? res ?? [];

      if (!list.length) {
        setError("No conversations available");
        setLoading(false);
        return;
      }

      const firstConversation = list[0];
      setConversationId(firstConversation.conversation_id);
      setConversation(firstConversation);

      await fetchConversation(firstConversation.conversation_id);
    } catch (err) {
      console.error(err);
      setError("An error occurred while loading conversations");
      setLoading(false);
    }
  };

  const fetchConversation = async (convId) => {
    try {
      const res = await Student.getChatConversations(convId);
      const data = res?.data ?? res;

      if (data?.conversation) {
        setConversation((prevConv) => {
          const newParticipants = data.conversation.participants || [];
          const oldParticipants = prevConv?.participants || [];

          const mergedMap = new Map();

          oldParticipants.forEach(p => {
            if (p.user_id) mergedMap.set(p.user_id, p);
          });

          newParticipants.forEach(p => {
            if (p.user_id) {
              const existing = mergedMap.get(p.user_id);
              mergedMap.set(p.user_id, { ...existing, ...p });
            }
          });

          const updatedParticipants = Array.from(mergedMap.values());

          return {
            ...prevConv,
            ...data.conversation,
            team_name: prevConv?.team_name ?? data.conversation.team_name,
            participants: updatedParticipants,
          };
        });
      }
      setMessages(data?.messages ?? []);
    } catch (err) {
      console.error(err);
      setError("An error occurred while loading the conversation");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    const trimmed = newMessage.trim();
    if ((!trimmed && !attachment) || sending || !conversationId) return;

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("conversation_id", conversationId);

      if (trimmed) {
        formData.append("message", trimmed);
      }

      if (attachment) {
        formData.append("attachment", attachment);
      }

      const res = await Student.sendChatMessages(formData);
      const sentMessage = res?.data ?? res;

      setMessages((prev) => [...prev, sentMessage]);
      newMessage("");
      handleRemoveAttachment();
    } catch (err) {
      console.error("An error occurred while sending:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="nitr-chat-outer">
        <div className="nitr-chat-page-container">
          <div className="nitr-chat-state">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nitr-chat-outer">
        <div className="nitr-chat-page-container">
          <div className="nitr-chat-state nitr-chat-state-error">
            {error}
            <button className="nitr-chat-retry-btn" onClick={initConversation}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const supervisors = conversation?.participants?.filter(p => {
    const isStudentRole = p.role_code === "Student";
    const hasStudentName = p.name?.toLowerCase().includes("student");
    return !isStudentRole && !hasStudentName;
  }) || [];

  const sharedFilesFromMessages = messages.filter(msg => msg.file_url);

  return (
    <div className="nitr-chat-outer">

      <div className="nitr-chat-page-header">
        <button
          className="nitr-chat-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          ←
        </button>
        <h2 className="nitr-chat-title">
          {conversation?.team_name || "Team"}
        </h2>
      </div>

      <div className="nitr-chat-page-container">

        <div className="nitr-chat-main-area">

          {conversation?.participants?.length > 0 && (
            <ParticipantsBar participants={conversation.participants} />
          )}

          <div className="nitr-chat-messages">
            {messages.length === 0 && (
              <div className="nitr-chat-state">No messages yet</div>
            )}

            {messages.map((msg, idx) => {
              const prevMsg = messages[idx - 1];
              const showDateDivider = !isSameDay(msg.created_at, prevMsg?.created_at);
              const showSender =
                !msg.is_mine &&
                (!prevMsg || prevMsg.is_mine || prevMsg.sender?.id !== msg.sender?.id);

              return (
                <div key={msg.id || idx}>
                  {showDateDivider && (
                    <div className="nitr-chat-date-divider">
                      <span>{formatDateDivider(msg.created_at)}</span>
                    </div>
                  )}
                  <MessageBubble message={msg} showSender={showSender} />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="nitr-chat-input-container">
            {attachment && (
              <div className="nitr-chat-attachment-preview">
                <span>📎 {attachment.name}</span>
                <button onClick={handleRemoveAttachment}>✕</button>
              </div>
            )}

            <div className="nitr-chat-input-bar">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                className="nitr-chat-attach-btn"
                aria-label="Attach File"
                onClick={() => fileInputRef.current?.click()}
              >
                +
              </button>
              <div className="nitr-chat-input-pill">
                <input
                  type="text"
                  className="nitr-chat-input"
                  placeholder="When we gonna meet?"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="nitr-chat-send-btn"
                  onClick={handleSend}
                  disabled={(!newMessage.trim() && !attachment) || sending}
                  aria-label="Send"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="nitr-chat-sidebar">

          <div className="nitr-sidebar-widget">
            <h3>Team Info</h3>
            <p className="team-subtext">{teamInfo?.project_title || conversation?.team_name || "Smart Health Monitoring System"}</p>
            <div className="progress-section">
              <div className="progress-header">
                <span>Milestone Progress</span>
                <span className="progress-percent">{teamInfo?.milestone?.progress || 75}% On Track</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${teamInfo?.milestone?.progress || 75}%` }}></div>
              </div>
              <div className="progress-footer">
                <span className="due-days">Due in {Math.abs(Math.round(teamInfo?.milestone?.due_in_days || 10))} days</span>
                <span className="due-date">{teamInfo?.milestone?.deadline || "Jan 30, 2026"}</span>
              </div>
            </div>
          </div>

          <div className="nitr-sidebar-widget">
            <h3>Shared Files & Links</h3>
            <ul className="links-list">
              {sharedFilesFromMessages.length > 0 ? (
                sharedFilesFromMessages.map((msg, index) => {
                  const fileName = msg.message || `Attachment_${index + 1}`;
                  return (
                    <li key={msg.id || index}>
                      <span className="link-icon doc">📎</span>
                      <a href={msg.file_url} target="_blank" rel="noopener noreferrer" title={msg.file_url}>
                        {fileName.length > 25 ? `${fileName.substring(0, 25)}...` : fileName}
                      </a>
                    </li>
                  );
                })
              ) : (
                <>
                  <li>
                    <span className="link-icon figma">❖</span>
                    <a href="#figma">Figma Design System (Project Prototype)</a>
                  </li>
                  <li>
                    <span className="link-icon github">&lt;&gt;</span>
                    <a href="#github">GitHub Repository (Front-end Source Code)</a>
                  </li>
                  <li>
                    <span className="link-icon doc">📄</span>
                    <a href="#docs">Research Paper Draft (Google Docs)</a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="nitr-sidebar-widget">
            <h3>Supervision</h3>
            <div className="supervisors-list">
              {supervisors.length > 0 ? (
                supervisors.map((sup, index) => (
                  <div className="supervisor-item" key={sup.user_id || index}>
                    <Avatar name={sup.name} size={36} showStatus={true} showTooltip={true} />
                    <div className="supervisor-info">
                      <h4>{sup.name}</h4>
                      <p>{sup.role_code === "Doctor" ? "Supervisor" : sup.role_code || "Assistant"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="nitr-chat-state" style={{ padding: "10px 0" }}>No supervisors available</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}