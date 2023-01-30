import { useRef } from 'react';

import Title from '@/components/main/Title';
import TopImg from './TopImg';
// import { useWave } from '@/hooks/useAnimation';

import styles from '@/styles/common/Top.module.scss';

function Top() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const draw = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;
  // };
  //
  // useWave(() => {
  //   draw();
  // }, []);

  return (
    <div className={styles.container}>
      <Title />
      <TopImg />
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
}

export default Top;
