import React, { useEffect, useState, useRef } from 'react';
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

const GF_NAME = 'Mimi';
const BIRTHDAY_MONTH = 9;
const BIRTHDAY_DAY = 29;
const MUSIC_URL =
  'https://cdn.pixabay.com/download/audio/2021/10/29/audio_6f9f6b9f92.mp3?filename=romantic-acoustic-112208.mp3';

export default function BirthdaySurpriseMulti() {
  const [now, setNow] = useState(new Date());
  const [target] = useState(() => getTargetDate());
  const [showSurprise, setShowSurprise] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize audio once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
    }
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
  const countdownFinished = diff === 0;

  // Fixed togglePlay function
  function togglePlay() {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.log('Play blocked:', error));
      }
    }
  }

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

  function openSurprise() {
    if (!countdownFinished) return;
    setShowSurprise(true);
    setConfetti(true);

    // Play music directly on modal open (user interaction)
    togglePlay();

    setTimeout(() => setConfetti(false), 30000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50 text-gray-800">
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
            <a href="#memories" className="px-3 py-2 rounded hover:bg-white/60">Memories</a>
            <button onClick={togglePlay} className="px-3 py-2 bg-pink-600 text-white rounded">{isPlaying ? 'Pause Music' : 'Play Music'}</button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
        {/* Home Section */}
        <section id="home" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-extrabold text-pink-600">Happy Birthday, {GF_NAME}! 🎉</h1>
              <p className="mt-2 text-gray-700 leading-relaxed">Aajke tomar jonno ekti chotto surprise page toyri korechi. Raat 12:00-te special modal ta open korbe.</p>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="p-3 bg-rose-50 rounded-lg">
                  <div className="text-sm text-gray-500">Countdown</div>
                  <div className="text-xl md:text-2xl font-bold">{days}d {hours}h {minutes}m {seconds}s</div>
                </div>
                {countdownFinished ? (
                  <button onClick={openSurprise} className="px-4 py-2 bg-pink-600 text-white rounded shadow hover:scale-105 transition transform">Open Your Surprise Gift 🎁</button>
                ) : (
                  <button disabled className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">Open Your Surprise Gift 🎁</button>
                )}
              </div>
            </div>
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-700 hover:scale-105">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-700 hover:scale-105">
                <img src={img} alt="Mimi" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Message Section */}
       {/* Sweet Memories Section (Replacing A Personal Message) */}
<section id="message" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow">
  <h2 className="text-2xl font-bold text-pink-600 text-center mb-4">💌 Sweet Memories & Messages 💌</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Display message cards */}
    {personalMessage.split('\n').map((line, i) => (
      <div key={i} className="p-4 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition">
        <p className="text-gray-700 italic">"{line}"</p>
      </div>
    ))}

    {/* Add new message */}
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
        <button
          onClick={saveMessage}
          className="px-4 py-2 bg-pink-600 text-white rounded shadow hover:scale-105 transition"
        >
          Save
        </button>
        <button
          onClick={() => {navigator.clipboard?.writeText(personalMessage); alert('Copied!');}}
          className="px-4 py-2 border rounded shadow hover:bg-gray-100 transition"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</section>


        {/* Gallery Section */}
        <section id="gallery" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">📸 Your Beautiful Moments</h2>
          <p className="text-gray-700 mb-6 text-center">Some of our sweetest memories 💖 (You can also upload more!)</p>
          <div className="flex justify-center mb-8">
            <label className="block w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition text-center">
              Upload More Images
              <input type="file" accept="image/*" multiple onChange={onFilesSelected} className="hidden"/>
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {gallery.map((img) => (
              <div key={img.id} className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition duration-500 hover:-translate-y-2">
                <img src={img.src} alt={img.name} className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center text-center">
                  <p className="text-white text-sm italic mb-2 animate-fade-in">❤️ A Beautiful Memory ❤️</p>
                  <button onClick={() => removeFromGallery(img.id)} className="px-4 py-1 bg-red-500/80 hover:bg-red-600 text-white text-sm rounded-full shadow transition">✕ Remove</button>
                </div>
              </div>
            ))}
          </div>
          {gallery.length === 0 && <div className="text-center text-gray-500 mt-8 italic text-lg">No images yet... Upload some memories 💕</div>}
        </section>

        {/* Memories Section */}
        <section id="memories" className="bg-white/80 p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">💞 Our Love Journey 💞</h2>
          <p className="text-gray-700 mb-6 text-center">Step by step, every memory made us stronger 💖</p>
          <div className="relative border-l-4 border-pink-400 pl-6 space-y-8">
            <MemoryCard title="The Day We Met" date="📅 10 May 2025">That first smile, that first glance — and I knew my heart found its home. 💗</MemoryCard>
            <MemoryCard title="Our First Adventure" date="📅 14 Feb 2024">A day full of laughter, food, and love. We walked miles, but my heart was floating.</MemoryCard>
            <MemoryCard title="Endless Midnight Talks" date="📅 1 Sep 2024">Nights became shorter and sweeter with our endless silly conversations and dreams.</MemoryCard>
            <MemoryCard title="Our Forever Promise" date="📅 Coming Soon...">From strangers to lovers — now we promise a forever together 💑</MemoryCard>
          </div>
        </section>
        {/* Quotes Section */}
