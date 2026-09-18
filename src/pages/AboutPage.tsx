import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const CHUNK_TEST_QUESTION = 'What experiments were conducted in this paper?'

const CHUNK_TEST_RESULTS = [
  {
    threshold: '15%',
    actualTokens: 2919,
    numChunks: 16,
    percentOfPaper: '15.3%',
    answer: `Based on the passages provided, the paper conducted two main sets of experiments:

## 1. Fault-Injection Sensitivity Measurement

The researchers built a reference pipeline with an **exact accumulator by construction** and injected **nine fault families** across:
- 196 captured layers of Qwen3-1.7B
- Three coverage severities
- Two scale regimes

This produced **8,232 cells**, each scored against a prediction matrix. The nine faults included:
- Five plausible epilogue defects
- Two precondition violations
- An operand mismatch
- A null fault (F8)

The prediction matrix was established in two stages: a **63-cell core fixed before any data**, then expanded to **77 cells** after a disclosed two-layer smoke run that also corrected three predictions. The suite was scored for false negatives and false positives against this corrected matrix.

## 2. Power-of-Two Scales Deployment Study

The researchers tested **requantization from parent weights under power-of-two scales**, validating it by rebuilding committed checkpoints byte-for-byte. They measured **observed perplexity** at three model sizes, with results ranging between **−0.28% and +0.48%**, and also investigated the previously reported **+157% perplexity degradation** from a power-of-two scale probe, finding it was an artifact of the probe's construction rather than a genuine cost.`,
  },
  {
    threshold: '25%',
    actualTokens: 5009,
    numChunks: 24,
    percentOfPaper: '26.3%',
    answer: `Based on the provided passages, the paper conducted the following experiments:

## 1. Fault-Injection Sensitivity Study
- Built a **reference pipeline with an exact accumulator by construction** to establish ground truth
- Injected **nine fault families** into 196 captured layers of Qwen3-1.7B:
  - Five epilogue faults
  - Two precondition violations
  - One operand mismatch fault
  - One null fault (F8, which changes nothing)
- Tested across **three coverage severities**: one output element, one percent of elements, and all elements
- Tested under **two scale regimes**: the checkpoint's own scales and power-of-two scales
- This yielded **8,232 cells**, each scored against a 77-cell prediction matrix

## 2. Power-of-Two Scale Requantization Study
- Requantized checkpoints at **three model sizes**: Qwen3-1.7B, Qwen3-8B, and Qwen3-14B
- Measured **cross-kernel bitwise determinism** per-layer and end-to-end (greedy generation on 8 pinned prompts of 64 tokens)
- Measured **accuracy cost** via perplexity, finding point estimates ranging from −0.28% to +0.48%
- Decomposed the previously reported **+157% perplexity degradation** from the companion study's probe

## Pre-registration Protocol
Both experiments ran under a **pre-registered protocol** with a 63-cell prediction matrix fixed before any data, expanded to 77 cells after a disclosed two-layer smoke run.`,
  },
  {
    threshold: '33%',
    actualTokens: 6557,
    numChunks: 29,
    percentOfPaper: '34.4%',
    answer: `Based on the passages, the paper conducted the following experiments:

## Fault-Injection Sensitivity Study

The primary experiment measured how well a conformance check suite detects faulty kernels in W8A8 linear layers. The researchers:

- Built a **reference pipeline with exact accumulation by construction** to provide ground-truth fault detection
- Injected **nine fault families** (five epilogue faults F1–F5, two precondition violations F6–F7, one operand mismatch F9, and one null fault F8)
- Ran faults across **196 captured layers of Qwen3-1.7B** at three coverage severities (one element, one percent of elements, all elements) and two scale regimes (checkpoint's own scales and power-of-two scales)
- This produced **8,232 cells**, each scored against a pre-registered 77-cell prediction matrix
- A preliminary **two-layer smoke run** was conducted before the full 196-layer run

## Power-of-Two Scales Deployability Study

A second set of experiments evaluated whether power-of-two quantization scales are practically deployable:

- **Requantized checkpoints** at three model sizes (Qwen3-1.7B, 8B, 14B) using power-of-two scales
- Measured **cross-kernel bitwise determinism** per-layer (196/196 and 252/252 layers) and end-to-end (8 token sequences per model)
- Measured **perplexity cost**, finding point estimates ranging from −0.28% to +0.48%
- **Decomposed the previously reported +157% perplexity degradation**, finding 99.8% was attributable to weight-scale mismatch in the prior probe's methodology`,
  },
  {
    threshold: '100%',
    actualTokens: 18570,
    numChunks: 79,
    percentOfPaper: '100% (full document, no retrieval)',
    answer: `Based on the passages, the paper conducted two main experimental investigations:

## 1. Fault Injection Sensitivity Study

The researchers built a **reference pipeline with an exact accumulator by construction** and injected nine fault families across 196 captured layers of Qwen3-1.7B:

- **Nine fault families**: five epilogue faults (F1–F5), two precondition violations (F6–F7), an operand mismatch (F9), and a null fault (F8)
- **Three coverage severities**: one output element, one percent of elements, all elements
- **Two scale regimes**: the checkpoint's own scales and power-of-two scales
- This yielded **8,232 total cells**, each scored against a 77-cell prediction matrix
- The prediction matrix was pinned in two stages: 63 cells fixed before any data, then expanded to 77 cells and corrected in three places after a disclosed two-layer smoke run, then re-pinned before the full run

## 2. Power-of-Two Scale Deployability Study

The researchers built **requantized power-of-two checkpoints** (rather than merely rewriting stored scales) and measured:

- **Per-layer bitwise agreement** between CUTLASS and Triton kernels across all linear layers (196 layers for 1.7B, 252 for 8B)
- **End-to-end generation determinism** on 8 pinned prompts of 64 tokens at three model sizes (1.7B, 8B, 14B)
- **Perplexity cost** measured via 90% paired cluster-bootstrap intervals over 256 pinned WikiText windows
- **Decomposition of the previously reported +157% perplexity degradation**, attributing 99.8% of it to a weight–scale mismatch in the original probe's construction

All experiments ran on a single RTX 4090 under a pre-registered protocol with append-only amendments.`,
  },
]

