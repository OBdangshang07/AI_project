/* ============ 信息面板数据装配（与原单文件版 showInfo 完全一致） ============ */
export function buildInfo(d) {
  const base = d || { cn: '太阳系', en: 'Solar System', type: '行星系统', desc: '一座以实时轨道动力学驱动的程序化太阳系。双击任意天体进入近地观察。' }
  return {
    cn: base.cn,
    en: base.en.toUpperCase(),
    desc: base.desc || `${base.cn}是一颗以程序化分形纹理重建的${base.type}，其轨道由真实半长轴、偏心率与周期驱动。`,
    type: base.type,
    diameter: base.diameter ? base.diameter.toLocaleString() + ' km' : '—',
    axis: base.distanceKm ? base.distanceKm.toLocaleString() + ' km'
      : base.a !== undefined ? (base.a ? base.a.toFixed(base.a < 10 ? 3 : 2) + ' AU' : '0 AU') : '—',
    rotation: typeof base.rot === 'number'
      ? `${Math.abs(base.rot).toLocaleString()} 地球日${base.rot < 0 ? ' · 逆行' : ''}` : (base.rot || '—'),
    orbit: base.periodDays ? base.periodDays + ' 地球日' : (base.period ? base.period + ' 地球年' : '—'),
    temp: base.temp || '—',
    moons: base.moons !== undefined ? String(base.moons) : '—',
  }
}
