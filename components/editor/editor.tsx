import React, {
  MutableRefObject,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { fabric } from "fabric";

type Object = "cursor" | "image" | "text" | "circle" | "square" | "arrow";

type MousePosition = {
  x: number;
  y: number;
  object: Object;
};

type Action = {
  tip_text: Object;
  icon: ReactNode;
};

function Editor() {
  const canvas = useRef(null) as MutableRefObject<fabric.Canvas | null>;
  const mousePosition = useRef<MousePosition>({
    x: 0,
    y: 0,
    object: "cursor",
  });
  const [actionInteractionCounter, setActionInteractionCount] = useState<number>(0);

  function handleKeyDown(ev: KeyboardEvent) {
    switch (ev.code) {
      case "Backspace":
        removeSelectedItem();
        break;
      case "Delete":
        removeSelectedItem();
        break;
      default:
        return null;
    }
  }

  function removeSelectedItem() {
    if (canvas.current) {
      canvas.current.getActiveObjects().map(object => {
        canvas.current?.remove(object);
      })
    }
  }

  useEffect(() => {
    if (!canvas.current) {
      canvas.current = new fabric.Canvas("canvas", {
      });

      canvas.current.setWidth(document.body.clientWidth);
      canvas.current.setHeight(document.body.clientHeight);

      canvas.current.renderAll();
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  function handleMousePosition(event: fabric.IEvent) {
    if (mousePosition.current) {
      mousePosition.current.x = event.pointer?.x || 0;
      mousePosition.current.y = event.pointer?.y || 0;
    }
  }

  function changeToDefault() {
    if (mousePosition.current) {
      mousePosition.current.object = "cursor";
    }
  }

  function handleCanvasClick(event: fabric.IEvent) {
    if (mousePosition.current.object) {
      switch (mousePosition.current.object) {
        case "square":
          addSquareObject();
          changeToDefault();
          break;
        case "circle":
          addCircleObject();
          changeToDefault()
          break;
        case "text":
          addTextBoxObject();
          changeToDefault()
          break;
        default:
          changeToDefault()
      }
    }
  }

  function addSquareObject() {
    const rect = new fabric.Rect({
      left: mousePosition.current.x,
      top: mousePosition.current.y,
      fill: "red",
      width: 100,
      height: 100,
      angle: 0,
    });

    if (canvas.current) {
      canvas.current.add(rect);
    }
  }

  function addCircleObject() {
    const circle = new fabric.Circle({
      left: mousePosition.current.x,
      top: mousePosition.current.y,
      fill: "red",
      width: 100,
      height: 100,
      angle: 0,
    });

    if (canvas.current) {
      canvas.current.add(circle);
    }
  }

  function addTextBoxObject() {
    const textBox = new fabric.Textbox("This is text",{
      text: "",
      left: mousePosition.current.x,
      top: mousePosition.current.y,
    });

    if (canvas.current) {
      canvas.current.add(textBox);
    }
  }

  function addTextObject() {
    const text = new fabric.Text("This is text", {

    })
  }

  useEffect(() => {
    if (canvas.current) {
      canvas.current.on("mouse:move", handleMousePosition);

      canvas.current.on("mouse:down", handleCanvasClick);
    }
  }, [canvas.current]);

  const actions: Action[] = [
    {
      tip_text: "cursor",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      ),
    },
    {
      tip_text: "image",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      tip_text: "text",
      icon: (
        <div
          className="text-white font-bold"
          style={{
            fontSize: "24px",
            lineHeight: "0",
          }}
        >
          T
        </div>
      ),
    },
    {
      tip_text: "circle",
      icon: (
        <div className="w-6 h-6 rounded-full bg-transparent border-2 border-white" />
      ),
    },
    {
      tip_text: "square",
      icon: <div className="w-6 h-6 border-2 border-white bg-transparent" />,
    },
    {
      tip_text: "arrow",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="canvas-overlay">
      <canvas id="canvas" />
      <div className="canvas-actions">
        {actions.map((ac) => {
          return (
            <button
              type="button"
              className={`canvas-action ${
                ac.tip_text === mousePosition.current.object ? "selected" : ""
              }`}
              key={ac.tip_text}
              onClick={() => {
                setActionInteractionCount(actionInteractionCounter + 1);
                if (mousePosition.current) {
                  mousePosition.current.object = ac.tip_text;
                }
              }}
            >
              {ac.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Editor;
