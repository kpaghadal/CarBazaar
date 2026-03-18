import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './Chat.css';

// SVG Icons
const SearchIcon = () => (
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.04l-3.32-.483a1.5 1.5 0 00-1.637.892l-1.084 2.612a11.25 11.25 0 01-5.739-5.739l2.612-1.084a1.5 1.5 0 00.892-1.637l-.483-3.32A1.5 1.5 0 0011.628 2.25h-1.372c-1.243 0-2.25 1.007-2.25 2.25v2.25z" />
  </svg>
);

const DotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);

const AttachIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Mock Data
const contacts = [
  { id: 1, name: 'Marcus', status: 'Online', lastMsg: 'Available for a test drive?', time: '2m', active: true, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sarah', status: 'Offline', lastMsg: 'Thanks for the info!', time: '2h', active: false, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Carlos', status: 'Offline', lastMsg: 'Is the price negotiable?', time: '1d', active: false, avatar: 'https://i.pravatar.cc/150?u=3' },
];

const initialMessages = [
  { id: 1, from: 'seller', text: 'Hi there! I saw your interest in the Mustang. Do you have any questions?', time: '10:23 AM' },
  { id: 2, from: 'buyer', text: 'Hey Marcus, yes! Is the car still available? I\'m located in Chicago as well.', time: '10:24 AM' },
  { id: 3, from: 'seller', text: 'Yes, it\'s still available. I\'m free this weekend if you want to take a look.', time: '10:26 AM' },
  { id: 4, from: 'buyer', text: 'That sounds great. Would Saturday morning work for you? say around 10 AM?', time: '10:30 AM' },
  { id: 5, from: 'seller', text: 'Saturday 10 AM works perfectly. We can meet at the coffee shop on Main St.', time: '10:32 AM' },
];

export function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = { id: Date.now(), from: 'buyer', text: text.trim(), time: timeStr };
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div className="chat-container">

        {/* Left Sidebar - Contacts */}
        <div className="chat-sidebar-left">
          <div className="messages-header">
            <h2>Messages</h2>
            <div className="search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search messages..." />
            </div>
          </div>

          <div className="contacts-list">
            {contacts.map((contact) => (
              <div key={contact.id} className={`contact-item ${contact.active ? 'active' : ''}`}>
                <div className="avatar-container">
                  <img src={contact.avatar} alt={contact.name} className="avatar" />
                  {contact.status === 'Online' && <div className="status-indicator"></div>}
                </div>
                <div className="contact-info">
                  <div className="contact-header">
                    <span className="contact-name">{contact.name}</span>
                    <span className="contact-time">{contact.time}</span>
                  </div>
                  <div className="contact-last-message">{contact.lastMsg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle - Chat Area */}
        <div className="chat-main">
          <div className="chat-header">
            <div className="chat-user-info">
              <div className="avatar-container">
                <img src={contacts[0].avatar} alt={contacts[0].name} className="avatar" />
                <div className="status-indicator"></div>
              </div>
              <div className="chat-user-details">
                <span className="chat-user-name">{contacts[0].name}</span>
                <span className="chat-user-status">{contacts[0].status}</span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="chat-action-btn"><PhoneIcon /></button>
              <button className="chat-action-btn"><DotsIcon /></button>
            </div>
          </div>

          <div className="chat-history">
            <div className="timestamp-divider">Today, 10:23 AM</div>

            {messages.map((m) => (
              <div key={m.id} className={`message-bubble ${m.from === 'buyer' ? 'message-sent' : 'message-received'}`}>
                {m.text}
                <span className="message-time">{m.time}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <button className="attach-btn"><AttachIcon /></button>
            <input
              type="text"
              className="message-input"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="send-btn-circle" onClick={send}>
              <SendIcon />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Listing Details */}
        <div className="chat-sidebar-right">
          <h2 className="listing-header-title">Listing Details</h2>
          <div className="listing-content">
            <div className="listing-image-container">
              <img
                src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=400"
                alt="2019 Ford Mustang GT Premium"
                className="listing-image"
              />
            </div>

            <div className="listing-price">$41,500</div>
            <h3 className="listing-title">2019 Ford Mustang GT Premium</h3>

            <div className="listing-specs">
              <div className="spec-row">
                <span className="spec-label">Mileage</span>
                <span className="spec-value">30,000 km</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Fuel</span>
                <span className="spec-value">Petrol</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Transmission</span>
                <span className="spec-value">Automatic</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Location</span>
                <span className="spec-value">Chicago, IL</span>
              </div>
            </div>

            <div className="listing-actions">
              <button className="btn-outline">
                <CalendarIcon />
                Schedule Test Drive
              </button>
              <button className="btn-outline">
                <CurrencyIcon />
                Make an Offer
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


