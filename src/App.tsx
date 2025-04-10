
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./landing";
import GetStartedPage from "./get_started";
import Home from "./home";
import TweetMiningPage from "./tweet_mining";
import GenerateMeme from "./meme_generation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/get-started/what-is-snake" element={<GetStartedPage pagename="what-is-snake" />} />
        <Route path="/get-started/how-it-works" element={<GetStartedPage pagename="how-it-works" />} />
        <Route path="/get-started/tokenomics" element={<GetStartedPage pagename="tokenomics" />} />
        <Route path="/get-started/roadmap" element={<GetStartedPage pagename="roadmap" />} />
        <Route path="/get-started/safety-transparency" element={<GetStartedPage pagename="safety-transparency" />} />
        <Route path="/get-started/why-join" element={<GetStartedPage pagename="why-join" />} />
        <Route path="/get-started/get-involved" element={<GetStartedPage pagename="get-involved" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/home/claim-rewards" element={<Home pagename="claim-rewards" />} />

        <Route path="/tweet-mining" element={<TweetMiningPage />} />
        <Route path="/tweet-mining/page1" element={<TweetMiningPage page_number={1} />} />
        <Route path="/tweet-mining/page2" element={<TweetMiningPage page_number={2} />} />
        <Route path="/tweet-mining/page3" element={<TweetMiningPage page_number={3} />} />

        <Route path="/meme-generation" element={<GenerateMeme />} />
        <Route path="/meme-generation/page1" element={<GenerateMeme page_number={1} />} />
        <Route path="/meme-generation/page2" element={<GenerateMeme page_number={2} />} />
        <Route path="/meme-generation/page3" element={<GenerateMeme page_number={3} />} />

      </Routes>
    </Router>
  );
}

export default App;
