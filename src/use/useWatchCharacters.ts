import { watch } from 'vue';

export function useWatchCharacters(
  valueForWatchPath: any,
  valueModelPath: any,
  maxLength = 100
): void {
  watch(
    () => valueForWatchPath,
    (newVal) => {
      valueModelPath.value = newVal.value.length === maxLength;
    },
    { deep: true }
  );
}
