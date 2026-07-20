import { ref, computed, markRaw } from 'vue'
import { defineStore } from 'pinia'
import { sliderScale, fmtInt } from '../engine/math.js'

/**
 * 太阳系 UI 状态中枢：
 * - 3D 世界状态由 SolarSystemEngine 持有（单一事实来源，与原版一致）
 * - 本 store 保存引擎 hooks 回显的响应式镜像 + 转发 UI 动作到引擎
 */
export const useSolarStore = defineStore('solar', () => {
  /* ---- 引擎句柄（非响应式） ---- */
  let engine = null
  function bindEngine(e) { engine = e ? markRaw(e) : null }

  /* ---- 引擎回显的响应式镜像 ---- */
  const fpsText = ref('FPS --')
  const fpsColor = ref('#9fe8b0')
  const datetime = ref('2024-01-01 00:00 UTC')
  const bodyCountText = ref('天体总数 --')
  const selectedDef = ref(null)   // 当前选中天体的 def（纯数据）
  const tourText = ref(null)      // 导览横幅文案（null=隐藏）
  const measureText = ref(null)   // 测距结果框文案（null=隐藏）
  const paused = ref(false)
  const timeSlider = ref(67)
  const dirSign = ref(1)
  const realScale = ref(false)
  const measureActive = ref(false)
  const tourActive = ref(false)

  /* ---- 面板本地状态（双向绑定 + 转发引擎） ---- */
  const showBelt = ref(true)
  const showKuiper = ref(true)
  const showOrbits = ref(true)
  const showTrails = ref(true)
  const showLabels = ref(true)
  const showAtmos = ref(true)
  const brightness = ref(100)
  const starDensity = ref(100)

  /* ---- 引擎 hooks 回调 ---- */
  function setFps(n) { fpsText.value = 'FPS ' + n; fpsColor.value = n >= 30 ? '#9fe8b0' : '#ffb38a' }
  function setDatetime(s) { datetime.value = s }
  function setSelected(def) { selectedDef.value = def }
  function setTourText(t) { tourText.value = t }
  function setMeasureText(t) { measureText.value = t }
  function setBodyCount(n) { bodyCountText.value = '天体总数 ' + fmtInt(n) }

  /* ---- 派生文案 ---- */
  const timeLabel = computed(() => {
    if (paused.value) return '0x（暂停）'
    const s = sliderScale(timeSlider.value)
    return s >= 10 ? Math.round(s) + 'x' : s.toFixed(1) + 'x'
  })
  const dirText = computed(() => dirSign.value > 0 ? '公转方向：顺行' : '公转方向：逆行')
  const brightText = computed(() => (brightness.value / 100).toFixed(1))
  const starsText = computed(() => starDensity.value + '%')
  const scaleText = computed(() => realScale.value ? '真实比例：开' : '真实比例：关')
  const tourBtnText = computed(() => tourActive.value ? '■ 停止导览' : '▶ 星际导览')
  const measureBtnText = computed(() => measureActive.value ? '⇔ 测距中…（点击天体）' : '⇔ 测距工具')

  /* ---- UI 动作（转发引擎） ---- */
  function setBelt(v) { showBelt.value = v; engine?.setBeltVisible(v) }
  function setKuiper(v) { showKuiper.value = v; engine?.setKuiperVisible(v) }
  function setOrbits(v) { showOrbits.value = v; engine?.setOrbitsVisible(v) }
  function setTrails(v) { showTrails.value = v; engine?.setTrailsVisible(v) }
  function setLabels(v) { showLabels.value = v; engine?.setLabelsVisible(v) }
  function setAtmos(v) { showAtmos.value = v; engine?.setAtmosVisible(v) }
  function setTimeSlider(v) { timeSlider.value = v; engine?.setTimeSlider(v) }
  function toggleDirection() { engine?.toggleDirection() }
  function jumpToDate(dateStr) { engine?.jumpToDate(dateStr) }
  function setBrightness(v) { brightness.value = v; engine?.setBrightness(v) }
  function setStarDensity(v) { starDensity.value = v; engine?.setStarDensity(v) }
  function toggleTour() { engine?.toggleTour() }
  function toggleMeasure() { engine?.toggleMeasure() }
  function toggleRealScale() { engine?.toggleRealScale() }
  function screenshot() { engine?.screenshot() }
  function resetView() { engine?.resetView() }
  function preset(name) { engine?.preset(name) }
  function search(q) { return engine ? engine.searchBodies(q) : [] }
  function selectAndFocus(id) {
    if (!engine) return
    engine.selectById(id)
    engine.focusById(id)
  }

  return {
    bindEngine,
    fpsText, fpsColor, datetime, bodyCountText, selectedDef, tourText, measureText,
    paused, timeSlider, dirSign, realScale, measureActive, tourActive,
    showBelt, showKuiper, showOrbits, showTrails, showLabels, showAtmos, brightness, starDensity,
    setFps, setDatetime, setSelected, setTourText, setMeasureText, setBodyCount,
    timeLabel, dirText, brightText, starsText, scaleText, tourBtnText, measureBtnText,
    setBelt, setKuiper, setOrbits, setTrails, setLabels, setAtmos,
    setTimeSlider, toggleDirection, jumpToDate, setBrightness, setStarDensity,
    toggleTour, toggleMeasure, toggleRealScale, screenshot, resetView, preset,
    search, selectAndFocus,
  }
})
