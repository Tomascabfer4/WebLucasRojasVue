const PDFJS_VERSION = "5.6.205";
const PDFJS_BASE = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build`;
const MAX_OUTPUT_SCALE = 1.8;
const RESIZE_TOLERANCE = 24;
const TRANSITION_MS = 620;

function formatPageNumber(pageNumber) {
  return String(pageNumber).padStart(2, "0");
}

function getCanvasWidth(pageCard) {
  const availableWidth = pageCard.clientWidth;
  return Math.max(600, Math.min(availableWidth * 1.5, 1200));
}

function createPageCard(pageNumber) {
  const article = document.createElement("article");
  article.className = "dossier-page is-rendering is-buffer";
  article.dataset.pageNumber = String(pageNumber);

  const badge = document.createElement("div");
  badge.className = "dossier-page-number";
  badge.textContent = `Pagina ${formatPageNumber(pageNumber)}`;

  const skeleton = document.createElement("div");
  skeleton.className = "dossier-page-skeleton";

  const canvas = document.createElement("canvas");
  canvas.className = "dossier-page-canvas";
  canvas.setAttribute("aria-hidden", "true");

  const caption = document.createElement("p");
  caption.className = "dossier-page-caption";
  caption.textContent = "Dossier corporativo";

  article.append(badge, skeleton, canvas, caption);
  return article;
}

async function renderPage(pdfDocument, pageCard) {
  if (pageCard.dataset.rendering === "true") {
    return;
  }

  const pageNumber = Number(pageCard.dataset.pageNumber);
  const targetWidth = getCanvasWidth(pageCard);
  const lastWidth = Number(pageCard.dataset.renderWidth || 0);

  if (
    pageCard.dataset.rendered === "true" &&
    Math.abs(lastWidth - targetWidth) < RESIZE_TOLERANCE
  ) {
    return;
  }

  pageCard.dataset.rendering = "true";
  pageCard.classList.add("is-rendering");

  const page = await pdfDocument.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = targetWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });
  const outputScale = Math.min(window.devicePixelRatio || 1, MAX_OUTPUT_SCALE);

  const canvas = pageCard.querySelector(".dossier-page-canvas");
  const context = canvas.getContext("2d", { alpha: false });

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  const transform =
    outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

  await page.render({
    canvasContext: context,
    transform,
    viewport,
  }).promise;

  pageCard.dataset.rendered = "true";
  pageCard.dataset.renderWidth = String(Math.round(targetWidth));
  pageCard.dataset.rendering = "false";
  pageCard.classList.remove("is-rendering");
  pageCard.classList.add("is-rendered");
}

function setFallback(book, statusNode, loadingNode) {
  book.classList.add("is-fallback");
  if (loadingNode) {
    loadingNode.textContent =
      "No se pudo activar la vista tipo cuaderno en este navegador. Puede abrir o descargar el PDF con los botones superiores.";
  }
  if (statusNode) {
    statusNode.textContent = "Vista alternativa";
  }
}

export async function initDossierNotebook() {
  const book = document.getElementById("dossier-book");
  const prevButton = document.getElementById("dossier-prev");
  const nextButton = document.getElementById("dossier-next");
  const statusNode = document.getElementById("dossier-status");

  if (!book || !prevButton || !nextButton || !statusNode) {
    return;
  }

  const pdfSrc = book.dataset.pdfSrc;
  if (!pdfSrc) {
    return;
  }

  const loadingNode = book.querySelector(".dossier-book-loading");

  try {
    const pdfjsLib = await import(/* @vite-ignore */ `${PDFJS_BASE}/pdf.mjs`);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/pdf.worker.mjs`;

    const loadingTask = pdfjsLib.getDocument(pdfSrc);
    const pdfDocument = await loadingTask.promise;

    const pages = document.createElement("div");
    pages.className = "dossier-book-pages";

    const cards = [];
    const renderPromises = new Map();
    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const card = createPageCard(pageNumber);
      cards.push(card);
      pages.appendChild(card);
    }

    book.replaceChildren(pages);

    let activeIndex = 0;
    let isAnimating = false;

    const ensureRendered = async (index) => {
      const card = cards[index];
      if (!card) {
        return;
      }

      if (card.dataset.rendered === "true") {
        return;
      }

      if (!renderPromises.has(index)) {
        renderPromises.set(
          index,
          renderPage(pdfDocument, card).catch((error) => {
            card.dataset.rendering = "false";
            throw error;
          }).finally(() => {
            renderPromises.delete(index);
          })
        );
      }

      await renderPromises.get(index);
    };

    const warmNeighbors = () => {
      [activeIndex - 1, activeIndex + 1, activeIndex + 2].forEach((index) => {
        if (index < 0 || index >= cards.length) {
          return;
        }
        ensureRendered(index).catch(() => {});
      });
    };

    const syncStatus = () => {
      statusNode.textContent = `Pagina ${formatPageNumber(activeIndex + 1)} / ${formatPageNumber(cards.length)}`;
      prevButton.disabled = isAnimating || activeIndex === 0;
      nextButton.disabled = isAnimating || activeIndex === cards.length - 1;
    };

    const applyStaticState = () => {
      cards.forEach((card, index) => {
        card.classList.remove(
          "is-active",
          "is-under",
          "is-buffer",
          "is-entering-next",
          "is-entering-prev",
          "is-leaving-next",
          "is-leaving-prev"
        );

        if (index === activeIndex) {
          card.classList.add("is-active");
        } else if (index === activeIndex + 1) {
          card.classList.add("is-under");
        } else {
          card.classList.add("is-buffer");
        }
      });
    };

    const goToPage = async (nextIndex) => {
      if (
        isAnimating ||
        nextIndex === activeIndex ||
        nextIndex < 0 ||
        nextIndex >= cards.length
      ) {
        return;
      }

      const direction = nextIndex > activeIndex ? "next" : "prev";
      const currentCard = cards[activeIndex];
      const nextCard = cards[nextIndex];

      isAnimating = true;
      syncStatus();

      try {
        await ensureRendered(nextIndex);

        nextCard.classList.remove("is-buffer", "is-under");
        currentCard.classList.remove("is-active");
        nextCard.classList.add(
          direction === "next" ? "is-entering-next" : "is-entering-prev"
        );
        currentCard.classList.add(
          direction === "next" ? "is-leaving-next" : "is-leaving-prev"
        );
      } catch (error) {
        isAnimating = false;
        syncStatus();
        throw error;
      }

      window.setTimeout(() => {
        activeIndex = nextIndex;
        isAnimating = false;
        applyStaticState();
        syncStatus();
        warmNeighbors();
      }, TRANSITION_MS);
    };

    prevButton.addEventListener("click", () => {
      goToPage(activeIndex - 1).catch(() => {});
    });

    nextButton.addEventListener("click", () => {
      goToPage(activeIndex + 1).catch(() => {});
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        goToPage(activeIndex - 1).catch(() => {});
      }

      if (event.key === "ArrowRight") {
        goToPage(activeIndex + 1).catch(() => {});
      }
    });

    await ensureRendered(activeIndex);
    applyStaticState();
    syncStatus();
    warmNeighbors();

    let resizeTimer = null;
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          cards.forEach((card) => {
            if (card.dataset.rendered !== "true") {
              return;
            }

            const nextWidth = getCanvasWidth(card);
            const currentWidth = Number(card.dataset.renderWidth || 0);

            if (Math.abs(nextWidth - currentWidth) < RESIZE_TOLERANCE) {
              return;
            }

            card.dataset.rendered = "false";
            card.classList.remove("is-rendered");
          });

          ensureRendered(activeIndex)
            .then(() => warmNeighbors())
            .catch(() => {});
        }, 180);
      },
      { passive: true }
    );
  } catch (error) {
    console.error("No se pudo cargar la vista tipo cuaderno del dossier.", error);
    setFallback(book, statusNode, loadingNode);
  }
}

