# OohLaLab

<br>

## Set up environment

- Clone repo locally:

```bash
git clone https://github.com/JosephBARBIERDARNAL/oohlalab.git
cd oohlalab
```

- [Install Quarto](https://quarto.org/docs/get-started/)

- [Install uv](https://docs.astral.sh/uv/)

- Install dependencies and pre-commit hook:

```bash
uv python install
uv sync
uv run pre-commit install
```

- Try to preview website locally

```bash
quarto preview
```

This should open a new windows in your browser at `http://localhost:4000/`
