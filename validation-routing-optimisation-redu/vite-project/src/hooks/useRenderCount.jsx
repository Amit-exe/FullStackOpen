import { useRef } from "react";

/**
 * useRenderCount
 *
 * Returns a ref whose .current value is the number of times the
 * calling component has rendered. Useful for visualising when
 * React.memo / useCallback / useMemo successfully prevent re-renders.
 *
 * Usage:
 *   const renders = useRenderCount();
 *   <span>Rendered {renders.current} times</span>
 */
export function useRenderCount() {
  const count = useRef(0);
  count.current += 1;
  return count;
}
