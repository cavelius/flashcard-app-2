import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { confetti } from "@tsparticles/confetti";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesCannon = (props) => {
  const [init, setInit] = useState(false);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      // await loadSlim(engine);
      await confetti("tsparticles", {
        //------------------------------------------
        angle: 90,
        count: 90,
        // life: {
        //   count: 3,
        //   duration: 0.5,
        // },
        position: {
          x: 50,
          y: 90,
        },
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        // colors: ["#ffffff", "#ff0000"],
        // shapes: ["square", "circle"],
        scalar: 1,
        zIndex: 1000,
        disableForReducedMotion: true,
      });
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      preset: "confetti",
      emitters: {
        life: {
          duration: 0.1,
          count: 3,
        },
      },
    }),
    []
  );

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesCannon;
