import { useState, useEffect } from "react";


function StoryGame({ story, onNewStory }) {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);

  // Set root node when story loads
  useEffect(() => {
    if (story?.root_node?.id != null) {
      setCurrentNodeId(String(story.root_node.id));
    }
  }, [story]);

  // Update node safely
  useEffect(() => {
    if (!currentNodeId || !story?.all_nodes) return;

    const node = story.all_nodes[String(currentNodeId)];

    if (!node) {
      console.log("Node not found:", currentNodeId);
      return;
    }

    setCurrentNode(node);
    setIsEnding(Boolean(node.is_ending));
    setIsWinningEnding(Boolean(node.is_winning_ending));

    if (!node.is_ending && Array.isArray(node.options)) {
      setOptions(node.options);
    } else {
      setOptions([]);
    }
  }, [currentNodeId, story]);

  const chooseOption = (optionId) => {
    setCurrentNodeId(String(optionId));
  };

  const restartStory = () => {
    if (story?.root_node?.id != null) {
      setCurrentNodeId(String(story.root_node.id));
    }
  };

  return (
    <div className="story-game">
      <header className="story-header">
        <h2>{story.title}</h2>
      </header>

      <div className="story-content">
        {currentNode ? (
          <div className="story-node">
            <p>{currentNode.content}</p>

            {isEnding ? (
              <div className="story-ending">
                <h3>{isWinningEnding ? "Congratulations 🎉" : "The End"}</h3>
                <p>
                  {isWinningEnding
                    ? "You reached a winning ending!"
                    : "Your adventure has ended."}
                </p>
              </div>
            ) : (
              <div className="story-options">
                <h3>What will you do?</h3>
                <div className="options-list">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => chooseOption(option.node_id)}
                      className="option-btn"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading story...</p>
        )}

        <div className="story-controls">
          <button onClick={restartStory} className="reset-btn">
            Restart Story
          </button>
        </div>

        {onNewStory && (
          <button onClick={onNewStory} className="new-story-btn">
            New Story
          </button>
        )}
      </div>
    </div>
  );
}

export default StoryGame;