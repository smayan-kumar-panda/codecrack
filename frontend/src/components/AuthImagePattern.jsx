import { Code, Terminal, FileCode, Braces } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const CodeBackground = ({ title, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fade, setFade] = useState(true) // for fade transition

  // For parallax on icons
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const codeSnippets = [
`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
`class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
`function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  
  return stack.length === 0;
}`,
  ]


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
        setFade(true)
      }, 600) // slightly longer fade out for smoother effect
    }, 5000) // keep snippet longer for readability

    return () => clearInterval(interval)
  }, [codeSnippets.length])

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = e => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width // normalized 0 - 1
      const y = (e.clientY - rect.top) / rect.height
      setMousePos({ x, y })
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)

    return () => container?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Utility to get parallax offset
  const getParallaxStyle = (baseX, baseY, factor = 20) => {
    // factor is max px offset
    const offsetX = (mousePos.x - 0.5) * factor
    const offsetY = (mousePos.y - 0.5) * factor
    return {
      transform: `translate3d(${baseX + offsetX}px, ${baseY + offsetY}px, 0) scale(${1 + Math.sin(performance.now() / 1000) * 0.05})`,
      willChange: "transform",
      transition: "transform 0.1s ease-out",
    }
  }

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-12 relative overflow-hidden min-h-[600px]"
      style={{ position: "relative" }}
    >
      {/* Noise overlay for subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/></svg>')]"></div>

      {/* Animated code symbols with parallax & refined animations */}
      {/* Provide base positions in px for parallax */}
      <Braces
        size={40}
        className="absolute text-slate-600 animate-spin-slow"
        style={getParallaxStyle(60, 60, 15)}
      />

      <FileCode
        size={50}
        className="absolute text-slate-600 animate-bounce-slow"
        style={getParallaxStyle(window.innerWidth * 0.8, window.innerHeight * 0.3, 20)}
      />

      <Terminal
        size={45}
        className="absolute text-slate-600 animate-float-delay"
        style={getParallaxStyle(100, window.innerHeight * 0.65, 18)}
      />

      <Code
        size={55}
        className="absolute text-slate-600 animate-pulse-slow"
        style={getParallaxStyle(window.innerWidth * 0.75, 350, 15)}
      />

      <Braces
        size={35}
        className="absolute text-slate-600 animate-spin-reverse"
        style={getParallaxStyle(250, window.innerHeight * 0.85, 16)}
      />

      <Terminal
        size={30}
        className="absolute text-slate-600 animate-bounce-delay"
        style={getParallaxStyle(window.innerWidth * 0.6, 90, 12)}
      />

      {/* Code editor mockup */}
      <div className="z-10 max-w-md flex flex-col items-center w-full relative">
        <div className="w-full bg-slate-800 rounded-lg shadow-xl mb-10 overflow-hidden">
          {/* Editor header */}
          <div className="bg-slate-700 px-4 py-2 flex items-center select-none">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs font-mono opacity-70">problem.js</div>
          </div>

          {/* Code content with fade + slide transition */}
          <div
            className={`p-6 font-mono text-xs sm:text-sm overflow-hidden relative h-72 transition-opacity duration-600 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: fade ? "translateX(0)" : "translateX(-20px)",
              transitionProperty: "opacity, transform",
              transitionTimingFunction: "ease-in-out"
            }}
            key={activeIndex} // ensure react re-renders on activeIndex change
          >
            <pre className="whitespace-pre-wrap text-green-400 leading-relaxed select-text">
              {codeSnippets[activeIndex]}
            </pre>

            {/* Enhanced blinking cursor with glow */}
            <div
              className="absolute bottom-6 right-6 w-[2px] h-6 bg-white"
              style={{
                boxShadow: "0 0 8px 2px rgba(255,255,255,0.7)",
                animation: "blink-cursor 1s step-start infinite",
              }}
            ></div>
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Code className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Text content */}
        <h2 className="text-3xl font-extrabold mb-4 text-center">{title}</h2>
        <p className="text-slate-300 text-center max-w-xs">{subtitle}</p>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes blink-cursor {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-slow 25s linear reverse infinite;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        .animate-bounce-delay {
          animation: bounce-slow 6s ease-in-out 1s infinite;
        }
        @keyframes float-delay {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float-delay {
          animation: float-delay 8s ease-in-out 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        /* Background gradient animation */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradient-move 15s ease infinite;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}

export default CodeBackground
