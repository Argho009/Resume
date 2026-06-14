import React, { useState, useEffect } from 'react';
import { Send, Terminal, Mail, MapPin, ShieldCheck, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConnectViewProps {}

export const ConnectView: React.FC<ConnectViewProps> = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitStatus, setTransmitStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SENT' | 'ERROR'>('IDLE');
  const [decryptionStatus, setDecryptionStatus] = useState<'IDLE' | 'DECRYPTING' | 'READY'>('IDLE');
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [pingStats, setPingStats] = useState({ latency: 42, packetLoss: 0, serverStatus: 'SYS_ONLINE' });

  // Simulate network pings changing slightly for aesthetic realism
  useEffect(() => {
    const timer = setInterval(() => {
      setPingStats({
        latency: Math.floor(Math.random() * 8 + 38),
        packetLoss: Math.random() > 0.95 ? 1 : 0,
        serverStatus: 'SYS_ONLINE',
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all transmission packets.');
      return;
    }

    setTransmitStatus('TRANSMITTING');
    
    // Simulate high-fidelity packet security transmission
    setTimeout(() => {
      setTransmitStatus('SENT');
      setFormData({ name: '', email: '', message: '' });
    }, 2800);
  };

  const startDecryption = () => {
    if (decryptionStatus !== 'IDLE') return;

    setDecryptionStatus('DECRYPTING');
    setDecryptProgress(0);

    const intv = setInterval(() => {
      setDecryptProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intv);
          setDecryptionStatus('READY');
          setTimeout(() => {
            // Trigger beautiful plain text print-out or download
            window.print();
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const style = {
    textPink: 'text-primary',
    borderActive: 'border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20',
    btnActive: 'bg-primary/20 text-primary whisper-border hover:bg-primary/30 hover:text-text-primary hover:shadow-[0_0_15px_rgba(255,180,206,0.3)]',
    badgeActive: 'bg-primary/10 border-primary/40 text-primary',
    barActive: 'bg-primary',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left" id="connect-main-deck">
      
      {/* LEFT SECTION: Secure Message Transmission console */}
      <div className="glass-panel whisper-border rounded-2xl p-6 space-y-4" id="message-transmission-form-block">
        <div className="flex justify-between items-center border-b border-whisper-border pb-3 mb-2">
          <h3 className="text-sm font-sans tracking-widest text-text-primary font-medium uppercase inline-flex items-center gap-2">
            <Mail className={`w-3.5 h-3.5 ${style.textPink}`} />
            TRANSMIT PORTAL
          </h3>
          <span className="font-mono text-[10px] text-text-muted tracking-wider">
            PORT: 3000 // SECURE_SSL_256
          </span>
        </div>

        <p className="text-xs text-text-muted font-sans leading-relaxed">
          Open a zero-latency digital pipeline directly to my inbox. Entered records are packed and securely routed in real-time.
        </p>

        <form onSubmit={handleTransmit} className="space-y-4 text-xs font-sans">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 align-left">
              <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest block text-left">
                SENDER NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="E.G. ALAN TURING"
                disabled={transmitStatus === 'TRANSMITTING'}
                className={`w-full bg-surface whisper-border rounded-lg px-3 py-2 text-text-primary placeholder:text-outline outline-none transition-all ${style.borderActive}`}
              />
            </div>

            <div className="space-y-1.5 align-left">
              <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest block text-left">
                ROUTING MAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="E.G. USER@SYSTEM.NET"
                disabled={transmitStatus === 'TRANSMITTING'}
                className={`w-full bg-surface whisper-border rounded-lg px-3 py-2 text-text-primary placeholder:text-outline outline-none transition-all ${style.borderActive}`}
              />
            </div>
          </div>

          <div className="space-y-1.5 align-left">
            <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest block text-left">
              TRANSMISSION PACKET CONTENT
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="ENTER SECURE MESSAGE TO AC ENGINE CORE..."
              disabled={transmitStatus === 'TRANSMITTING'}
              className={`w-full bg-surface whisper-border rounded-lg px-3 py-3 text-text-primary placeholder:text-outline outline-none resize-none transition-all ${style.borderActive}`}
            />
          </div>

          {/* Action trigger button */}
          <button
            type="submit"
            disabled={transmitStatus === 'TRANSMITTING'}
            className={`w-full py-2.5 font-mono text-[10px] tracking-widest uppercase cursor-pointer rounded-lg border outline-none font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 ${style.btnActive}`}
          >
            {transmitStatus === 'TRANSMITTING' ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                ENCRYPTING PORT PACKETS...
              </>
            ) : transmitStatus === 'SENT' ? (
              <>
                <ShieldCheck className="w-3 h-3 text-emerald-400 animate-bounce" />
                TRANSMISSION VERIFIED // COMPLETED!
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                TRANSMIT SIGNATURE PROTOCOL
              </>
            )}
          </button>
        </form>

        {/* Diagnostic packet stream updates */}
        <AnimatePresence>
          {transmitStatus === 'TRANSMITTING' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-surface whisper-border rounded-lg p-3 font-mono text-[10px] text-text-muted space-y-1 text-left"
            >
              <div>&gt; STACKING FORM BUFFER ... STABLE</div>
              <div>&gt; SYNCHRONIZING WITH SMTP CORES ... COMPLETED</div>
              <div>&gt; DEPLOYING ENCRYPTED ROUTE HOOK ... COMPLETED</div>
              <div className="animate-pulse text-primary">&gt; PUSHING SECURED DATA_STREAM TO CORE INDS... COMPILING</div>
            </motion.div>
          )}

          {transmitStatus === 'SENT' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary/10 border border-secondary/40 rounded-lg p-3 font-mono text-[10px] text-secondary space-y-1 text-left"
            >
              <div>&gt; SECURE ENVELOPES DEPLOYED SUCCESSFULLY.</div>
              <div>&gt; RESPONSE CODE: 200 OK (VERIFIED CORE ACCEPTS).</div>
              <div className="text-text-muted">&gt; Direct connection established. I will review and reply within 12 standard business cycles.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT SECTION: CV Decryption and system metrics */}
      <div className="space-y-6" id="cv-decryptor-radar-station">
        
        {/* Dynamic Decryptor Card */}
        <div className="glass-panel whisper-border rounded-2xl p-6 space-y-5" id="cv-download-control-card">
          <div className="space-y-1">
            <h3 className="text-sm font-sans tracking-widest text-text-primary font-medium uppercase inline-flex items-center gap-2">
              <Download className={`w-3.5 h-3.5 ${style.textPink}`} />
              CORE DOCUMENT MATRIX
            </h3>
            <p className="text-xs text-text-muted font-sans leading-relaxed">
              Synthesize and decrypt the static curriculum vitae. Clicking download runs a direct local visual buffer decryption process and prompts standard printing.
            </p>
          </div>

          <div className="bg-surface whisper-border rounded-xl p-4 space-y-4 text-left" id="decryption-console-box">
            {decryptionStatus === 'IDLE' && (
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <div className="p-3 bg-surface border border-outline-variant rounded-full text-text-muted animate-pulse">
                  <Terminal className="w-5 h-5" />
                </div>
                <button
                  onClick={startDecryption}
                  className={`px-4 py-2 font-mono text-[10px] tracking-widest rounded-lg border outline-none cursor-pointer duration-300 ${style.btnActive}`}
                >
                  INITIALIZE CV DECRYPTION
                </button>
              </div>
            )}

            {decryptionStatus === 'DECRYPTING' && (
              <div className="space-y-3 py-2 text-left">
                <div className="flex justify-between items-center text-[10px] font-mono text-text-muted">
                  <span className="animate-pulse">DECRYPTING SYMBOLS...</span>
                  <span>{decryptProgress}%</span>
                </div>
                {/* Visual loading bar */}
                <div className="w-full h-1.5 bg-surface rounded overflow-hidden">
                  <div
                    className={`h-full duration-150 transition-all ${style.barActive}`}
                    style={{ width: `${decryptProgress}%` }}
                  />
                </div>
                {/* Simulating memory stream codes */}
                <div className="font-mono text-[9px] text-outline-variant leading-none h-12 overflow-hidden space-y-0.5">
                  <div>0x4F8A &gt; EXTRACTING EXPERIENCE LOGS...</div>
                  {decryptProgress > 30 && <div>0x9C2E &gt; TRANSLATING PROJECTS DICTIONARY...</div>}
                  {decryptProgress > 60 && <div>0x1D9F &gt; RE-CONSTRUCTING FRAMEWORK SKILL STACK...</div>}
                  {decryptProgress > 80 && <div>0xE8A0 &gt; SECURITY KEY VERIFIED ... DECRYPTION OK</div>}
                </div>
              </div>
            )}

            {decryptionStatus === 'READY' && (
              <div className="flex flex-col items-center justify-center py-4 space-y-3">
                <div className="p-2.5 bg-secondary/20 border border-secondary/40 rounded-full text-secondary animate-bounce">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-secondary uppercase tracking-widest font-bold">
                    DECRYPTION COMPLETE // FILE SECURED
                  </p>
                  <p className="text-[10px] font-mono text-text-muted mt-0.5">
                    PRINT DIALOG INITIALIZED SUCCESSFULLY.
                  </p>
                </div>
                <button
                  onClick={() => setDecryptionStatus('IDLE')}
                  className="px-3 py-1 font-mono text-[10px] text-text-muted hover:text-text-primary border border-transparent hover:border-outline-variant transition-all bg-surface rounded-lg cursor-pointer"
                >
                  RESET CORE DECRYPTOR
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Network Radar Telemetries */}
        <div className="glass-panel whisper-border rounded-2xl p-5 flex flex-col justify-between space-y-3" id="sat-telemetry-readouts">
          <span className="text-[10px] font-mono tracking-widest text-text-muted block text-left">
            TELECON CONNECTION TELEMETRY
          </span>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface whisper-border p-2.5 rounded-lg font-mono text-left">
              <span className="text-[10px] text-text-muted block">RTT LATENCY</span>
              <span className={`text-xs font-bold block ${style.textPink}`}>{pingStats.latency} ms</span>
            </div>
            
            <div className="bg-surface whisper-border p-2.5 rounded-lg font-mono text-left">
              <span className="text-[10px] text-text-muted block">PACKET LOSS</span>
              <span className={`text-xs font-bold block ${pingStats.packetLoss > 0 ? 'text-tertiary animate-pulse' : 'text-secondary'}`}>
                {pingStats.packetLoss}%
              </span>
            </div>

            <div className="bg-surface whisper-border p-2.5 rounded-lg font-mono text-left">
              <span className="text-[10px] text-text-muted block">SATELLITE STATUS</span>
              <span className="text-[11px] font-bold text-secondary block tracking-tighter">
                {pingStats.serverStatus}
              </span>
            </div>
          </div>

          <div className="flex gap-4 pt-1.5 text-[10px] font-mono text-text-muted justify-start">
            <span className="flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> TOKYO, JP / REMOTE_CORES
            </span>
            <span className="flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" /> SECURE HANDSHAKES DEPLOYED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
