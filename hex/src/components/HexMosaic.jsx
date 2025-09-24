import { useEffect, useMemo, useRef } from "react";

export default function HexMosaic({
  image, // string URL or File object
  hexSize = 50, // number (px). If 0 -> show original image
  gap = 2, // number (px) of transparent spacing between hexes
  stride = 2, // optional sampling stride (lower = more accurate, slower)
  className,
  style,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  const imagePromise = useMemo(async () => {
    const src = typeof image === "string" ? image : await fileToDataURL(image);
    return loadImage(src);
  }, [image]);

  useEffect(() => {
    let aborted = false;

    (async () => {
      const img = await imagePromise;
      if (aborted) return;

      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const dpr = window.devicePixelRatio || 1;

      // Fit to wrapper width (but not larger than the image's natural width)
      const maxDisplayW = Math.min(wrap.clientWidth || img.naturalWidth, img.naturalWidth);
      const scale = maxDisplayW / img.naturalWidth;
      const displayW = Math.max(1, Math.round(img.naturalWidth * scale));
      const displayH = Math.max(1, Math.round(img.naturalHeight * scale));

      canvas.style.width = displayW + "px";
      canvas.style.height = displayH + "px";
      canvas.width = Math.round(displayW * dpr);
      canvas.height = Math.round(displayH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, displayW, displayH);

      // If hexSize is 0, just draw the original image
      if (hexSize <= 0) {
        ctx.drawImage(img, 0, 0, displayW, displayH);
        return;
      }

      // Offscreen canvas for pixel sampling
      const off = document.createElement("canvas");
      off.width = displayW;
      off.height = displayH;
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      offCtx.drawImage(img, 0, 0, displayW, displayH);
      const imgData = offCtx.getImageData(0, 0, displayW, displayH).data;

      const r = Math.max(1, Math.floor(hexSize));
      const SQRT3 = Math.sqrt(3);
      const hexHeight = SQRT3 * r;
      const horizStep = 1.5 * r;
      const vertStep = hexHeight;

      function avgColorForHex(cx, cy, verts) {
        let minX = Infinity,
          minY = Infinity,
          maxX = -Infinity,
          maxY = -Infinity;
        verts.forEach(([x, y]) => {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        });
        minX = Math.floor(clamp(minX, 0, displayW - 1));
        minY = Math.floor(clamp(minY, 0, displayH - 1));
        maxX = Math.ceil(clamp(maxX, 0, displayW - 1));
        maxY = Math.ceil(clamp(maxY, 0, displayH - 1));

        let rSum = 0,
          gSum = 0,
          bSum = 0,
          count = 0;
        const step = Math.max(1, Math.floor(stride));

        for (let y = minY; y <= maxY; y += step) {
          for (let x = minX; x <= maxX; x += step) {
            if (!pointInPolygon(x + 0.5, y + 0.5, verts)) continue;
            const idx = (y * displayW + x) * 4;
            rSum += imgData[idx];
            gSum += imgData[idx + 1];
            bSum += imgData[idx + 2];
            count++;
          }
        }

        if (count === 0) {
          const cxC = clamp(Math.round(cx), 0, displayW - 1);
          const cyC = clamp(Math.round(cy), 0, displayH - 1);
          const idx = (cyC * displayW + cxC) * 4;
          return `rgb(${imgData[idx]}, ${imgData[idx + 1]}, ${imgData[idx + 2]})`;
        }

        return `rgb(${Math.round(rSum / count)}, ${Math.round(gSum / count)}, ${Math.round(bSum / count)})`;
      }

      const startCol = -1;
      const endX = displayW + r;

      for (let col = startCol; ; col++) {
        const x = r + col * horizStep;
        if (x - r > endX) break;

        const offsetY = col & 1 ? hexHeight / 2 : 0;
        const startY = -hexHeight / 2 + offsetY;
        const endY = displayH + hexHeight / 2;

        for (let y = startY; y <= endY; y += vertStep) {
          const verts = hexVertices(x, y, r);
          const fill = avgColorForHex(x, y, verts);

          ctx.beginPath();
          ctx.moveTo(verts[0][0], verts[0][1]);
          for (let i = 1; i < 6; i++) ctx.lineTo(verts[i][0], verts[i][1]);
          ctx.closePath();

          ctx.fillStyle = fill;
          ctx.fill();

          // transparent gap
          if (gap > 0) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = gap;
            ctx.lineJoin = "round";
            ctx.strokeStyle = "rgba(0,0,0,1)";
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    })();

    const ro = new ResizeObserver(() => {
      imagePromise.then(() => {
        const ev = new Event("resize");
        window.dispatchEvent(ev);
      });
    });
    if (wrapRef.current) ro.observe(wrapRef.current);

    return () => {
      aborted = true;
      ro.disconnect();
    };
  }, [imagePromise, hexSize, gap, stride]);

  return (
    <div ref={wrapRef} className={className} style={{ width: "100%", ...style }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

// ---------- helpers ----------
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function hexVertices(cx, cy, r) {
  const verts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i);
    verts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return verts;
}

function pointInPolygon(px, py, verts) {
  let inside = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    const [xi, yi] = verts[i];
    const [xj, yj] = verts[j];
    const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}
