import { jsx as h, jsxs as Q } from "react/jsx-runtime";
import { useReducer as U, createContext as Y, useEffect as X, useMemo as q, useState as A, memo as R, useContext as w, useRef as E, useCallback as M, useId as Z } from "react";
class k extends Error {
  constructor(t) {
    super(t), this.name = "HeadlessCarouselError";
  }
}
const x = {
  currentIndex: 0,
  total: 0,
  step: 1,
  slideHeight: 0,
  autoPlayDelay: 2e3,
  slidesVisible: 1,
  threshold: 0.25,
  disableTouch: !1,
  autoPlay: !1,
  infinite: !1,
  lazy: !1
}, ee = (e, { action: t, value: n, config: r }) => {
  const { currentIndex: s, step: i, total: c, infinite: o } = e, u = i || 1;
  switch (t) {
    case "next":
      return s + u >= c ? o ? {
        ...e,
        currentIndex: 0
      } : e : {
        ...e,
        currentIndex: s + u
      };
    case "prev":
      return s - u < 0 ? o ? {
        ...e,
        currentIndex: c - u
      } : e : {
        ...e,
        currentIndex: s - u
      };
    case "setCurrentIndex": {
      if (n === void 0 || n < 0 || n >= c)
        throw new k("setCurrentIndex value out of bounds");
      return {
        ...e,
        currentIndex: n
      };
    }
    case "setConfig":
      return {
        ...e,
        ...r
      };
    default:
      return e;
  }
}, te = () => {
  const [e, t] = U(ee, {
    currentIndex: 0
  });
  return { state: e, dispatch: t };
}, ne = () => null, p = Y({
  dispatch: ne,
  state: x
}), re = ({
  ctx: e,
  dispatch: t
}) => {
  X(() => {
    const { state: n } = e;
    if (n.autoPlay) {
      const r = setInterval(() => {
        n.currentIndex === n.total - 1 ? t({ action: "setCurrentIndex", value: 0 }) : t({ action: "next" });
      }, n.autoPlayDelay);
      return () => {
        clearInterval(r);
      };
    }
  }, [e, t]);
}, b = (e) => e !== void 0, se = ({
  autoPlay: e,
  autoPlayDelay: t,
  slidesVisible: n,
  threshold: r,
  disableTouch: s,
  step: i,
  lazy: c,
  infinite: o,
  total: u
}) => ({
  autoPlayDelay: b(t) ? t : x.autoPlayDelay,
  slidesVisible: b(n) ? n : x.slidesVisible,
  autoPlay: b(e) ? e : x.autoPlay,
  step: b(i) ? i : x.step,
  infinite: b(o) ? o : x.infinite,
  lazy: b(c) ? c : x.lazy,
  threshold: b(r) ? r : x.threshold,
  disableTouch: b(s) ? s : x.disableTouch,
  total: u
}), oe = ({
  dispatch: e,
  autoPlay: t,
  autoPlayDelay: n,
  slidesVisible: r,
  threshold: s,
  disableTouch: i,
  step: c,
  lazy: o,
  infinite: u,
  slideHeight: v,
  total: a
}) => {
  X(() => {
    e({
      action: "setConfig",
      config: se({
        autoPlay: t,
        autoPlayDelay: n,
        slidesVisible: r,
        threshold: s,
        disableTouch: i,
        step: c,
        lazy: o,
        infinite: u,
        total: a
      })
    });
  }, [
    e,
    a,
    t,
    n,
    s,
    v,
    r,
    u,
    o,
    c,
    i
  ]);
};
function fe({ children: e, ...t }) {
  const { dispatch: n, state: r } = te(), s = q(
    () => ({
      dispatch: n,
      state: { ...t, ...r }
    }),
    [r, n, t]
  );
  return oe({ dispatch: n, ...t }), re({ dispatch: n, ctx: s }), /* @__PURE__ */ h(p.Provider, { value: s, children: e });
}
const L = (e) => e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX, $ = ({
  action: e,
  eventsMap: t
}) => {
  for (const [n, r] of Object.entries(t))
    e === "add" ? document.addEventListener(n, r) : document.removeEventListener(n, r);
}, S = (...e) => e.filter(Boolean).join(" "), ce = (e) => {
  const [t, n] = A();
  return X(() => {
    if (!e.current) return;
    const r = (i) => {
      for (const c of i)
        c.target === e.current && n({
          width: c.contentRect.width,
          height: c.contentRect.height
        });
    }, s = new ResizeObserver(r);
    return s.observe(e.current), () => {
      s.disconnect();
    };
  }, [e]), { ref: e, refWidth: t == null ? void 0 : t.width };
}, F = 100, he = R(
  ({ children: e, wrapperClassName: t, carouselClassName: n }) => {
    const { state: r, dispatch: s } = w(p), [i, c] = A(!0), o = E(null), u = E(null), { refWidth: v } = ce(o), a = E({
      startX: 0,
      clientX: 0,
      moveRight: !0
    }), {
      total: m,
      slidesVisible: D,
      currentIndex: d,
      infinite: z,
      threshold: B,
      step: P,
      disableTouch: V
    } = r, _ = `${F * m / (D || 1)}%`, f = (v || 0) / m, J = ({ target: l }) => l !== o.current, H = M(
      (l) => {
        s({ action: "setCurrentIndex", value: l });
      },
      [s]
    ), y = M(
      (l) => {
        u.current = requestAnimationFrame(() => {
          var I;
          const g = l * F / f / m;
          (I = o.current) == null || I.style.setProperty(
            "transform",
            `translateX(${g}%)`
          );
        });
      },
      [f, m]
    ), N = M((l) => {
      J(l) || (l.preventDefault(), c(!1), a.current = {
        clientX: 0,
        startX: L(l),
        moveRight: !0
      });
    }, []), O = M(
      (l) => {
        if (!o.current || i) return;
        const g = a.current.startX, I = L(l), C = Math.abs(g - I) > f * B, j = g ? I - g : 0, K = f * d;
        y(j - K), C && (a.current = {
          ...a.current,
          clientX: j,
          moveRight: j > 0
        });
      },
      [d, f, i, y, B]
    ), W = M(() => {
      if (!a.current.startX) return;
      u != null && u.current && cancelAnimationFrame(u.current);
      let l = d;
      if (a.current.clientX !== 0) {
        const g = Math.ceil(
          Math.abs(a.current.clientX) / f
        ), I = g > P ? g : P, C = a.current.moveRight ? d - I : d + I;
        C < 0 || C >= m ? z ? l = C > 0 ? 0 : m - 1 : l = d : l = C;
      }
      a.current = {
        ...a.current,
        clientX: 0
      }, c(!0), y(-f * l), H(l);
    }, [
      H,
      y,
      d,
      z,
      m,
      P,
      f
    ]), T = q(
      () => ({
        mousemove: O,
        mousedown: N,
        mouseup: W,
        touchmove: O,
        touchstart: N,
        touchend: W
      }),
      [O, W, N]
    );
    return X(() => {
      y(-f * d);
    }, [y, d, f]), X(() => {
      if (!V)
        return $({ action: "add", eventsMap: T }), () => {
          $({ action: "remove", eventsMap: T });
        };
    }, [T, V]), /* @__PURE__ */ h(
      "div",
      {
        className: S(
          "relative z-10 max-w-full cursor-pointer overflow-hidden",
          t
        ),
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: o,
            className: S(
              "relative flex w-full flex-row items-stretch",
              i && "transition-transform duration-500",
              n
            ),
            style: { width: _ },
            children: e
          }
        )
      }
    );
  }
), ie = R(
  ({
    index: e,
    disabled: t,
    onClick: n,
    colorActive: r,
    colorInactive: s,
    className: i
  }) => {
    const { dispatch: c, state: o } = w(p), u = o.currentIndex === e ? r || "bg-black" : s || "bg-white";
    return /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Dot icon",
        disabled: t,
        onClick: (a) => {
          c({ action: "setCurrentIndex", value: e }), n == null || n(a);
        },
        className: S("size-3 rounded-full", u, i)
      }
    );
  }
), ve = R(
  ({
    onClick: e,
    colorActive: t,
    colorInactive: n,
    dotClassName: r,
    className: s
  }) => {
    const i = Z(), { state: c } = w(p), { total: o } = c;
    return /* @__PURE__ */ h("div", { className: S("flex gap-2", s), children: Array.from({ length: o }).map((u, v) => /* @__PURE__ */ h(
      ie,
      {
        className: r,
        colorActive: t,
        colorInactive: n,
        onClick: e,
        index: v
      },
      i + v
    )) });
  }
);
function G({
  onClick: e,
  action: t,
  children: n,
  className: r
}) {
  return /* @__PURE__ */ h(
    "button",
    {
      className: r,
      type: "button",
      onClick: (s) => {
        t == null || t(), e == null || e(s);
      },
      children: n
    }
  );
}
const me = R(
  ({ onClick: e, className: t, children: n }) => {
    const { dispatch: r } = w(p);
    return /* @__PURE__ */ h(
      G,
      {
        className: t,
        action: () => r({ action: "next" }),
        onClick: e,
        children: n
      }
    );
  }
), xe = R(
  ({ onClick: e, className: t, children: n }) => {
    const { dispatch: r } = w(p);
    return /* @__PURE__ */ h(
      G,
      {
        className: t,
        action: () => r({ action: "prev" }),
        onClick: e,
        children: n
      }
    );
  }
), ue = ({
  ref: e,
  opts: t = {}
}) => {
  const [n, r] = A();
  return X(() => {
    if (!e.current) return;
    const s = (c) => {
      for (const o of c)
        o.target === e.current && r(o);
    }, i = new IntersectionObserver(s, t);
    return i.observe(e.current), () => {
      i.disconnect();
    };
  }, [e, t.threshold, t.root, t.rootMargin]), { entry: n };
}, ge = R(
  ({ children: e, index: t, className: n, onClick: r }) => {
    const { state: s } = w(p), i = E(!1), c = E(null), { entry: o } = ue({
      ref: c,
      opts: { threshold: 0.5 }
    }), { currentIndex: u, slidesVisible: v, lazy: a, slideHeight: m } = s;
    !i.current && (o != null && o.isIntersecting) && (i.current = o.isIntersecting);
    const D = a ? i.current : !0, d = u === t || D, z = t >= u && t < u + v;
    return /* @__PURE__ */ h(
      "div",
      {
        role: "row",
        className: S(
          "slide-item pointer-events-none relative w-full",
          n
        ),
        style: { height: m },
        ref: c,
        "data-index": t,
        "data-testid": `slide-${t}`,
        "aria-selected": z,
        onClick: r,
        children: d && e
      }
    );
  }
), Ie = ({ className: e }) => {
  const { state: t } = w(p);
  return /* @__PURE__ */ Q("div", { className: e, children: [
    t.currentIndex + 1,
    " /",
    t.total
  ] });
};
export {
  he as Carousel,
  p as CarouselContext,
  fe as CarouselProvider,
  Ie as Counter,
  ie as Dot,
  ve as DotsGroup,
  me as NextButton,
  xe as PrevButton,
  ge as Slide
};