<section id="quotes" className="bg-white/80 p-6 md:p-8 rounded-2xl shadow-lg">
  <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">💖 Love Quotes 💖</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      "Every moment with you is my favorite memory.",
      "You are the reason my heart smiles every day.",
      "Our love story is my favorite adventure.",
      "I fall in love with you more every single day."
    ].map((quote, i) => (
      <div key={i} className="p-4 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105">
        <p className="text-gray-700 italic text-center">"{quote}"</p>
      </div>
    ))}
  </div>
</section>
{/* Virtual Gifts Section */}
<section id="gifts" className="bg-white/80 p-6 md:p-8 rounded-2xl shadow-lg">
  <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">🎁 Virtual Gifts 🎁</h2>
  <div className="flex flex-wrap justify-center gap-4">
    {["🌹", "🍫", "🎂", "💌", "🎈", "💎", "❤️"].map((gift, i) => (
      <div key={i} className="text-4xl hover:animate-bounce cursor-pointer transition">{gift}</div>
    ))}
  </div>
</section>

{/* Countdown Celebration */}
<section id="celebration" className="bg-gradient-to-br from-pink-200 to-purple-200 p-6 md:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden">
  <h2 className="text-3xl font-bold text-pink-600 mb-4">🎉 Countdown Celebration 🎉</h2>
  <p className="text-gray-700 mb-4 text-xl">Time to celebrate our love! 💖</p>
  <div className="flex justify-center gap-3 flex-wrap">
    {Array.from({ length: 20 }).map((_, i) => (
      <span key={i} className="animate-[floatHeart_5s_linear_infinite] text-2xl text-red-400">❤️</span>
    ))}
  </div>
</section>

      </main>

      {/* Surprise Modal */}
      {showSurprise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-300 backdrop-blur-sm animate-bgGradient" onClick={() => setShowSurprise(false)}></div>
          {confetti && <Confetti recycle={true} numberOfPieces={700}/>}
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="absolute text-pink-400 text-xl animate-[floatHeart_5s_linear_infinite]" style={{ left: `${Math.random() * 90}%`, top: `${Math.random() * 90}%`, animationDuration: `${3 + Math.random() * 2}s` }}>❤️</div>
          ))}
          <div className="relative z-50 bg-white/80 backdrop-blur-md rounded-3xl p-8 max-w-lg mx-4 text-center shadow-2xl border border-pink-200 transform scale-90 opacity-0 animate-[fadeScaleIn_0.8s_ease-out_forwards]">
            <h2 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-3 animate-bounce">🎉 Happy Birthday, {GF_NAME}! 🎉</h2>
            <p className="text-gray-700 mt-4 whitespace-pre-line">{personalMessage}</p>
            <button onClick={() => setShowSurprise(false)} className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-full shadow hover:scale-105 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MemoryCard({ title, date, children }) {
  return (
    <div className="relative pl-6">
      <span className="absolute left-0 top-0 w-4 h-4 bg-pink-500 rounded-full"></span>
      <div className="text-sm text-gray-500">{date}</div>
      <h3 className="font-bold text-lg text-pink-600">{title}</h3>
      <p className="text-gray-700">{children}</p>
    </div>
  );
}
