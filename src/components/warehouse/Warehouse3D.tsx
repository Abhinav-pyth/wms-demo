import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Warehouse Floor
const Floor: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
    <planeGeometry args={[40, 30]} />
    <meshStandardMaterial color="#e2e8f0" />
  </mesh>
);

// Warehouse Walls
const Walls: React.FC = () => (
  <group>
    {/* Back wall */}
    <mesh position={[0, 3, -15]} receiveShadow>
      <boxGeometry args={[40, 6, 0.2]} />
      <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
    </mesh>
    {/* Left wall */}
    <mesh position={[-20, 3, 0]} receiveShadow>
      <boxGeometry args={[0.2, 6, 30]} />
      <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
    </mesh>
    {/* Right wall */}
    <mesh position={[20, 3, 0]} receiveShadow>
      <boxGeometry args={[0.2, 6, 30]} />
      <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
    </mesh>
    {/* Roof beams */}
    {[-15, -5, 5, 15].map((x, i) => (
      <mesh key={i} position={[x, 5.8, 0]}>
        <boxGeometry args={[0.3, 0.3, 30]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    ))}
  </group>
);

// Storage Rack
const Rack: React.FC<{ position: [number, number, number]; color?: string }> = ({ position, color = '#94a3b8' }) => (
  <group position={position}>
    {/* Vertical posts */}
    {[[-0.8, 0, -0.3], [0.8, 0, -0.3], [-0.8, 0, 0.3], [0.8, 0, 0.3]].map((pos, i) => (
      <mesh key={i} position={[pos[0], 2, pos[2]]} castShadow>
        <boxGeometry args={[0.08, 4, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
    ))}
    {/* Shelves */}
    {[0.5, 1.5, 2.5, 3.5].map((y, i) => (
      <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    ))}
  </group>
);

// Box on shelf
const Box: React.FC<{ position: [number, number, number]; color?: string; size?: [number, number, number] }> = ({ position, color = '#f59e0b', size = [0.3, 0.25, 0.3] }) => (
  <mesh position={position} castShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>
);

// Pallet
const Pallet: React.FC<{ position: [number, number, number]; onClick?: () => void }> = ({ position, onClick }) => (
  <group position={position} onClick={onClick}>
    {/* Pallet base */}
    <mesh position={[0, 0.08, 0]} castShadow>
      <boxGeometry args={[1.2, 0.15, 1]} />
      <meshStandardMaterial color="#92400e" />
    </mesh>
    {/* Boxes on pallet */}
    {[[-0.3, 0.35, -0.2], [0.3, 0.35, -0.2], [-0.3, 0.35, 0.2], [0.3, 0.35, 0.2]].map((pos, i) => (
      <Box key={i} position={[pos[0], pos[1], pos[2]]} color={['#f59e0b', '#3b82f6', '#10b981', '#f59e0b'][i]} size={[0.4, 0.3, 0.35]} />
    ))}
    {/* Top layer */}
    {[[-0.2, 0.65, 0], [0.2, 0.65, 0]].map((pos, i) => (
      <Box key={`t${i}`} position={[pos[0], pos[1], pos[2]]} color="#6366f1" size={[0.35, 0.25, 0.4]} />
    ))}
  </group>
);

// Forklift
const ForkliftModel: React.FC<{ position: [number, number, number]; rotation?: number; onClick?: () => void }> = ({ position, rotation = 0, onClick }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position} rotation={[0, rotation, 0]} onClick={onClick}
      onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.4]} />
        <meshStandardMaterial color={hovered ? '#f97316' : '#f59e0b'} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 1, -0.2]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Mast */}
      <mesh position={[0, 1.2, 0.6]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      {/* Forks */}
      <mesh position={[-0.2, 0.2, 1]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.8]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <mesh position={[0.2, 0.2, 1]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.8]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      {/* Wheels */}
      {[[-0.35, 0.15, -0.5], [0.35, 0.15, -0.5], [-0.3, 0.12, 0.4], [0.3, 0.12, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], pos[2]]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      ))}
      {/* Warning light */}
      <mesh position={[0, 1.35, -0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Truck
const TruckModel: React.FC<{ position: [number, number, number]; rotation?: number }> = ({ position, rotation = 0 }) => (
  <group position={position} rotation={[0, rotation, 0]}>
    {/* Trailer */}
    <mesh position={[0, 1.2, -1.5]} castShadow>
      <boxGeometry args={[2.2, 2.2, 4]} />
      <meshStandardMaterial color="#f8fafc" />
    </mesh>
    {/* Cab */}
    <mesh position={[0, 0.9, 1.2]} castShadow>
      <boxGeometry args={[2, 1.6, 1.5]} />
      <meshStandardMaterial color="#1e40af" />
    </mesh>
    {/* Windshield */}
    <mesh position={[0, 1.2, 1.96]}>
      <boxGeometry args={[1.6, 0.8, 0.05]} />
      <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} />
    </mesh>
    {/* Wheels */}
    {[[-0.9, 0.3, -2.5], [0.9, 0.3, -2.5], [-0.9, 0.3, -0.5], [0.9, 0.3, -0.5], [-0.9, 0.3, 1.2], [0.9, 0.3, 1.2]].map((pos, i) => (
      <mesh key={i} position={[pos[0], pos[1], pos[2]]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 12]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    ))}
  </group>
);

// Worker (simple figure)
const WorkerModel: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });
  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.4, 4, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
};

