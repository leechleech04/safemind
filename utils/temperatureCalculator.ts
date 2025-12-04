export const getWindSpeedFromComponents = (UUU: number, VVV: number) => {
  const u = Number(UUU);
  const v = Number(VVV);

  if (!isFinite(u) || !isFinite(v)) return 0;

  const speed = Math.sqrt(u * u + v * v);
  return Math.round(speed * 10) / 10;
};

export const calculatePerceivedTemperature = (
  temperature: number,
  windSpeed: number,
  humidity: number
) => {
  const T = Number(temperature);
  const V = Number(windSpeed);
  const R = Number(humidity);

  if (!isFinite(T)) return T;

  if (T <= 10 && V >= 4.8) {
    const vPow = Math.pow(V, 0.16);

    const windChill = 13.12 + 0.6215 * T - 11.37 * vPow + 0.3965 * T * vPow;

    return Math.round(windChill * 10) / 10;
  }

  if (T >= 27 && R >= 40) {
    const Tf = (T * 9) / 5 + 32;
    let HI =
      -42.379 +
      2.04901523 * Tf +
      10.14333127 * R -
      0.22475541 * Tf * R -
      0.00683783 * Tf * Tf -
      0.05481717 * R * R +
      0.00122874 * Tf * Tf * R +
      0.00085282 * Tf * R * R -
      0.00000199 * Tf * Tf * R * R;

    HI = ((HI - 32) * 5) / 9;

    return Math.round(HI * 10) / 10;
  }

  return Math.round(T * 10) / 10;
};
