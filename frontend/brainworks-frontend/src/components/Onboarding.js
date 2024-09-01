import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';  // Html을 추가로 임포트
import './Onboarding.css';

function BrainModel() {
    const { scene } = useGLTF('/finalbrain.glb');
    return <primitive object={scene} scale={0.029} />;
}

function Onboarding() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="onboarding">
            <h1>Hi, I'm BrainWorks!</h1>
            <p>Your assistant therapist is coming...</p>
            <Canvas style={{ height: 500 }}>
                <Suspense fallback={<Html><span>Loading...</span></Html>}>  {/* Html로 감싸기 */}
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <BrainModel />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} maxDistance={5} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Onboarding;
