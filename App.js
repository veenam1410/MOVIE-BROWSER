import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Search from './components/Search';
import About from './components/About';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
