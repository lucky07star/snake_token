
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./landing";
import GetStartedPage from "./get_started";
import Home from "./home";
import TweetMiningPage from "./tweet_mining";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/get-started" element={<GetStartedPage />} />

        <Route path="/home" element={<Home />} />

        <Route path="/tweet-mining" element={<TweetMiningPage />} />
        <Route path="/tweet-mining/page1" element={<TweetMiningPage page_number={1} />} />
        <Route path="/tweet-mining/page2" element={<TweetMiningPage page_number={2} />} />

      </Routes>
    </Router>
  );
}

export default App;
