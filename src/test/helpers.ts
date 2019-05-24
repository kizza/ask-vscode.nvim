export const describe = (
  description: string,
  test: () => Promise<void | any[]>
): Promise<void | any[]> => {
  console.log(`Running ${description}`);
  return test();
};

export const it = (
  description: string,
  test: () => Promise<void | any[]>
): Promise<void | any[]> => describe(description, test);
