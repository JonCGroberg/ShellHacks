import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import usePlayAudio from '../hooks/usePlayAudio'; // Import the custom hook

export default function Component() {
  const [currentStory, setCurrentStory] = useState(0);
  const { playAudio, isPlaying } = usePlayAudio(); // Use the hook
  const [audioPlaying, setAudioPlaying] = useState(false);

  const stories = [
    {
      title: "El Bosque Misterioso",
      description:
        "Te encuentras de pie al borde de un bosque oscuro y amenazante. Los árboles se elevan sobre ti, sus ramas alcanzando el cielo como dedos nudosos y esqueléticos. El aire está cargado con el olor de la tierra húmeda y las hojas en descomposición, y el sonido de las hojas susurrantes y el ocasional ulular de un búho solo añaden al ambiente inquietante. ¿Qué decides hacer?",
      choices: [
        {
          text: "Entrar en el bosque",
          audio: "/audio/enter-forest.mp3",
          nextStory: 1,
        },
        {
          text: "Dar la vuelta y regresar a casa",
          audio: "/audio/turn-back.mp3",
          nextStory: 2,
        },
        {
          text: "Explorar el borde del bosque",
          audio: "/audio/explore-edge.mp3",
          nextStory: 3,
        },
      ],
    },
    {
      title: "Más adentro en el Bosque",
      description:
        "Valientemente entras en el bosque, los árboles se alzan sobre ti. El camino serpentea a través de la maleza, la luz del sol se filtra entre las hojas y proyecta un patrón moteado en el suelo. El aire está lleno de los sonidos de pájaros piando y el ocasional crujido de pequeños animales en los arbustos. ¿Hacia dónde vas?",
      choices: [
        {
          text: "Seguir el camino serpenteante",
          audio: "/audio/follow-path.mp3",
          nextStory: 4,
        },
        {
          text: "Aventurarte fuera del camino hacia la espesura",
          audio: "/audio/venture-off-path.mp3",
          nextStory: 5,
        },
        {
          text: "Dar la vuelta y salir del bosque",
          audio: "/audio/turn-back-forest.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "El Borde del Bosque",
      description:
        "Decides explorar el borde del bosque. Los árboles son densos y la maleza es espesa, pero puedes ver algunos huecos en el follaje que podrían llevarte más adentro del bosque. El aire es fresco y húmedo, y puedes escuchar el sonido distante de un arroyo o río. ¿Qué decides hacer?",
      choices: [
        {
          text: "Buscar una forma de entrar",
          audio: "/audio/search-way-in.mp3",
          nextStory: 1,
        },
        {
          text: "Seguir el borde del bosque",
          audio: "/audio/follow-edge.mp3",
          nextStory: 6,
        },
        {
          text: "Dar la vuelta y regresar a casa",
          audio: "/audio/turn-back.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "El Camino Serpenteante",
      description:
        "Sigues el camino serpenteante más adentro del bosque. Los árboles se vuelven más espesos y el camino más cubierto de maleza, pero puedes ver un destello de algo en la distancia. A medida que te acercas, te das cuenta de que es una cabaña misteriosa, enclavada entre los árboles. ¿Qué haces?",
      choices: [
        {
          text: "Una cabaña misteriosa en la distancia",
          audio: "/audio/mysterious-cabin.mp3",
          nextStory: 7,
        },
        {
          text: "Hongos brillantes y extraños a lo largo del camino",
          audio: "/audio/glowing-mushrooms.mp3",
          nextStory: 8,
        },
        {
          text: "Dar la vuelta por donde viniste",
          audio: "/audio/turn-back-forest.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "La Espesura",
      description:
        "Te aventuras fuera del camino hacia la densa espesura. La maleza es espesa y enredada, y tienes que abrirte paso entre los zarzales y las vides. El aire está cargado con el olor de la tierra húmeda y las hojas en descomposición, y el sonido de las hojas susurrantes y el ocasional ulular de un búho solo añaden al ambiente inquietante. ¿Qué encuentras?",
      choices: [
        {
          text: "Un claro escondido con un pequeño estanque",
          audio: "/audio/hidden-clearing.mp3",
          nextStory: 9,
        },
        {
          text: "Vides espinosas que bloquean tu camino",
          audio: "/audio/thorny-vines.mp3",
          nextStory: 10,
        },
        {
          text: "Retroceder al camino",
          audio: "/audio/retreat-to-path.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "Siguiendo el Borde",
      description:
        "Sigues el borde del bosque, buscando una entrada. Los árboles son densos y la maleza es espesa, pero puedes ver algunos huecos en el follaje que podrían llevarte más adentro. El aire es fresco y húmedo, y puedes escuchar el sonido distante de un arroyo o río. ¿Qué encuentras?",
      choices: [
        {
          text: "Un sendero cubierto que conduce más adentro del bosque",
          audio: "/audio/overgrown-trail.mp3",
          nextStory: 1,
        },
        {
          text: "Una pequeña abertura entre los árboles",
          audio: "/audio/small-opening.mp3",
          nextStory: 11,
        },
        {
          text: "Dar la vuelta y regresar a casa",
          audio: "/audio/turn-back.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "La Cabaña Misteriosa",
      description:
        "Te acercas a la cabaña misteriosa en la distancia. La cabaña es vieja y desgastada, con una chimenea torcida y un techo hundido. Las ventanas están oscuras y la puerta está ligeramente entreabierta, como invitándote a entrar. ¿Qué haces?",
      choices: [
        {
          text: "Tocar la puerta",
          audio: "/audio/knock-on-door.mp3",
          nextStory: 12,
        },
        {
          text: "Asomarte por las ventanas",
          audio: "/audio/peek-through-windows.mp3",
          nextStory: 13,
        },
        {
          text: "Dar la vuelta por donde viniste",
          audio: "/audio/turn-back-forest.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "Los Hongos Brillantes",
      description:
        "Te acercas a los extraños hongos brillantes a lo largo del camino. Los hongos son de un vibrante y sobrenatural tono azul y parecen emitir un leve brillo, como si estuvieran vivos. El aire a su alrededor es espeso y húmedo, y puedes escuchar el sonido distante de un arroyo o río. ¿Qué haces?",
      choices: [
        {
          text: "Examinarlos más de cerca",
          audio: "/audio/examine-mushrooms.mp3",
          nextStory: 14,
        },
        {
          text: "Pasar cuidadosamente alrededor de ellos",
          audio: "/audio/step-around-mushrooms.mp3",
          nextStory: 4,
        },
        {
          text: "Dar la vuelta por donde viniste",
          audio: "/audio/turn-back-forest.mp3",
          nextStory: 2,
        },
      ],
    },
    {
      title: "El Claro Escondido",
      description:
        "Encuentras un claro escondido con un pequeño estanque. El claro está rodeado por altos y antiguos árboles, y el estanque está alimentado por un pequeño arroyo que brota del suelo. El aire es fresco y húmedo, y el sonido del agua es relajante y pacífico. ¿Qué haces?",
      choices: [
        {
          text: "Explorar el claro",
          audio: "/audio/explore-clearing.mp3",
          nextStory: 15,
        },
        {
          text: "Sumergir las manos en el estanque",
          audio: "/audio/dip-hands-in-pond.mp3",
          nextStory: 16,
        },
        {
          text: "Volver al camino",
          audio: "/audio/retreat-to-path.mp3",
          nextStory: 2,
        },
      ],
    },]

    const handleChoiceClick = async (choice:any) => {
      // Play the description of the next story using Eleven Labs
      const nextStory = stories[choice.nextStory];
      await playAudio(nextStory.description);

      setCurrentStory(choice.nextStory);
    };

    return (
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full p-4 bg-white rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {stories[currentStory].title}
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {stories[currentStory].description}
            </motion.p>
            <motion.div
              className="grid grid-cols-1 gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {stories[currentStory].choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={isPlaying} // Disable buttons while audio is playing
                >
                  {choice.text}
                </Button>
              ))}
            </motion.div>
          </CardContent>
        </Card>

        {isPlaying && (
          <motion.div
            className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-full shadow-lg cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <FaPause size={24} />
          </motion.div>
        )}
      </motion.div>
    );
  }