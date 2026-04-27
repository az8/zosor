import React from 'react';

const SittingCatSvg = ({
  $outlineColor = '#37474f',
  direction = 'right',
  pointerDirection = 'horizontal',
  size = 150,
  showBody = true,
  variant = 1,
  headPosition = 'default',
  headSize = 'default',
}) => {
  const isLeft = direction === 'left';
  const svgTransform = isLeft ? 'scale(-1, 1)' : 'none';

  const vExpressiveAngles = { up: -80, down: 10, horizontal: -30 };
  const generalAngles = { up: -20, down: 20, horizontal: 0 };

  const rotation = ([5, 7, 8, 9].includes(variant))
    ? (vExpressiveAngles[pointerDirection] || -30)
    : (generalAngles[pointerDirection] || 0);

  const viewBox = showBody ? "0 0 100 120" : "28 0 55 50";
  const headTransform = headPosition === 'center' ? 'translate(-5, 0)' : 'none';

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: svgTransform,
        transformOrigin: '50% 50%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <g
        fill="none"
        stroke={$outlineColor}
        strokeWidth={showBody ? "2.5" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* === BODY VARIANTS === */}
        {showBody && (variant === 1 || variant === 2) && (
          <>
            <path d="M28 75 C 28 80, 20 85, 20 90 S 32 100, 35 95 C 38 92, 40 98, 40 105 L 80 105 C 90 105, 90 95, 80 85 S 55 45, 50 45 L 45 45" />
            <path d="M65 90 C 70 90, 75 100, 65 105 H 50" />
          </>
        )}
        {showBody && variant === 3 && (
          <path d="M 45 45 C 30 55, 30 90, 30 95 C 30 110, 70 110, 70 95 L 70 65 M 70 65 L 85 65 C 90 65, 90 60, 85 60 L 55 45 M 30 95 C 15 95, 10 105, 20 105 C 25 105, 30 100, 32 95" />
        )}
        {showBody && variant === 4 && (
          <path d="M 40 45 C 30 45, 25 55, 25 70 C 25 85, 35 90, 50 90 C 65 90, 75 85, 75 70 C 75 55, 70 45, 60 45" />
        )}
        {showBody && [5, 6].includes(variant) && (
          <><path d="M 40 45 L 35 50 C 30 55, 35 60, 50 60 C 65 60, 70 55, 65 50 L 60 45" /><path d="M 50 60 L 50 54" /></>
        )}
        {showBody && [7, 8, 9].includes(variant) && (
          <><path d="M 40 45 L 35 48 C 30 52, 35 52, 50 52 C 65 52, 70 52, 65 48 L 60 45" /><path d="M 50 52 L 50 48" /></>
        )}

        {/* === ARM LOGIC === */}
        {showBody && variant === 4 && (
          <>
            <g transform={`translate(30, 60) rotate(${-rotation})`}><path d="M 0 0 L -15 0" /><circle cx="-18" cy="0" r="2" fill={$outlineColor} stroke="none" /></g>
            <g transform={`translate(70, 60) rotate(${rotation})`}><path d="M 0 0 L 15 0" /><circle cx="18" cy="0" r="2" fill={$outlineColor} stroke="none" /></g>
          </>
        )}

        {/* Variant 9: Extra Long stick arms (3x original, 1.5x previous) */}
        {showBody && variant === 9 && (
          <>
            <g transform={`translate(35, 47) rotate(${-rotation - 45})`}>
              <path d="M 0 0 L -37.5 0" />
              <circle cx="-40.5" cy="0" r="2.5" fill={$outlineColor} stroke="none" />
            </g>
            <g transform={`translate(65, 47) rotate(${rotation + 45})`}>
              <path d="M 0 0 L 37.5 0" />
              <circle cx="40.5" cy="0" r="2.5" fill={$outlineColor} stroke="none" />
            </g>
          </>
        )}

        {showBody && variant === 8 && (
          <>
            <g transform={`translate(35, 48) rotate(${rotation - 20})`}><path d="M 0 0 C -15 -5, -18 -25, -5 -35" strokeWidth="3" /><circle cx="-5" cy="-37" r="2.5" fill={$outlineColor} stroke="none" /></g>
            <g transform={`translate(65, 48) rotate(${-rotation + 20})`}><path d="M 0 0 C 15 -5, 18 -25, 5 -35" strokeWidth="3" /><circle cx="5" cy="-37" r="2.5" fill={$outlineColor} stroke="none" /></g>
          </>
        )}

        {/* === UNIVERSAL HEAD === */}
        <g transform={headTransform}>
          {headSize === 'small' ? (
            <>
              <path d="M 35 22 V 33 Q 35 45, 55 45 Q 75 45, 75 33 V 22" />
              <path d="M 35 22 V 15" /><path d="M 75 22 V 15" />
              <path d="M 35 15 L 42 20 L 50 15" /><path d="M 75 15 L 68 20 L 60 15" />
              <path d="M 50 15 H 60" />
            </>
          ) : (
            <>
              <rect x="35" y="10" width="40" height="35" rx="12" />
              <path d="M40 10 L 32 0 L 48 10" />
              <path d="M70 10 L 78 0 L 62 10" />
            </>
          )}
          <circle cx="50" cy="28" r="1.5" fill={$outlineColor} stroke="none" />
          <circle cx="65" cy="28" r="1.5" fill={$outlineColor} stroke="none" />
          <path d="M55 36 C 55 38, 60 38, 60 36" />
          <path d="M38 25 H 28" /><path d="M38 31 H 30" />
          <path d="M72 25 H 82" /><path d="M72 31 H 80" />
        </g>

        {/* === OTHER VARIANTS ARMS (1, 2, 5, 7) === */}
        {showBody && variant === 1 && (
          <><g transform={`translate(45, 50) rotate(${rotation})`}><path d="M0 0 C -5 5, -10 7, -25 7 H -35" /><circle cx="-28" cy="7" r="3" fill={$outlineColor} stroke="none" /></g>
            <g transform={`translate(48, 62) rotate(${rotation})`}><path d="M0 0 C -5 8, -10 10, -25 10 H -35" /><circle cx="-28" cy="10" r="3" fill={$outlineColor} stroke="none" /></g></>
        )}
        {showBody && variant === 2 && (
          <><g transform={`translate(15, 30) rotate(${rotation})`}><path d="M35 15 C 30 20, 25 22, 15 22 H -5" /><circle cx="10" cy="22" r="3" fill={$outlineColor} stroke="none" /></g>
            <g transform={`translate(15, 45) rotate(${rotation})`}><path d="M40 5 C 35 12, 30 15, 20 15 H 0" /><circle cx="15" cy="15" r="3" fill={$outlineColor} stroke="none" /></g></>
        )}
        {showBody && variant === 5 && (
          <g transform={`translate(35, 52) rotate(${rotation})`}><path d="M 0 0 C -10 -5, -20 -5, -30 0" strokeWidth="3" /><circle cx="-32" cy="0" r="2.5" fill={$outlineColor} stroke="none" /></g>
        )}
        {showBody && variant === 7 && (
          <g transform={`translate(35, 50) rotate(${rotation})`}><path d="M 0 0 C -10 -5, -20 -5, -30 0" strokeWidth="3" /><circle cx="-32" cy="0" r="2.5" fill={$outlineColor} stroke="none" /></g>
        )}
      </g>
    </svg>
  );
};

const PointingCat = ({
  direction = 'left',
  pointerDirection = 'horizontal',
  outlineColor = '#37474f',
  size = 150,
  showBody = true,
  variant = 1,
  headPosition = 'default',
  headSize = 'default',
  children
}) => {
  const isLeft = direction === 'left';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: isLeft ? 'row' : 'row-reverse' }}>
      <div style={{ flexShrink: 0 }}>
        <SittingCatSvg $outlineColor={outlineColor} direction={direction} pointerDirection={pointerDirection} size={size} showBody={showBody} variant={variant} headPosition={headPosition} headSize={headSize} />
      </div>
      {children && <div style={{ margin: '0 15px', textAlign: 'center' }}>{children}</div>}
    </div>
  );
};

export default PointingCat;