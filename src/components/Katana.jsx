import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Grid, useHelper } from '@react-three/drei';
import { BoxHelper } from 'three';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Katana() {

    const groupRef = useRef();
    const bladeRef = useRef();
    const sheathRef = useRef();

    const model = useGLTF("/models/Wakizashi.glb");

    const { camera, gl } = useThree();

    // ✅ camera setup
    useEffect(() => {
        camera.position.z = 0.7;

        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.6;
        gl.outputColorSpace = THREE.SRGBColorSpace;
    }, [camera, gl]);

    // ✅ textures
    const [
        normalMap,
        roughnessMap,
        metalnessMap,
        baseColorMap,
        heightMap,
        normalSheathMap,
        roughnessSheathMap,
        metalnessSheathMap,
        baseColorSheathMap,
        heightSheathMap
    ] = useTexture([
        "/Wakizashi_2_M_wakizashi_Normal.jpg",
        "/Wakizashi_2_M_wakizashi_Roughness.jpg",
        "/Wakizashi_2_M_wakizashi_Metallic.jpg",
        "/Wakizashi_2_M_wakizashi_BaseColor.jpg",
        "/Wakizashi_2_M_wakizashi_Height.jpg",
        "/Wakizashi_2_M_wakizashi_sheath_Normal.jpg",
        "/Wakizashi_2_M_wakizashi_sheath_Roughness.jpg",
        "/Wakizashi_2_M_wakizashi_sheath_Metallic.jpg",
        "/Wakizashi_2_M_wakizashi_sheath_BaseColor.jpg",
        "/Wakizashi_2_M_wakizashi_sheath_Height.jpg"
    ]);

    baseColorMap.colorSpace = THREE.SRGBColorSpace;
    baseColorSheathMap.colorSpace = THREE.SRGBColorSpace;

    normalMap.flipY = false;
    normalSheathMap.flipY = false;

    // ✅ materials
    const bladeMaterial = new THREE.MeshStandardMaterial({
        map: baseColorMap,
        normalMap,
        roughnessMap,
        metalnessMap,
        displacementMap: heightMap,
        displacementScale: 0.05,
        metalness: 1,
        roughness: 1
    });

    const sheathMaterial = new THREE.MeshStandardMaterial({
        map: baseColorSheathMap,
        normalMap: normalSheathMap,
        roughnessMap: roughnessSheathMap,
        metalnessMap: metalnessSheathMap,
        displacementMap: heightSheathMap,
        displacementScale: 0.05,
        metalness: 1,
        roughness: 1
    });

    // ✅ assign meshes properly
    useEffect(() => {
        model.scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name.toLowerCase().includes("sheath")) {
                    child.material = sheathMaterial;
                    sheathRef.current = child;
                } else {
                    child.material = bladeMaterial;
                    bladeRef.current = child;
                }
            }
        });
    }, [model]);

    // ✅ debug helpers (bounding boxes)
    // useHelper(bladeRef, BoxHelper, 'yellow');
    // useHelper(sheathRef, BoxHelper, 'cyan');

    // ✅ GSAP animation
    useGSAP(() => {
        if (!groupRef.current || !sheathRef.current || !bladeRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-1",
                start: "top top",
                end: "+=4000",
                scrub: 1,
                pin: true,
                markers: true,
                anticipatePin: 1
            }
        });

        tl.to(".bg-layer", {
            autoAlpha: 0
        }, 0.7)
            .to(groupRef.current.position, {
                x: -0.06,
                y: 0.20,
                z: -0.08
            }, 0)

            .to(groupRef.current.rotation, {
                y: 0.1,
                // z: 0
            }, 0)

            .to(groupRef.current.scale, {
                x: 2.212,
                y: 2.21,
                z: 2.21
            }, 0)
            .to(sheathRef.current.position, {
                x: "+=0.36",
                z: "-=0.02"
            }, 0)
            .to(sheathRef.current.rotation, {
                x: "+=0.06"
            }, 0)

            // .to(bladeRef.current.position, {
            //     x: "+=0.36",
            //     z:"-=0.02"
            // }, 0)
            .to(bladeRef.current.rotation, {

                z: "-=0.09"
            }, 0)
            .to(groupRef.current.scale, {
                x: 1.912,
                y: 1.91,
                z: 1.91
            }, 0.6);


        // .to(groupRef.current.rotation, {
        //     x: "+=5",
        //     y: -0.1,
        //     z: 0
        // }, 0);

    }, []);


    useGSAP(() => {
        if (!groupRef.current || !sheathRef.current || !bladeRef.current) return;

        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-2",
                start: "top top",
                end: "+=6500",
                scrub: true,
                pin: true,
                markers: true
            }
        });

        // 🔥 TEXT ANIMATION (center reveal)
        const words = gsap.utils.toArray(".word");

        // 🔥 TEXT ANIMATION (center reveal)
        tl1.to(".reveal-text", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, 0.2)

            .to(".reveal-text", {
                opacity: 0,
                y: -100,
                duration: 1,
                ease: "power3.in"
            }, 0.6);
        // ⚔️ Your existing animation
        tl1
            .to(bladeRef.current.rotation, {
                x: "-=19.00",
                z: "+=.27",
            }, 0)

            .to(sheathRef.current.rotation, {
                x: "-=18.98",
            }, 0)

            .to(sheathRef.current.position, {
                x: "-=0.40",
                y: "-=0.08",
                z: "+=0.35"
            }, 0)

            .to(groupRef.current.position, {
                x: -0.25
            }, 0);

    }, []);

    useGSAP(() => {
        if (!groupRef.current || !sheathRef.current || !bladeRef.current) return;

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-3",
                endTrigger: "#section-3",
                start: "top top",
                end: "+=2000",
                scrub: true,
                pin: true,
                markers: true,
                anticipatePin: 1

            }
        });

        tl2
            .to(groupRef.current.rotation, {
                y: Math.PI / 3,
            }, 0)

            .to(bladeRef.current.position, {
                y: "+=1.00",
                z: "+=.27",
            }, 0)
            .to(sheathRef.current.position, {
                y: "+=1.00",
                x: "+=.37",
            }, 0)
            .to(sheathRef.current.rotation, {
                z: "+=.29",
            }, 0)



            .to(bladeRef.current.position, {
                x: +0.319,
            }, 0.7)
            .to(sheathRef.current.position, {

                z: "-=0.071100001"
            }, 0.7)
            .to(sheathRef.current.rotation, {

                z: "-=0.119"
            }, 0.7)
            .to(".blade-container", {
                opacity: 1,
                ease: "power3.out"
            }, 0.7)
            .to(groupRef.current,{
                // opacity:0,
                visible:false

            },0.8)

        // .to(groupRef.current.scale, {
        //     x: 1.912,
        //     y: 1.91,
        //     z: 1.91
        // }, 0)

        // .to(sheathRef.current.rotation, {
        //     x: "-=18.98",
        // }, 0)


        // // ✅ FIXED
        // .to(groupRef.current.scale, {
        //     x: 0.01,
        //     y: 0.01,
        //     z: 0.01
        // }, ">")

        // .set(groupRef.current, {
        //     visible: false
        // });

    }, []);

    return (
        <>
            {/* ✅ GROUP (pivot fix) */}
            <group
                ref={groupRef}
                position={[-0.8, -0.0001, 0.10]}
                scale={[7, 7, 5]}
                rotation={[1.92, 0.30, 2.94]}
            >
                <primitive object={model.scene} />
            </group>

            {/* ✅ DEBUG HELPERS (FIXED) */}
            {/* <axesHelper args={[2]} /> */}
            {/* <gridHelper args={[10, 10]} /> */}

            {/* ✅ LIGHTING */}
            <directionalLight position={[5, -8, 0]} intensity={2} />
            <ambientLight intensity={0.3} />
            <hemisphereLight skyColor="white" groundColor="black" intensity={0.23} />

            <Environment preset="night" intensity={0.01} />
        </>
    );
}

export default Katana;