// Zone Label
const ZoneLabel: React.FC<{ position: [number, number, number]; text: string; color: string }> = ({ position, text, color }) => (
  <group position={position}>
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 1.5]} />
      <meshStandardMaterial color={color} transparent opacity={0.15} />
    </mesh>
    <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color={color} anchorX="center" anchorY="middle">
      {text}
    </Text>
  </group>
);

// Loading Dock
const LoadingDock: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.4, 0]} castShadow>
      <boxGeometry args={[3, 0.8, 2]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
    <mesh position={[0, 0.85, 0]}>
      <boxGeometry args={[2.8, 0.1, 1.8]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
  </group>
);

// Conveyor Belt
const ConveyorBelt: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1, 0.3, 6]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
    {/* Rollers */}
    {Array.from({ length: 12 }).map((_, i) => (
      <mesh key={i} position={[0, 0.68, -2.5 + i * 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
    ))}
    {/* Legs */}
    {[[-0.4, 0, -2.5], [0.4, 0, -2.5], [-0.4, 0, 0], [0.4, 0, 0], [-0.4, 0, 2.5], [0.4, 0, 2.5]].map((pos, i) => (
      <mesh key={i} position={[pos[0], 0.2, pos[2]]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
    ))}
  </group>
);

// Main Warehouse Scene
const WarehouseScene: React.FC<{ onZoneClick: (zone: string) => void }> = ({ onZoneClick }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 5, 0]} intensity={0.3} />

      <Floor />
      <Walls />

      {/* Zone Labels */}
      <ZoneLabel position={[-12, 0.01, -8]} text="ZONE A" color="#3b82f6" />
      <ZoneLabel position={[-4, 0.01, -8]} text="ZONE B" color="#10b981" />
      <ZoneLabel position={[5, 0.01, -8]} text="ZONE C" color="#f59e0b" />
      <ZoneLabel position={[-15, 0.01, 8]} text="RECEIVING" color="#8b5cf6" />
      <ZoneLabel position={[15, 0.01, 8]} text="SHIPPING" color="#ef4444" />
      <ZoneLabel position={[0, 0.01, 2]} text="CONVEYOR" color="#6366f1" />

      {/* Storage Racks - Zone A */}
      {[-14, -12, -10].map((x, i) => (
        <Rack key={`a-${i}`} position={[x, 0, -10]} />
      ))}
      {[-14, -12, -10].map((x, i) => (
        <Rack key={`a2-${i}`} position={[x, 0, -7]} />
      ))}

      {/* Storage Racks - Zone B */}
      {[-6, -4, -2].map((x, i) => (
        <Rack key={`b-${i}`} position={[x, 0, -10]} />
      ))}
      {[-6, -4, -2].map((x, i) => (
        <Rack key={`b2-${i}`} position={[x, 0, -7]} />
      ))}

      {/* Storage Racks - Zone C */}
      {[3, 5, 7].map((x, i) => (
        <Rack key={`c-${i}`} position={[x, 0, -10]} />
      ))}
      {[3, 5, 7].map((x, i) => (
        <Rack key={`c2-${i}`} position={[x, 0, -7]} />
      ))}

      {/* Boxes on shelves */}
      {[-14, -12, -10, -6, -4, -2, 3, 5, 7].map((x, i) => (
        <React.Fragment key={`boxes-${i}`}>
          <Box position={[x - 0.4, 0.7, -10]} color="#f59e0b" />
          <Box position={[x + 0.4, 0.7, -10]} color="#3b82f6" />
          <Box position={[x, 1.7, -10]} color="#10b981" />
          <Box position={[x - 0.4, 2.7, -10]} color="#8b5cf6" />
        </React.Fragment>
      ))}

      {/* Pallets */}
      <Pallet position={[-8, 0, -3]} onClick={() => onZoneClick('pallet-1')} />
      <Pallet position={[-5, 0, -3]} onClick={() => onZoneClick('pallet-2')} />
      <Pallet position={[2, 0, -3]} onClick={() => onZoneClick('pallet-3')} />
      <Pallet position={[8, 0, -3]} onClick={() => onZoneClick('pallet-4')} />
      <Pallet position={[-12, 0, 4]} />
      <Pallet position={[10, 0, 4]} />

      {/* Forklifts */}
      <ForkliftModel position={[-8, 0, 0]} rotation={Math.PI / 4} onClick={() => onZoneClick('forklift-1')} />
      <ForkliftModel position={[5, 0, -1]} rotation={-Math.PI / 6} onClick={() => onZoneClick('forklift-2')} />
      <ForkliftModel position={[-14, 0, 5]} rotation={Math.PI / 2} onClick={() => onZoneClick('forklift-3')} />

      {/* Loading Docks */}
      <LoadingDock position={[-15, 0, 12]} />
      <LoadingDock position={[-10, 0, 12]} />
      <LoadingDock position={[10, 0, 12]} />
      <LoadingDock position={[15, 0, 12]} />

      {/* Trucks at docks */}
      <TruckModel position={[-15, 0, 14]} rotation={Math.PI} />
      <TruckModel position={[15, 0, 14]} rotation={Math.PI} />

      {/* Conveyor Belt */}
      <ConveyorBelt position={[0, 0, 3]} />

      {/* Workers */}
      <WorkerModel position={[-6, 0, -5]} />
      <WorkerModel position={[3, 0, -5]} />
      <WorkerModel position={[-13, 0, 6]} />
      <WorkerModel position={[12, 0, 6]} />
      <WorkerModel position={[0, 0, 5]} />

      {/* Boxes near conveyor */}
      {[-0.8, -0.3, 0.2, 0.7].map((z, i) => (
        <Box key={`conv-${i}`} position={[0, 0.8, 3 + z]} color={['#f59e0b', '#3b82f6', '#10b981', '#ef4444'][i]} size={[0.25, 0.2, 0.25]} />
      ))}
    </>
  );
};

