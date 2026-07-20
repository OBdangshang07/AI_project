/* ============ 信息面板格式化（与原单文件版一致） ============ */
export function fmtPeriod(days) {
  if (days === undefined) return '—'
  const neg = days < 0 ? '（逆行）' : ''
  const d = Math.abs(days)
  return d >= 730 ? (d / 365.25).toFixed(1) + ' 地球年' + neg : d.toFixed(1) + ' 天' + neg
}

export function fmtRot(def) {
  const h = def.rotH
  if (h === undefined || h === null) {
    return def.parent && def.per ? Math.abs(def.per).toFixed(1) + ' 天（潮汐锁定）' : '—'
  }
  const neg = h < 0 ? '（逆行）' : ''
  const a = Math.abs(h)
  return a >= 48 ? (a / 24).toFixed(1) + ' 地球日' + neg : a.toFixed(1) + ' 小时' + neg
}
