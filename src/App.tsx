import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPrivateRouter from "./utils/AuthPrivateRouter";

import LandingPage from "./landing";
import GetStartedPage from "./get_started";
import Home from "./home";
import TweetMiningPage from "./tweet_mining";
import NotFoundPage from "./partials/not-found";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthPrivateRouter />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/get-started" element={<GetStartedPage />} />

        {/* <Route path="/home" element={<Home />} /> */}

        <Route path="/tweet-mining" element={<TweetMiningPage />} />
        <Route path="/tweet-mining/page1" element={<TweetMiningPage page_number={1} />} />
        <Route path="/tweet-mining/page2" element={<TweetMiningPage page_number={2} />} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;
