enum ContinuousControls {
  MODULATION_WHEEL = 1,
}

export function adjustContinuousControl(
  control: ContinuousControls,
  value: number,
) {
  // TODO Implement midi controls
  // eslint-disable-next-line no-console
  console.log(control, value);
}
