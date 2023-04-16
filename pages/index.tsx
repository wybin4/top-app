import { Inter } from 'next/font/google';
import { Button, Htag, P, Tag } from '@component/components';
import { useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    console.log('Counter ' + counter);
    return function cleanup() {
      console.log('Unmount');
    };
  });
  useEffect(() => {
    console.log('Mounted');
  }, []);

  return (
    <>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearance='primary' arrow='right' onClick={() => setCounter(x => x + 1)}>Count++</Button>
      <Button appearance='ghost' arrow='down'>Кнопка1</Button>
      <P>Средний!</P>
      <Tag size='s' color='primary'>Ghooost</Tag>
      <Tag size='s' color='primary'>Ghooost</Tag>
      <Tag size='s' color='primary'>Ghooost</Tag>
      <Tag size='s' color='primary'>Ghooost</Tag>
    </>
  )
};
