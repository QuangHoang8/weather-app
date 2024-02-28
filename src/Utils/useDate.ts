import { useEffect, useState } from "react";

export const useDate = (): { date: string; time: string } => {
  const locale = "en";

  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 60 * 1000);
    return clearInterval(timer);
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const month = today.toLocaleDateString(locale, { month: "long" });
  const date = `${day}, ${today.getDate()}, ${month}\n\n`;

  const time = today.toLocaleDateString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  return { date, time };
};
