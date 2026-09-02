import { LoomProvider } from './loom/LoomContext';
import { Sections } from './components/Sections';
import { Readout } from './components/Readout';
import { Controls } from './components/Controls';

export default function App() {
  return (
    <LoomProvider>
      <a className="skip" href="#main">
        跳到正文
      </a>
      <Controls />
      <Sections />
      <Readout />
    </LoomProvider>
  );
}
