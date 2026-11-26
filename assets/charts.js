// Datos reales extraídos de los datasets y notebooks de cada proyecto.
// Fuentes: orders_clean.csv (RappiPlus), notebook hypothesis-testing (A/B test),
// proyecto.xlsx (embudo y retención MercadoLibre).

Chart.defaults.color = "#9aa5b1";
Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
Chart.defaults.font.size = 11;

const palette = {
  blue: "#5fb4ff",
  green: "#7ee8c7",
  grid: "rgba(255,255,255,0.06)",
};

function baseOptions(extra = {}) {
  return Object.assign({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#171d26",
        borderColor: "#262e3a",
        borderWidth: 1,
        titleColor: "#e6e9ef",
        bodyColor: "#e6e9ef",
      },
    },
    scales: {
      x: { grid: { color: palette.grid }, ticks: { color: "#9aa5b1" } },
      y: { grid: { color: palette.grid }, ticks: { color: "#9aa5b1" } },
    },
  }, extra);
}

// ---- RappiPlus: ingresos mensuales ----
new Chart(document.getElementById("chart-rappi-revenue"), {
  type: "line",
  data: {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [{
      label: "Ingresos (COP)",
      data: [9994070, 15965802, 4468686, 1602802, 10495363, 9461887],
      borderColor: palette.blue,
      backgroundColor: "rgba(95,180,255,0.12)",
      fill: true,
      tension: 0.3,
      pointRadius: 3,
    }],
  },
  options: baseOptions({
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Ingresos mensuales 2025", color: "#e6e9ef", font: { size: 12, weight: "600" } },
      tooltip: {
        backgroundColor: "#171d26", borderColor: "#262e3a", borderWidth: 1,
        titleColor: "#e6e9ef", bodyColor: "#e6e9ef",
        callbacks: { label: (ctx) => "$" + ctx.parsed.y.toLocaleString("es-CO") },
      },
    },
  }),
});

// ---- RappiPlus: ingresos por categoría ----
new Chart(document.getElementById("chart-rappi-category"), {
  type: "doughnut",
  data: {
    labels: ["Electrónica", "Hogar", "Moda"],
    datasets: [{
      data: [45549430, 3232627, 3172663],
      backgroundColor: ["#5fb4ff", "#7ee8c7", "#f2b84b"],
      borderColor: "#10151d",
      borderWidth: 2,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: "#9aa5b1", boxWidth: 12, padding: 12 } },
      title: { display: true, text: "Ingresos por categoría", color: "#e6e9ef", font: { size: 12, weight: "600" } },
      tooltip: {
        backgroundColor: "#171d26", borderColor: "#262e3a", borderWidth: 1,
        titleColor: "#e6e9ef", bodyColor: "#e6e9ef",
        callbacks: { label: (ctx) => ctx.label + ": $" + ctx.parsed.toLocaleString("es-CO") },
      },
    },
  },
});

// ---- A/B Test: conversión por variante ----
new Chart(document.getElementById("chart-ab-conversion"), {
  type: "bar",
  data: {
    labels: ["Versión A", "Versión B"],
    datasets: [{
      label: "Tasa de conversión (%)",
      data: [12.57, 15.96],
      backgroundColor: ["#5fb4ff", "#7ee8c7"],
      borderRadius: 6,
      maxBarThickness: 70,
    }],
  },
  options: baseOptions({
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Conversión A vs. B (p = 0.034, significativo)", color: "#e6e9ef", font: { size: 12, weight: "600" } },
      tooltip: {
        backgroundColor: "#171d26", borderColor: "#262e3a", borderWidth: 1,
        titleColor: "#e6e9ef", bodyColor: "#e6e9ef",
        callbacks: { label: (ctx) => ctx.parsed.y + "%" },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9aa5b1" } },
      y: { grid: { color: palette.grid }, ticks: { color: "#9aa5b1", callback: (v) => v + "%" }, beginAtZero: true },
    },
  }),
});

// ---- Embudo de conversión (SQL journeys) ----
new Chart(document.getElementById("chart-funnel"), {
  type: "bar",
  data: {
    labels: ["Seleccionar\nproducto", "Agregar al\ncarrito", "Iniciar\ncheckout", "Info. de\nenvío", "Info. de\npago", "Compra"],
    datasets: [{
      label: "% de usuarios",
      data: [76.90, 11.01, 4.00, 2.42, 2.09, 1.25],
      backgroundColor: palette.blue,
      borderRadius: 4,
    }],
  },
  options: baseOptions({
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Embudo de conversión (% sobre el total)", color: "#e6e9ef", font: { size: 12, weight: "600" } },
      tooltip: {
        backgroundColor: "#171d26", borderColor: "#262e3a", borderWidth: 1,
        titleColor: "#e6e9ef", bodyColor: "#e6e9ef",
        callbacks: { label: (ctx) => ctx.parsed.x + "%" },
      },
    },
    scales: {
      x: { grid: { color: palette.grid }, ticks: { color: "#9aa5b1", callback: (v) => v + "%" }, beginAtZero: true },
      y: { grid: { display: false }, ticks: { color: "#9aa5b1", font: { size: 10 } } },
    },
  }),
});

// ---- Retención por cohorte (D7 a D28) ----
new Chart(document.getElementById("chart-retention"), {
  type: "line",
  data: {
    labels: ["D7", "D14", "D21", "D28"],
    datasets: [{
      label: "% retenido",
      data: [86.6, 55.2, 24.8, 2.7],
      borderColor: palette.green,
      backgroundColor: "rgba(126,232,199,0.12)",
      fill: true,
      tension: 0.25,
      pointRadius: 4,
    }],
  },
  options: baseOptions({
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Retención promedio de usuarios", color: "#e6e9ef", font: { size: 12, weight: "600" } },
      tooltip: {
        backgroundColor: "#171d26", borderColor: "#262e3a", borderWidth: 1,
        titleColor: "#e6e9ef", bodyColor: "#e6e9ef",
        callbacks: { label: (ctx) => ctx.parsed.y + "%" },
      },
    },
    scales: {
      x: { grid: { color: palette.grid }, ticks: { color: "#9aa5b1" } },
      y: { grid: { color: palette.grid }, ticks: { color: "#9aa5b1", callback: (v) => v + "%" }, beginAtZero: true },
    },
  }),
});
