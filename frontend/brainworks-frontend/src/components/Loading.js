import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import './Loading.css';

function BrainModel() {
    const { scene } = useGLTF('/finalbrain.glb');
    const [colorChange, setColorChange] = useState(0);

    // 색상 변화를 위한 useFrame 훅
    useFrame((state, delta) => {
        setColorChange(colorChange + delta);
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setHSL((colorChange / 10) % 1, 0.5, 0.5);
            }
        });
    });

    return <primitive object={scene} scale={0.029} />;
}

function Loading({ patientName, fileName }) {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 1;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, 100);

        const timer = setTimeout(() => {
            navigate('/analysis', { state: { patientName, fileName } });
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate, patientName, fileName]);

    return (
        <div className="loading-container">
            <Canvas style={{ height: 500 }}>
                <Suspense fallback={<Html><span>Loading...</span></Html>}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <BrainModel />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} maxDistance={5} />
                </Suspense>
            </Canvas>
            <p className="loading-text">
                BrainWorks is analyzing based on
                <span className="patient-name"> {patientName}’s</span>
                <span className="file-name"> {fileName}</span>.
            </p>
            <p className="loading-percentage">{progress}%</p>
        </div>
    );
}

export default Loading;
