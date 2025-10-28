import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import img from '../assets/img4.jpg';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img10 from '../assets/img10.jpg';
import img11 from '../assets/img11.jpg';
import img12 from '../assets/img12.png';
import bgm from '../assets/love-story-instrumental-indila-edit-audio734047732.mp3'

const GF_NAME = 'Mimi';
const BIRTHDAY_MONTH = 9;
const BIRTHDAY_DAY = 29;

export default function BirthdaySurpriseMulti() {
  const [now, setNow] = useState(new Date());
  const [target] = useState(() => getTargetDate());
  const [showSurprise, setShowSurprise] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const savedMessageKey = 'bday_personal_message';
  const defaultMessage = `Mimi, tumi amar shopno. Aajke tomar jonno amar shob bhalobasha ar pran. Happy Birthday, amar prio. Ami sadharonoto shobcheye beshi tomake bhalobasi.`;
  const [personalMessage, setPersonalMessage] = useState(() => {
    try {
      return localStorage.getItem(savedMessageKey) || defaultMessage;
    } catch {
      return defaultMessage;
    }
  });

  const [gallery, setGallery] = useState([
    { id: '1', src: img1, name: 'img1' },
    { id: '2', src: img2, name: 'img2' },
    { id: '3', src: img3, name: 'img3' },
    { id: '4', src: img4, name: 'img4' },
    { id: '5', src: img5, name: 'img5' },
    { id: '6', src: img6, name: 'img6' },
    { id: '7', src: img7, name: 'img7' },
    { id: '8', src: img8, name: 'img8' },
    { id: '9', src: img9, name: 'img9' },
  ]);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4;
    const playAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", playAudio);
    };
    document.addEventListener("click", playAudio);
    return () => document.removeEventListener("click", playAudio);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getTargetDate() {
    const today = new Date();
    let t = new Date(today.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
    if (today > t) t.setFullYear(today.getFullYear() + 1);
    return t;
  }

  const diff = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  function saveMessage() {
    try {
      localStorage.setItem(savedMessageKey, personalMessage);
      alert('Message saved!');
    } catch {
      alert('Save failed.');
    }
  }

  function onFilesSelected(e) {
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files).slice(0, 12);
    const readers = arr.map(
      (file) =>
        new Promise((resolve) => {
          const r = new FileReader();
          r.onload = () =>
            resolve({
              id: Math.random().toString(36).slice(2),
              src: r.result,
              name: file.name,
            });
          r.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((items) => setGallery((prev) => [...items, ...prev]));
  }

  function removeFromGallery(id) {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  }

  function openNavbarSurprise() {
    setShowSurprise(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 20000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50 text-gray-800">
      <audio ref={audioRef} src={bgm} loop preload="auto" />

      <header className="sticky top-0 bg-white/60 backdrop-blur-md border-b border-white/30 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-extrabold">M</div>
            <div>
              <div className="text-lg font-bold">For {GF_NAME}</div>
              <div className="text-xs text-gray-600">A special birthday surprise</div>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 text-2xl">☰</button>
          </div>
          <nav className={`flex-col md:flex md:flex-row md:items-center gap-2 md:gap-3 absolute md:static top-full left-0 w-full md:w-auto bg-white/90 md:bg-transparent p-4 md:p-0 transition-all ${menuOpen ? 'flex' : 'hidden'}`}>
            <a href="#home" className="px-3 py-2 rounded hover:bg-white/60">Home</a>
            <a href="#message" className="px-3 py-2 rounded hover:bg-white/60">Message</a>
            <a href="#gallery" className="px-3 py-2 rounded hover:bg-white/60">Gallery</a>
            <a href="#quotes" className="px-3 py-2 rounded hover:bg-white/60">Quotes</a>
            <button
              onClick={openNavbarSurprise}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded shadow hover:scale-105 transition"
            >
              🎁 Surprise
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
        {/* Home Section */}
        <section id="home" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-extrabold text-pink-600">Happy Birthday, {GF_NAME}! 🎉</h1>
              <p className="mt-2 text-gray-700 leading-relaxed">Aajke tomar jonno ekti chotto surprise birthday gift toyri korechi.</p>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="p-3 bg-rose-50 rounded-lg">
                  <div className="text-sm text-gray-500">Countdown</div>
                  <div className="text-xl md:text-2xl font-bold">{days}d {hours}h {minutes}m {seconds}s</div>
                </div>
              </div>
            </div>
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl overflow-hidden shadow-lg">
              <img src={img} alt="Mimi" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section id="message" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-pink-600 text-center mb-4">💌 Sweet Memories & Messages 💌</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalMessage.split('\n').map((line, i) => (
              <div key={i} className="p-4 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition">
                <p className="text-gray-700 italic">"{line}"</p>
              </div>
            ))}
            <div className="p-4 bg-rose-50 rounded-2xl shadow">
              <h3 className="font-semibold text-pink-600 mb-2">Add Your Own Message</h3>
              <textarea
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={5}
                placeholder="Write something sweet..."
                className="w-full p-3 rounded border resize-none focus:ring-2 focus:ring-pink-300 focus:outline-none"
              />
              <div className="mt-2 flex gap-2">
                <button onClick={saveMessage} className="px-4 py-2 bg-pink-600 text-white rounded shadow hover:scale-105 transition">Save</button>
                <button onClick={() => {navigator.clipboard?.writeText(personalMessage); alert('Copied!');}} className="px-4 py-2 border rounded shadow hover:bg-gray-100 transition">Copy</button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">📸 Your Beautiful Moments</h2>
          <div className="flex justify-center mb-8">
            <label className="block w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition text-center">
              Upload More Images
              <input type="file" accept="image/*" multiple onChange={onFilesSelected} className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {gallery.map((img) => (
              <div key={img.id} className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition duration-500 hover:-translate-y-2">
                <img src={img.src} alt={img.name} className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center text-center">
                  <p className="text-white text-sm italic mb-2">❤️ A Beautiful Memory ❤️</p>
                  <button onClick={() => removeFromGallery(img.id)} className="px-4 py-1 bg-red-500/80 hover:bg-red-600 text-white text-sm rounded-full shadow transition">✕ Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 New Section 1: Memories With You */}
        <section id="memories" className="bg-gradient-to-b from-purple-100 via-pink-100 to-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">💫 Memories With You</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white/30 p-4 rounded-2xl shadow hover:scale-105 transition">
              <img src={img10} alt="Memory 1" className="rounded-xl w-full h-48 object-cover" />
              <p className="mt-2 text-gray-700 italic">The day we first met — magical ✨</p>
            </div>
            <div className="bg-white/30 p-4 rounded-2xl shadow hover:scale-105 transition">
              <img src={img11} alt="Memory 2" className="rounded-xl w-full h-48 object-cover" />
              <p className="mt-2 text-gray-700 italic">Moments with you I’ll never forget 💫</p>
            </div>
            <div className="bg-white/30 p-4 rounded-2xl shadow hover:scale-105 transition">
              <img src={img12} alt="Memory 3" className="rounded-xl w-full h-48 object-cover" />
              <p className="mt-2 text-gray-700 italic">Every smile of yours melts my heart 💖</p>
            </div>
          </div>
        </section>

        {/* 🔹 New Section 2: A Message From My Heart */}
        <section id="heart-message" className="bg-gradient-to-t from-purple-100 via-pink-100 to-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">💌 A Message From My Heart</h2>
          <p className="text-gray-700 italic max-w-3xl mx-auto text-lg leading-relaxed">
            My love, every single day with you feels like a blessing.  
            Your laughter is my favorite sound, your smile is my peace,  
            and your presence is my greatest comfort.  
            No matter where life takes us, I promise to stand by you —  
            to love you, protect you, and make you smile, always.
          </p>
        </section>

      </main>

      {showSurprise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-300 backdrop-blur-sm" onClick={() => setShowSurprise(false)}></div>
          {confetti && <Confetti recycle={true} numberOfPieces={600} />}
          <div className="relative z-50 bg-white/80 backdrop-blur-md rounded-3xl p-8 max-w-lg mx-4 text-center shadow-2xl border border-pink-200 transform scale-90 opacity-0 animate-[fadeScaleIn_0.8s_ease-out_forwards]">
            <h2 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-3 animate-bounce">🎁 Surprise for You, {GF_NAME}! 🎉</h2>
            <p className="text-gray-700 mt-4 text-lg">Just wanted to remind you how special you are 💖</p>
            <p className="text-gray-700 mt-2 italic">“Every day with you is a gift I never want to lose.”</p>
            <button onClick={() => setShowSurprise(false)} className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-full shadow hover:scale-105 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
