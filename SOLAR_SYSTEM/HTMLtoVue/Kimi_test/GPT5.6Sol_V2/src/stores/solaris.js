import { ref, computed, markRaw } from 'vue'
import { defineStore } from 'pinia'

/**
 * SOLARIS UI 状态中枢：
 * - 3D 世界状态由 SolarisEngine 持有（单一事实来源，与原版一致）
 * - 本 store 保存引擎 hooks 回显的响应式镜像 + 转发 UI 动作到引擎
 */
export const useSolarisStore = defineStore('solaris', () => {
  /* ---- 引擎句柄（非响应式） ---- */
  let engine = null
  function bindEngine(e) { engine = e ? markRaw(e) : null }

  /* ---- 引擎回显的响应式镜像 ---- */
  const fpsText = ref('FPS 60')
  const countText = ref('CELESTIAL OBJECTS 000')
  const dateText = ref('2046 · 01 · 01  00:00:00 UTC')
  const selectedDef = ref(null)
  const scienceHud = ref('选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距')
  const toastText = ref('')
  const toastShow = ref(false)
  const tourActive = ref(false)
  const tourTitle = ref('')
  const tourText = ref('')
  const followActive = ref(false)
  const measureActive = ref(false)
  const timeSpeed = ref(20)
  const dirSign = ref(1)
  const scaleRuler = ref('1 AU')

  /* ---- 面板本地状态（双向绑定 + 转发引擎） ---- */
  const showAsteroid = ref(true)
  const showKuiper = ref(true)
  const showOrbits = ref(true)
  const showLabels = ref(true)
  const showAtmo = ref(true)
  const showScience = ref(false)
  const showCinema = ref(true)
  const showAdaptive = ref(true)
  const brightness = ref(1.25)
  const starDensity = ref(100)

  /* ---- 引擎 hooks 回调 ---- */
  function setFps(n) { fpsText.value = 'FPS ' + n }
  function setCount(s) { countText.value = s }
  function setDate(s) { dateText.value = s }
  function setSelected(def) { selectedDef.value = def }
  function setScienceHud(s) { scienceHud.value = s }
  function setTourActive(b) { tourActive.value = b }
  function setTourCard({ title, text }) { tourTitle.value = title; tourText.value = text }
  function setFollowActive(b) { followActive.value = b }
  function setMeasureActive(b) { measureActive.value = b }
  function setScaleRuler(s) { scaleRuler.value = s }

  /* ---- Toast（2200ms 自动隐藏，重复触发重置计时，与原版一致） ---- */
  let toastTimer = null
  function toast(message) {
    toastText.value = message
    toastShow.value = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toastShow.value = false }, 2200)
  }

  /* ---- 派生文案 ---- */
  const directionText = computed(() => '公转方向 · ' + (dirSign.value > 0 ? '顺行' : '逆行'))
  const brightText = computed(() => brightness.value.toFixed(2))
  const starsText = computed(() => starDensity.value + '%')
  const pauseText = computed(() => timeSpeed.value ? '暂停' : '继续')
  const tourBtnText = computed(() => tourActive.value ? '停止导览' : '自动导览')
  const followBtnText = computed(() => followActive.value ? '解除跟随' : '锁定跟随')

  /* ---- UI 动作（转发引擎） ---- */
  function setAsteroid(v) { showAsteroid.value = v; engine?.setAsteroidVisible(v) }
  function setKuiper(v) { showKuiper.value = v; engine?.setKuiperVisible(v) }
  function setOrbits(v) { showOrbits.value = v; engine?.setOrbitsVisible(v) }
  function setLabels(v) { showLabels.value = v; engine?.setLabelsVisible(v) }
  function setAtmo(v) { showAtmo.value = v; engine?.setAtmoVisible(v) }
  function setScience(v) { showScience.value = v; engine?.setScienceVisible(v) }
  function setCinema(v) { showCinema.value = v; engine?.setCinema(v) }
  function setAdaptive(v) { showAdaptive.value = v; engine?.setAdaptive(v) }
  function setTimeSpeed(v) { timeSpeed.value = v; engine?.setTimeSpeed(v) }
  function toggleDirection() { engine?.toggleDirection() }
  function setBrightness(v) { brightness.value = v; engine?.setBrightness(v) }
  function setStarDensity(v) { starDensity.value = v; engine?.setStarDensity(v) }
  function jumpDays(n) { engine?.jumpDays(n) }
  function togglePause() { engine?.togglePause() }
  function goToday() { engine?.goToday() }
  function toggleMeasure() { engine?.toggleMeasure() }
  function toggleTour() { engine?.toggleTour() }
  function toggleFollow() { engine?.toggleFollow() }
  function reset() { engine?.reset() }
  function goView(name) { engine?.goView(name) }
  function search(q) { return engine ? engine.search(q) : [] }
  function selectAndFocus(id) { engine?.selectAndFocus(id) }

  return {
    bindEngine,
    fpsText, countText, dateText, selectedDef, scienceHud, toastText, toastShow,
    tourActive, tourTitle, tourText, followActive, measureActive, timeSpeed, dirSign, scaleRuler,
    showAsteroid, showKuiper, showOrbits, showLabels, showAtmo, showScience, showCinema, showAdaptive,
    brightness, starDensity,
    setFps, setCount, setDate, setSelected, setScienceHud, setTourActive, setTourCard,
    setFollowActive, setMeasureActive, setScaleRuler, toast,
    directionText, brightText, starsText, pauseText, tourBtnText, followBtnText,
    setAsteroid, setKuiper, setOrbits, setLabels, setAtmo, setScience, setCinema, setAdaptive,
    setTimeSpeed, toggleDirection, setBrightness, setStarDensity,
    jumpDays, togglePause, goToday, toggleMeasure, toggleTour, toggleFollow,
    reset, goView, search, selectAndFocus,
  }
})
