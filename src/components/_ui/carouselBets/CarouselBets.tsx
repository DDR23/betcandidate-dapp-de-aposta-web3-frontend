import { Carousel } from "@mantine/carousel";
import { useRef, useEffect } from "react";
import Autoplay from 'embla-carousel-autoplay';
import { BackgroundImage, Button, Flex, Paper, Stack, Text } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import './index.css'

const bets = [
  {
    BET_ID: '0001',
    BET_TITLE: 'Eleições americanas',
    BET_WALLPAPER: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    BET_OPTION_1: 'Donald Trump',
    BET_OPTION_2: 'Kamala Harris',
    BET_TOTAL_PRIZE: 'R$ 36.129,39'
  },
  {
    BET_ID: '0002',
    BET_TITLE: 'Eleições brasileiras',
    BET_WALLPAPER: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    BET_OPTION_1: 'Pablo Marçal',
    BET_OPTION_2: 'Guilherme Boulos',
    BET_TOTAL_PRIZE: 'R$ 578.430,91'
  },
  {
    BET_ID: '0003',
    BET_TITLE: 'Conmebol libertadores',
    BET_WALLPAPER: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    BET_OPTION_1: 'Atlético-MG',
    BET_OPTION_2: 'River Plate',
    BET_TOTAL_PRIZE: 'R$ 1.586,53'
  }
]

export default function CarouselBets() {
  const { isDesktop } = ProviderDevice();
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  useEffect(() => {
    const autoplayInstance = autoplay.current;
    return () => {
      autoplayInstance.stop();
    };
  }, []);

  const slides = bets.map((row) => (
    <Carousel.Slide key={row.BET_ID}>
      <BackgroundImage src={row.BET_WALLPAPER} w='100vw' h='60vh'>
        <Flex direction='column' maw='90vw' ta='center' mx='auto' py='2.5rem' align='center' justify='flex-end' h='100%'>
          <Paper p='lg' bg='#23232390' style={{ backdropFilter: `blur(3px)`}}>
            <Stack px='md'>
              <Flex direction='column'>
                <Text fz={isDesktop ? 'h1' : 'h2'} mb='sm' inline>{row.BET_TITLE.toLocaleUpperCase()}</Text>
                <Text fz='lg' inline>🔥</Text>
                <Text fz='xs'>Total acumulado</Text>
                <Text fz='md' inline>{row.BET_TOTAL_PRIZE}</Text>
              </Flex>
              <Flex justify="center" direction={isDesktop ? 'row' : 'column'}>
                <Text fz='h3' inline>{row.BET_OPTION_1}</Text>
                <Text mx='md' inline>x</Text>
                <Text fz='h3' inline>{row.BET_OPTION_2}</Text>
              </Flex>
              <Button component="a" href={`/bet/${row.BET_ID}`} fullWidth bg='green'>Apostar agora</Button>
            </Stack>
          </Paper>
        </Flex>
      </BackgroundImage>
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        w='100vw'
        h='60vh'
        loop
        withControls={false}
        withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
        onPointerDown={() => autoplay.current.stop()}
        classNames={{ indicator: 'indicator' }}
      >
        {slides}
      </Carousel>
    </>
  );
}