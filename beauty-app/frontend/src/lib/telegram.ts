export function initTelegram() {
  if (typeof window === 'undefined') return
  try {
    const tg = (window as any).Telegram?.WebApp
    if (tg) {
      tg.expand()
      tg.ready()
    }
  } catch { /* not in Telegram */ }
}

export function getTelegramUser() {
  try {
    const tg = (window as any).Telegram?.WebApp
    return tg?.initDataUnsafe?.user ?? null
  } catch {
    return { id: 0, firstName: 'Гость', username: undefined }
  }
}

export function getTelegramInitDataRaw(): string {
  try {
    const tg = (window as any).Telegram?.WebApp
    return tg?.initData ?? ''
  } catch { return '' }
}

export function setMainButton(text: string, onClick: () => void, isEnabled = true) {
  const tg = (window as any).Telegram?.WebApp
  if (!tg) return
  tg.MainButton.offClick(tg.MainButton._clickHandler)
  tg.MainButton.setText(text)
  tg.MainButton.onClick(onClick)
  isEnabled ? tg.MainButton.enable() : tg.MainButton.disable()
  tg.MainButton.show()
}

export function hideMainButton() {
  const tg = (window as any).Telegram?.WebApp
  tg?.MainButton.hide()
}

export function showBackButton(onClick: () => void) {
  const tg = (window as any).Telegram?.WebApp
  if (!tg) return
  tg.BackButton.onClick(onClick)
  tg.BackButton.show()
}

export function hideBackButton() {
  const tg = (window as any).Telegram?.WebApp
  tg?.BackButton.hide()
}

export function hapticLight() {
  const tg = (window as any).Telegram?.WebApp
  tg?.HapticFeedback.impactOccurred('light')
}

export function hapticSuccess() {
  const tg = (window as any).Telegram?.WebApp
  tg?.HapticFeedback.notificationOccurred('success')
}

export function hapticSelection() {
  const tg = (window as any).Telegram?.WebApp
  tg?.HapticFeedback.selectionChanged()
}

export function enableClosingConfirmation() {
  const tg = (window as any).Telegram?.WebApp
  tg?.enableClosingConfirmation()
}

export function disableClosingConfirmation() {
  const tg = (window as any).Telegram?.WebApp
  tg?.disableClosingConfirmation()
}
