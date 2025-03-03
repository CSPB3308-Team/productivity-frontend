import styles from './GameCanvas.module.css';

const GameCanvas = () => {
  return (
    <div className={`${styles.gameCanvasDiv} placeholderDiv`}>
      <p>Here is where the game canvas will go!</p>
    </div>
  );
};

export default GameCanvas;
