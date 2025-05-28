import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CentralPlaceholder } from '../utils/CentralPlaceholder';
import { setGameStatus, updateConfig } from '../gameSlice';
import { GameStatus, GameConfig } from "../interfaces";
import { selectGameConfig } from '../gameSlice';
import { CentrePageLayout } from "../utils/CentrePageLayout";
import styles from './Configure.module.css';

export const Configure = () => {
  const config = useSelector(selectGameConfig);
  const dispatch = useDispatch();
  const [localConfig, setLocalConfig] = React.useState<GameConfig>(config);

  React.useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalConfig((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleNewGame = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateConfig(localConfig));
    dispatch(setGameStatus(GameStatus.NewGame));
  };

  return (
    <CentrePageLayout>
      <CentralPlaceholder>
        <form className={styles.containerDiv} onSubmit={handleNewGame}>
          <h1 className={styles.welcomeText} style={{ textAlign: "center", marginBottom: 24 }}>Game Configuration</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className={styles.control}>
              <label style={{ flex: 2, textAlign: 'left', marginBottom: 0 }}>Rows</label>
              <input name="boardRows" type="number" min={1} max={10} value={localConfig.boardRows} onChange={handleChange} />
            </div>
            <div className={styles.control}>
              <label style={{ flex: 2, textAlign: 'left', marginBottom: 0 }}>Columns</label>
              <input name="boardColumns" type="number" min={1} max={10} value={localConfig.boardColumns} onChange={handleChange} />
            </div>
            <div className={styles.control}>
              <label style={{ flex: 2, textAlign: 'left', marginBottom: 0 }}>Winning Streak</label>
              <input name="minWinCoinsInStreak" type="number" min={1} max={7} value={localConfig.minWinCoinsInStreak} onChange={handleChange} />
            </div>
            <div className={styles.control}>
              <label style={{ flex: 2, textAlign: 'left', marginBottom: 0 }}>Race to ...</label>
              <input name="maxWins" type="number" min={1} max={7} value={localConfig.maxWins} onChange={handleChange} />
            </div>
            <div className={styles.control}>
              <label style={{ flex: 2, textAlign: 'left', marginBottom: 0 }}>Players</label>
              <input name="maxPlayers" type="number" min={2} max={4} value={localConfig.maxPlayers} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className={styles.continueBtn} style={{ marginTop: 24 }}>
            New Game
          </button>
        </form>
      </CentralPlaceholder>
    </CentrePageLayout>
  );
}
