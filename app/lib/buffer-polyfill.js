import { Buffer as BufferPolyfill } from 'buffer';

// Add Buffer to the global scope for browser environments
if (typeof window !== 'undefined') {
  window.Buffer = BufferPolyfill;
  globalThis.Buffer = BufferPolyfill;
}

// Also ensure process is defined
if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
  window.process = { env: {} };
  globalThis.process = { env: {} };
}

export default BufferPolyfill;
