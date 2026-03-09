import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GPU-enhanced loading screen with WebGL gradient pulse
 * and elegant name reveal animation.
 */

const GlowCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    canvas.width = canvas.clientWidth * Math.min(window.devicePixelRatio, 2);
    canvas.height = canvas.clientHeight * Math.min(window.devicePixelRatio, 2);

    const vs = `
      attribute vec2 a_pos;
      varying vec2 vUv;
      void main() {
        vUv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;
    const fs = `
      precision mediump float;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 c = vUv - 0.5;
        float d = length(c);
        float pulse = 0.5 + 0.5 * sin(uTime * 1.8);
        float ring1 = smoothstep(0.18, 0.2, d) * (1.0 - smoothstep(0.2, 0.22, d));
        float ring2 = smoothstep(0.28, 0.30, d) * (1.0 - smoothstep(0.30, 0.32, d));
        float glow  = exp(-d * 4.0) * 0.12 * pulse;
        float rings = (ring1 * pulse + ring2 * (1.0 - pulse)) * 0.25;
        float a = glow + rings;
        gl_FragColor = vec4(0.85, 0.88, 1.0, a);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let id: number;
    const t0 = performance.now();
    const loop = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      id = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
};

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    // Wait for fonts + a minimum display time
    const minWait = new Promise((r) => setTimeout(r, 1800));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.all([minWait, fonts]).then(done);
  }, [done]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* GPU glow canvas */}
          <GlowCanvas />

          {/* Pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-36 h-36 rounded-full border border-foreground/10"
          />
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
            className="absolute w-36 h-36 rounded-full border border-foreground/5"
          />
          <motion.div
            animate={{ scale: [1, 2.8, 1], opacity: [0.1, 0, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
            className="absolute w-36 h-36 rounded-full border border-foreground/[0.03]"
          />

          {/* Name reveal */}
          <motion.div className="relative z-10 text-center overflow-hidden">
            <div className="flex items-center justify-center gap-2">
              <motion.span
                initial={{ opacity: 0, x: -80, filter: "blur(12px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl font-semibold text-foreground tracking-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Harris
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 80, filter: "blur(12px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl font-semibold text-foreground tracking-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Benadict. A
              </motion.span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent mt-3 origin-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-xs text-muted-foreground mt-3 tracking-[0.25em] uppercase"
            >
              Loading
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