export function AboutPage() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-text">
          <h1>About This Project</h1>
        </div>
        <Link to="/" className="about-button">
          Back to App
        </Link>
      </header>

      <div className="about-page-content">

        <section className="about-section">
          <h2>GitHub</h2>
          <div className="about-tech-grid">
            <div>
              <h3>Frontend</h3>
              <a
                href="https://github.com/VictorTumbiolo/Research_App_Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="about-github-link"
              >
                View repository ↗
              </a>
            </div>
            <div>
              <h3>Backend</h3>
              <a
                href="https://github.com/VictorTumbiolo/Research_App"
                target="_blank"
                rel="noopener noreferrer"
                className="about-github-link"
              >
                View repository ↗
              </a>
            </div>
          </div>
        </section>


        <section className="about-section">
          <h2>Use Case</h2>
          <p>
            This tool helps students and researchers understand academic papers while
            reducing token usage compared to a standard chatbot session.
            A user uploads a paper, which gets chunked and embedded into a vector database.
            When a question is asked, the
            LLM searches that database for the most relevant chunks rather than
            reading the entire paper. This typically uses about a third of the tokens
            a full paper approach would require, while preserving contextual clarity
            in the response.
          </p>
        </section>

        <section className="about-section">
          <h2>Technical Details</h2>

          <div className="about-tech-grid">
            <div>
              <h3>Deployment</h3>
              <ul>
                <li>Frontend deployed with Vercel</li>
                <li>Vector DB deployed with Qdrant Cloud</li>
                <li>Backend deployed with Railway</li>
              </ul>
            </div>
            <div>
              <h3>Stack</h3>
              <ul>
                <li>Frontend: TypeScript, React, Vite</li>
                <li>Backend: FastAPI (Python)</li>
                <li>LLM: Claude Sonnet 4.6, connected via API</li>
              </ul>
            </div>
          </div>

          <h3 className="about-subsection-title">RAG Pipeline</h3>
          <ul>
            <li>PDF text extraction via PyMuPDF</li>
            <li>
              Chunking strategy: <code>RecursiveCharacterTextSplitter</code> (LangChain),
              800 chars/chunk, 100 char overlap
            </li>
            <li>
              Embeddings: <code>sentence-transformers</code> with the{' '}
              <code>all-MiniLM-L6-v2</code> model (384-dim vectors)
            </li>
            <li>
              Vector search: cosine similarity via Qdrant, filtered per-paper by
              filename so questions only search within the selected paper
            </li>
          </ul>

          <h3 className="about-subsection-title">Agentic / Tool-Use Design</h3>
          <p>
            Rather than a fixed retrieve-then-answer flow, Claude is given a{' '}
            <code>search_paper</code> tool and decides for itself whether to search:
          </p>
          <ul>
            <li>
              Skips retrieval entirely for conversational follow-ups (e.g. "explain
              point 2"), and only searches for questions that need new content
            </li>
            <li>
              Multi-round tool use: can search, evaluate results,
              and search again with a refined query if needed
            </li>
            <li>
              Query rewriting: the system prompt has Claude convert conversational
              references ("that", "point 2") into standalone search queries before
              hitting the vector store
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Chunk Testing</h2>
          <p className="chunk-test-question">
            <strong>Question asked:</strong> "{CHUNK_TEST_QUESTION}"
          </p>
          <p className="chunk-test-note">
            The 15%, 25%, and 33% runs retrieve only the most relevant chunks for the
            question via vector search. The 100% run is a separate baseline: the full
            paper reassembled in its original reading order with no retrieval at all. This is
            included for comparison. 
          </p>

          <div className="chunk-test-results">
            {CHUNK_TEST_RESULTS.map((result) => (
              <div key={result.threshold} className="chunk-test-card">
                <div className="chunk-test-card-header">
                  <span className="chunk-test-threshold">
                    {result.threshold === '100%' ? 'Full document (baseline)' : `${result.threshold} threshold`}
                  </span>
                  <span className="chunk-test-stats">
                    {result.numChunks} chunks · {result.actualTokens} tokens ·{' '}
                    {result.percentOfPaper}
                  </span>
                </div>
                <div className="chunk-test-answer">
                  <ReactMarkdown>{result.answer}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </section>

<section className="about-section">
  <h2>Future Additions</h2>
  <p>
    The current version handles one paper at a time. The natural next step is
    extending the same retrieval approach to <em>clusters</em> of related
    papers, understanding how papers
    relate to each other in addition to what each papers own context.
  </p>

  <h3 className="about-subsection-title">Flow 2: Literature Review Assistant</h3>
  <p>
    A RAG system over a small cluster of related papers, built for a
    researcher conducting a systematic literature review. The system would understand each
    paper's core concepts and how they relate across the cluster 
    surfacing connections, contradictions, and open questions that build on
    existing work.
  </p>
  <ul>
    <li>
      Reference chains visualized as a graph, with edge color/weight
      indicating relevance between papers in the cluster
    </li>
    <li>
      A researcher could add their own in-progress work to the cluster to
      help identify literature gaps or strengthen a motivation section
    </li>
  </ul>

  <h3 className="about-subsection-title">Flow 3: Topic-Scale Exploration</h3>
  <p>
    The same idea extended to hundreds of papers on a broad topic. For
    example, large language models. At that scale, natural subtopic
    clusters emerge on their own (attention mechanisms, tokenization
    strategies, parsing algorithms), visualized the same way as Flow 2's
    reference chains, but at the scale of a whole field rather than a
    handful of papers.
  </p>
  <ul>
    <li>
      Useful for narrowing into a specific subtopic within a broad field,
      by seeing how subtopics relate to and differ from one another
    </li>
    <li>
      Same graph-based visualization approach as Flow 2, scaled up from a
      handful of papers to hundreds
    </li>
  </ul>
</section>
      </div>
    </div>
  )
}
