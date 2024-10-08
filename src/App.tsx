import { ReactNode } from "react";
interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  return <div className="App">{children}</div>;
}

export default App;
