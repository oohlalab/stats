import matplotlib.pyplot as plt
import morethemes as mt
from cycler import cycler


def theme_oohlalab(
    left_spine=True,
    right_spine=False,
    top_spine=False,
    bottom_spine=True,
    x_ticks=False,
    y_ticks=False,
    x_grid=True,
    y_grid=True,
):
    plt.rcParams["text.color"] = "#444444"
    plt.rcParams["axes.prop_cycle"] = cycler(
        "color",
        [
            "#023743FF",
            "#72874EFF",
            "#476F84FF",
            "#A4BED5FF",
            "#453947FF",
            "#FED789FF",
        ],
    )

    if not top_spine:
        plt.rcParams["axes.spines.top"] = False

    if not right_spine:
        plt.rcParams["axes.spines.right"] = False

    if not left_spine:
        plt.rcParams["axes.spines.left"] = False

    if not bottom_spine:
        plt.rcParams["axes.spines.bottom"] = False

    if not x_ticks:
        plt.rcParams["xtick.major.size"] = 0

    if not y_ticks:
        plt.rcParams["ytick.major.size"] = 0

    if x_grid and not y_grid:
        plt.rcParams["axes.grid.axis"] = "x"
    if not x_grid and y_grid:
        plt.rcParams["axes.grid.axis"] = "y"
    if x_grid and y_grid:
        plt.rcParams["axes.grid.axis"] = "both"

    if x_grid or y_grid:
        plt.rcParams["axes.grid"] = True
        plt.rcParams["grid.linewidth"] = 0.7
        plt.rcParams["grid.linestyle"] = "-"
        plt.rcParams["axes.linewidth"] = 1.2
        plt.rcParams["grid.color"] = "#989797"


theme_oohlalab()
fig = mt.preview_theme()
fig.savefig("cache.png", dpi=300, bbox_inches="tight")
