
const _debounce = (callback: () => void, wait: number, timeout: NodeJS.Timeout | undefined, setTimer: (timer: NodeJS.Timeout) => void) => {
    if (timeout !== undefined) { clearTimeout(timeout) }
    setTimer(setTimeout(callback, wait))
}

export default _debounce