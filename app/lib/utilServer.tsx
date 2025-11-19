
// Simple sleep function to use React's suspense and transition
export function sleep(ms: number):Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
