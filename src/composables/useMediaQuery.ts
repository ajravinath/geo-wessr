import {
  type MaybeRefOrGetter,
  ref,
  watchEffect,
  toValue,
  getCurrentScope,
  onScopeDispose
} from 'vue';

function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

export function useMediaQuery(query: MaybeRefOrGetter<string>) {
  let mediaQuery: MediaQueryList | undefined;
  const matches = ref(false);

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };

  const cleanup = () => {
    if (!mediaQuery) return;
    if ('removeEventListener' in mediaQuery) mediaQuery.removeEventListener('change', handler);
    // @ts-expect-error deprecated API
    else mediaQuery.removeListener(handler);
  };

  const stopWatch = watchEffect(() => {
    if (!(window && 'matchMedia' in window && typeof window.matchMedia === 'function')) return;

    cleanup();

    mediaQuery = window!.matchMedia(toValue(query));

    if ('addEventListener' in mediaQuery) mediaQuery.addEventListener('change', handler);
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(handler);

    matches.value = mediaQuery.matches;
  });

  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = undefined;
  });

  return matches;
}
