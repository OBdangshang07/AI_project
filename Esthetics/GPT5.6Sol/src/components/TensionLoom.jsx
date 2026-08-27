import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const CENTER = { x: 450, y: 450 }
const AXES = {
  intent: { angle: -90, label: '意图', short: 'I' },
  evidence: { angle: 30, label: '证据', short: 'E' },
  imagination: { angle: 150, label: '想象', short: 'M' },
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (value, start, end) => {
  const t = clamp((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}

function polar(angle, radius, center = CENTER) {
  const radians = (angle * Math.PI) / 180
  return {
    x: center.x + Math.cos(radians) * radius,
    y: center.y + Math.sin(radians) * radius,
  }
}

function valuePoint(key, value) {
  return polar(AXES[key].angle, lerp(112, 310, value))
}

function signaturePath(weights, progress) {
  const values = [weights.intent, weights.evidence, weights.imagination]
  const formation = smooth(progress, 0.52, 0.9)
  const points = Array.from({ length: 12 }, (_, index) => {
    const angle = -90 + index * 30
    const sector = Math.floor(index / 4) % 3
    const next = (sector + 1) % 3
    const mix = (index % 4) / 4
    const pressure = lerp(values[sector], values[next], mix)
    const cadence = Math.sin(index * 2.37 + weights.intent * 3) * 10
    const radius = lerp(22, 96 + pressure * 72 + cadence, formation)
    return polar(angle, radius)
  })

  const first = points[0]
  let path = `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]
    const next = points[(index + 1) % points.length]
    const midpoint = {
      x: (current.x + next.x) / 2,
      y: (current.y + next.y) / 2,
    }
    path += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${midpoint.x.toFixed(1)} ${midpoint.y.toFixed(1)}`
  }
  path += ' Z'
  return path
}

function threadPath(index, weights, progress) {
  const angle = index * 30 - 15
  const start = polar(angle, 430)
  const end = polar(angle + 180, 430)
  const weave = smooth(progress, 0.08, 0.68)
  const bind = smooth(progress, 0.62, 1)
  const pressure = [weights.intent, weights.evidence, weights.imagination][index % 3]
  const tangent = polar(angle + 90, 1, { x: 0, y: 0 })
  const bias = (pressure - 0.5) * 135
  const orbit = lerp(205, 62 + pressure * 36, weave)
  const pull = bind * (index % 2 ? 18 : -18)
  const c1 = {
    x: CENTER.x + tangent.x * (orbit + bias) + Math.cos(index) * 24 * (1 - bind),
    y: CENTER.y + tangent.y * (orbit + bias) + Math.sin(index) * 24 * (1 - bind),
  }
  const c2 = {
    x: CENTER.x - tangent.x * (orbit - bias) + pull,
    y: CENTER.y - tangent.y * (orbit - bias) - pull,
  }

  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
}

function branchPath(index, weights, progress) {
  const originKey = ['intent', 'evidence', 'imagination'][index % 3]
  const origin = valuePoint(originKey, weights[originKey])
  const turn = smooth(progress, 0.4, 0.7)
  const target = polar(index * 51 - 90, lerp(130, 330, turn))
  const bend = polar(index * 73, 80 + index * 5)
  return `M ${origin.x.toFixed(1)} ${origin.y.toFixed(1)} Q ${bend.x.toFixed(1)} ${bend.y.toFixed(1)} ${target.x.toFixed(1)} ${target.y.toFixed(1)}`
}

export default function TensionLoom({ weights, onWeightChange, progress, seams, onSeamsChange, mode, chapter }) {
  const svgRef = useRef(null)
  const [dragging, setDragging] = useState(null)
  const [pulse, setPulse] = useState(0)
  const paths = useMemo(
    () => Array.from({ length: 12 }, (_, index) => threadPath(index, weights, progress)),
    [weights, progress],
  )
  const signature = useMemo(() => signaturePath(weights, progress), [weights, progress])

  const updateFromPointer = useCallback((key, clientX, clientY) => {
    const svg = svgRef.current
    if (!svg) return
    const point = svg.createSVGPoint()
    point.x = clientX
    point.y = clientY
    const local = point.matrixTransform(svg.getScreenCTM().inverse())
    const radians = (AXES[key].angle * Math.PI) / 180
    const projection = (local.x - CENTER.x) * Math.cos(radians) + (local.y - CENTER.y) * Math.sin(radians)
    onWeightChange(key, clamp((projection - 112) / 198))
  }, [onWeightChange])

  useEffect(() => {
    if (!dragging) return undefined
    const move = (event) => {
      event.preventDefault()
      updateFromPointer(dragging, event.clientX, event.clientY)
    }
    const end = () => {
      setDragging(null)
      setPulse((value) => value + 1)
      if ('vibrate' in navigator) navigator.vibrate(8)
    }
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', end, { once: true })
    window.addEventListener('pointercancel', end, { once: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
    }
  }, [dragging, updateFromPointer])

  const handleKeyDown = (event, key) => {
    const directions = { ArrowUp: 0.04, ArrowRight: 0.04, ArrowDown: -0.04, ArrowLeft: -0.04 }
    if (event.key in directions) {
      event.preventDefault()
      onWeightChange(key, clamp(weights[key] + directions[event.key]))
      setPulse((value) => value + 1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      onWeightChange(key, event.key === 'Home' ? 0 : 1)
      setPulse((value) => value + 1)
    }
  }

  const formation = smooth(progress, 0.52, 0.9)
  const conflict = smooth(progress, 0.32, 0.62) * (1 - smooth(progress, 0.72, 0.94))

  return (
    <div className={`loom-shell ${dragging ? 'is-dragging' : ''} ${seams ? 'is-seams' : ''}`} data-mode={mode} data-chapter={chapter}>
      <div className="loom-caption" aria-hidden="true">
        <span>{mode}</span>
        <span>{progress < 0.01 && chapter === 'story' ? '拖动红点 / DRAG' : `${String(Math.round(progress * 100)).padStart(2, '0')} / 100`}</span>
      </div>

      <svg
        ref={svgRef}
        className="loom-svg"
        viewBox="0 0 900 900"
        role="group"
        aria-label="张力织机：拖动意图、证据与想象三个控制点，改变回答印记。"
        style={{ '--formation': formation, '--conflict': conflict, '--pulse': pulse }}
      >
        <defs>
          <filter id="paper-bleed" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
          </filter>
          <clipPath id="signature-clip">
            <path d={signature} />
          </clipPath>
        </defs>

        <g className="registration" aria-hidden="true">
          <circle cx="450" cy="450" r="309" />
          <circle cx="450" cy="450" r="112" />
          <path d="M 450 95 V 128 M 450 772 V 805 M 95 450 H 128 M 772 450 H 805" />
          <text x="450" y="79">TENSION FIELD / 01</text>
        </g>

        <g className="warp-threads" aria-hidden="true">
          {paths.map((path, index) => (
            <path
              key={index}
              d={path}
              className={index % 3 === 0 ? 'thread thread-accent' : 'thread'}
              style={{ '--i': index, '--pressure': [weights.intent, weights.evidence, weights.imagination][index % 3] }}
            />
          ))}
        </g>

        <g className="counterfactuals" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => (
            <path key={index} d={branchPath(index, weights, progress)} style={{ '--i': index }} />
          ))}
          <text x="658" y="182">也可以更快</text>
          <text x="120" y="684">也可以更确定</text>
          <text x="639" y="707">也可以更漂亮</text>
        </g>

        <g className="axis-lines" aria-hidden="true">
          {Object.entries(AXES).map(([key, axis]) => {
            const end = polar(axis.angle, 310)
            const value = valuePoint(key, weights[key])
            return (
              <g key={key}>
                <path d={`M ${CENTER.x} ${CENTER.y} L ${end.x} ${end.y}`} />
                <path className="axis-pressure" d={`M ${CENTER.x} ${CENTER.y} L ${value.x} ${value.y}`} />
              </g>
            )
          })}
        </g>

        <g className="seal" aria-hidden="true">
          <path className="seal-shadow" d={signature} />
          <path className="seal-body" d={signature} filter="url(#paper-bleed)" />
          <g clipPath="url(#signature-clip)" className="seal-hatch">
            {Array.from({ length: 18 }, (_, index) => (
              <line key={index} x1={285 + index * 18} y1="280" x2={165 + index * 18} y2="620" />
            ))}
          </g>
          <circle cx="450" cy="450" r={10 + formation * 11} />
          {pulse > 0 && <circle key={pulse} className="impact-ring" cx="450" cy="450" r="25" />}
        </g>

        <g className="tension-nodes">
          {Object.entries(AXES).map(([key, axis]) => {
            const point = valuePoint(key, weights[key])
            const labelPoint = polar(axis.angle, 355)
            return (
              <g
                key={key}
                className={`tension-node tension-node-${key}`}
                transform={`translate(${point.x} ${point.y})`}
                role="slider"
                tabIndex="0"
                aria-label={`${axis.label}张力`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={Math.round(weights[key] * 100)}
                aria-valuetext={`${Math.round(weights[key] * 100)}%，使用方向键调节`}
                onPointerDown={(event) => {
                  event.preventDefault()
                  setDragging(key)
                  updateFromPointer(key, event.clientX, event.clientY)
                }}
                onKeyDown={(event) => handleKeyDown(event, key)}
              >
                <circle className="node-hit" r="38" />
                <circle className="focus-halo" r="23" />
                <circle className="node-core" r="12" />
              </g>
            )
          })}
          {Object.entries(AXES).map(([key, axis]) => {
            const point = polar(axis.angle, 350)
            return (
              <text
                key={key}
                className={`axis-label axis-label-${key}`}
                x={point.x}
                y={point.y}
                textAnchor="middle"
              >
                {axis.label} {Math.round(weights[key] * 100)}
              </text>
            )
          })}
        </g>
      </svg>

      <button
        type="button"
        className="seams-toggle"
        aria-pressed={seams}
        onPointerDown={() => onSeamsChange(true)}
        onPointerUp={() => onSeamsChange(false)}
        onPointerCancel={() => onSeamsChange(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') onSeamsChange(true)
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') onSeamsChange(false)
        }}
      >
        <span className="seams-mark">⌁</span>
        <span>{seams ? '松开，重新收束' : '按住，看见未说出口的部分'}</span>
        <kbd>Space</kbd>
      </button>
    </div>
  )
}
