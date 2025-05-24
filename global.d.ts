// global.d.ts
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}
