const TZ = "America/New_York";
/**
 * Converts a naive "YYYY-MM-DD HH:mm:ss" string that represents a wall time
 * in America/New_York into a Date (an absolute instant).
 */
export const parseWallTimeInTimeZone = (dateTimeStr, timeZone = TZ) => {
  // Parse components
  const m = dateTimeStr.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
  if (!m) throw new Error(`Invalid datetime format: ${dateTimeStr}`);

  const [, yy, mo, dd, hh, mi, ss] = m;
  const y = Number(yy);
  const month = Number(mo);
  const day = Number(dd);
  const hour = Number(hh);
  const minute = Number(mi);
  const second = Number(ss);

  // Start with a UTC "guess" using the same components.
  // We'll iteratively nudge it until formatting in `timeZone` matches the desired wall time.
  let utcMillis = Date.UTC(y, month - 1, day, hour, minute, second);

  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  // Usually converges in 1–2 iterations (handles DST boundaries too).
  for (let i = 0; i < 3; i++) {
    const parts = dtf.formatToParts(new Date(utcMillis));
    const got = Object.fromEntries(parts.map((p) => [p.type, p.value]));

    const gotMillis = Date.UTC(Number(got.year), Number(got.month) - 1, Number(got.day), Number(got.hour), Number(got.minute), Number(got.second));

    const wantMillis = Date.UTC(y, month - 1, day, hour, minute, second);

    const diff = wantMillis - gotMillis;
    console.log("wantMillis", wantMillis);
    console.log("gotMillis", gotMillis);
    console.log("diff", diff);
    console.log("date", new Date(utcMillis));
    if (diff === 0) break;
    utcMillis += diff;
  }

  return new Date(utcMillis);
};

export const formatDate = (dateTimeStr) => {
  const date = parseWallTimeInTimeZone(dateTimeStr, TZ);

  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);

  return `${datePart} at ${timePart}`;
};

const theDate = "2025-12-31 15:20:00";
console.log("Current Date: ", new Date());
console.log(formatDate(theDate));