// Info Panel for clicked items
interface InfoPanelProps {
  selectedItem: string | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  const info: Record<string, { title: string; data: { label: string; value: string }[] }> = {
    'pallet-1': { title: 'Pallet PAL-88421', data: [
      { label: 'SKU', value: 'LED Panel 60x60' }, { label: 'Quantity', value: '48' },
      { label: 'Location', value: 'A-04-12' }, { label: 'Status', value: 'Reserved' },
    ]},
    'pallet-2': { title: 'Pallet PAL-88422', data: [
      { label: 'SKU', value: 'USB-C Cable 2m' }, { label: 'Quantity', value: '120' },
      { label: 'Location', value: 'B-05-03' }, { label: 'Status', value: 'In Stock' },
    ]},
    'pallet-3': { title: 'Pallet PAL-88423', data: [
      { label: 'SKU', value: 'Office Chair' }, { label: 'Quantity', value: '24' },
      { label: 'Location', value: 'B-02-05' }, { label: 'Status', value: 'Available' },
    ]},
    'pallet-4': { title: 'Pallet PAL-88424', data: [
      { label: 'SKU', value: 'A4 Paper 500 Sheets' }, { label: 'Quantity', value: '200' },
      { label: 'Location', value: 'C-03-07' }, { label: 'Status', value: 'In Stock' },
    ]},
    'forklift-1': { title: 'Forklift FL-01', data: [
      { label: 'Status', value: 'Loading' }, { label: 'Operator', value: 'Daniel Smith' },
      { label: 'Battery', value: '78%' }, { label: 'Current Task', value: 'Loading TRK-2127' },
    ]},
    'forklift-2': { title: 'Forklift FL-02', data: [
      { label: 'Status', value: 'Putaway' }, { label: 'Operator', value: 'Maria Garcia' },
      { label: 'Battery', value: '92%' }, { label: 'Current Task', value: 'Putaway PAL-88422' },
    ]},
    'forklift-3': { title: 'Forklift FL-03', data: [
      { label: 'Status', value: 'Loading' }, { label: 'Operator', value: 'James Wilson' },
      { label: 'Battery', value: '14%' }, { label: 'Current Task', value: 'Loading TRK-2127' },
    ]},
  };

