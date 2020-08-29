export function transformToMinutesAndSeconds(miliseconds: number): string {
  const minutes = Math.floor(miliseconds / 1000 / 60);
  const seconds = Math.floor((miliseconds / 1000) % 60);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
}
