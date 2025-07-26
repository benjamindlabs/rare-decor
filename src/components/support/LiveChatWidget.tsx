import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, User, Headphones, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  isTyping?: boolean;
}

interface FAQOption {
  id: string;
  question: string;
  answer: string;
  emoji: string;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! Welcome to Rare Home Decor. I'm here to help you with any questions about our beautiful interior pieces. Please choose from the options below:",
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showFAQs, setShowFAQs] = useState(true);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const faqOptions: FAQOption[] = [
    {
      id: 'delivery',
      question: 'What are your delivery times and fees?',
      answer: '🚚 We offer free delivery within 3-5 business days for orders over $200. Express delivery (1-2 days) is available for $25. International shipping takes 7-14 days with rates calculated at checkout.',
      emoji: '🚚'
    },
    {
      id: 'custom',
      question: 'Do you offer custom decor pieces?',
      answer: '🎨 Yes! We offer custom design services. Our team can create bespoke furniture and decor pieces to match your exact specifications. Contact us for a personalized consultation.',
      emoji: '🎨'
    },
    {
      id: 'returns',
      question: 'What is your return/refund policy?',
      answer: '↩️ We offer 30-day returns on most items. Items must be in original condition. Custom pieces are non-returnable. Refunds processed within 5-7 business days after we receive the item.',
      emoji: '↩️'
    },
    {
      id: 'consultation',
      question: 'Can I book a consultation with a designer?',
      answer: '💡 Absolutely! Our interior design consultations are available both virtually and in-person. Book a free 30-minute session to discuss your space and get personalized recommendations.',
      emoji: '💡'
    },
    {
      id: 'international',
      question: 'Do you ship internationally?',
      answer: '🌍 Yes, we ship worldwide! International shipping costs vary by location and are calculated at checkout. Delivery typically takes 7-14 business days depending on your location.',
      emoji: '🌍'
    }
  ];

  const handleFAQSelection = (faq: FAQOption) => {
    // Add user's question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowFAQs(false);
    setIsTyping(true);

    // Show typing indicator and then response
    setTimeout(() => {
      setIsTyping(false);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: faq.answer,
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
      
      // Show "Leave a message" option after a delay
      setTimeout(() => {
        setShowMessageInput(true);
      }, 1500);
    }, 1500);
  };

  const handleCustomMessage = () => {
    setShowMessageInput(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "❓ I'd like to leave a custom message",
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "💬 Please type your message below and our team will get back to you shortly!",
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      setIsTyping(false);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "✅ Thank you for reaching out! Our team will get back to you shortly. For urgent matters, please call us at +1 (555) 123-4567.",
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        text: "👋 Hello! Welcome to Rare Home Decor. I'm here to help you with any questions about our beautiful interior pieces. Please choose from the options below:",
        sender: 'support',
        timestamp: new Date()
      }
    ]);
    setShowFAQs(true);
    setShowMessageInput(false);
    setIsTyping(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] h-96 max-h-[calc(100vh-8rem)] bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col md:right-6">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center space-x-2 flex-1">
              <Headphones className="h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Live Support</h3>
                <p className="text-xs opacity-90">Usually responds within 5 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="h-8 px-2 text-xs text-primary-foreground hover:bg-primary-foreground/10"
              >
                Reset
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'support' && <Headphones className="h-3 w-3" />}
                      {message.sender === 'user' && <User className="h-3 w-3" />}
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Headphones className="h-3 w-3" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Options */}
              {showFAQs && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground text-center mb-3">Choose a topic:</p>
                  {faqOptions.map((faq) => (
                    <Button
                      key={faq.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3 text-xs"
                      onClick={() => handleFAQSelection(faq)}
                    >
                      <span className="mr-2">{faq.emoji}</span>
                      <span className="flex-1">{faq.question}</span>
                    </Button>
                  ))}
                </div>
              )}

              {/* Custom Message Option */}
              {showMessageInput && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={handleCustomMessage}
                  >
                    <HelpCircle className="h-3 w-3 mr-2" />
                    Didn't find your answer? Leave us a message
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}