  const itemInfo = info[selectedItem];
  if (!itemInfo) return null;

  return (
    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg p-4 w-64 z-10 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">{itemInfo.title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">&times;</button>
      </div>
      <div className="space-y-2">
        {itemInfo.data.map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-xs text-slate-500">{item.label}</span>
            <span className="text-xs font-medium text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main 3D Viewer Component
interface WarehouseViewerProps {
  className?: string;
}

export const WarehouseViewer3D: React.FC<WarehouseViewerProps> = ({ className = '' }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [layers, setLayers] = useState({
    inventory: true, forklifts: true, trucks: true, workers: true, zones: true, shipments: true
  });
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-50 ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 text-sm font-medium">+</button>
        <button className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 text-sm font-medium">−</button>
        <button className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50" title="Reset View">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
        <button
          onClick={() => setShowLayers(!showLayers)}
          className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50"
          title="Layers"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </button>
      </div>

      {/* Layers Panel */}
      {showLayers && (
        <div className="absolute top-4 right-14 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-10 animate-fade-in">
          <p className="text-xs font-semibold text-slate-500 mb-2">LAYERS</p>
          {Object.entries(layers).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setLayers(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700 capitalize">{key}</span>
            </label>
          ))}
        </div>
      )}

      {/* Info Panel */}
      <InfoPanel selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [20, 18, 20], fov: 45 }}
        style={{ height: '100%', minHeight: '450px' }}
      >
        <Suspense fallback={null}>
          <WarehouseScene onZoneClick={(zone) => setSelectedItem(zone)} />
          <OrbitControls
            makeDefault
            minDistance={8}
            maxDistance={45}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500 font-medium">DIGITAL TWIN</span>
          <span className="text-[10px] text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-live" />
            Real-time
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500">6 Forklifts</span>
          <span className="text-[10px] text-slate-500">3 Trucks</span>
          <span className="text-[10px] text-slate-500">5 Workers</span>
        </div>
      </div>
    </div>
  );
};
