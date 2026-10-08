export type RoleResume = {
  id: string
  role: string
  label: string
  summary: string
  highlights: string[]
  file: string
  preview: string
}

export const roleResumes: RoleResume[] = [
  {
    id: 'genai-llm',
    role: 'GenAI / LLM Engineer',
    label: 'GENAI',
    summary: 'Retrieval-augmented generation, multi-agent applications, LLM integration, APIs, and cloud deployment.',
    highlights: ['RAG systems', 'LangGraph orchestration', 'LLM applications'],
    file: 'resumes/prathamesh-nikam-genai-llm-engineer.pdf',
    preview: 'resumes/previews/prathamesh-nikam-genai-llm-engineer.png',
  },
  {
    id: 'ml-deep-learning',
    role: 'ML & Deep Learning Engineer',
    label: 'ML / DL',
    summary: 'Distributed deep learning, predictive modeling, NLP, and benchmark-driven model evaluation.',
    highlights: ['PyTorch + Ray', 'Predictive modeling', 'Model evaluation'],
    file: 'resumes/prathamesh-nikam-ml-deep-learning-engineer.pdf',
    preview: 'resumes/previews/prathamesh-nikam-ml-deep-learning-engineer.png',
  },
  {
    id: 'ai-engineer',
    role: 'AI Engineer',
    label: 'AI',
    summary: 'Applied AI across NLP, predictive analytics, retrieval, explainability, and production services.',
    highlights: ['Applied AI systems', 'FastAPI services', 'AWS + GCP'],
    file: 'resumes/prathamesh-nikam-ai-engineer.pdf',
    preview: 'resumes/previews/prathamesh-nikam-ai-engineer.png',
  },
  {
    id: 'full-stack',
    role: 'Full-Stack Developer',
    label: 'FULL STACK',
    summary: 'React and Next.js applications, authenticated APIs, database workflows, extensions, and deployment.',
    highlights: ['React + Next.js', 'APIs + authentication', 'Cloud deployment'],
    file: 'resumes/prathamesh-nikam-full-stack-developer.pdf',
    preview: 'resumes/previews/prathamesh-nikam-full-stack-developer.png',
  },
  {
    id: 'ml-ai-research',
    role: 'ML / AI Research',
    label: 'RESEARCH',
    summary: 'Distributed learning, ensemble methods, communication-efficient training, and comparative experimentation.',
    highlights: ['Dissertation research', 'Ablation studies', 'Published Python package'],
    file: 'resumes/prathamesh-nikam-ml-ai-research.pdf',
    preview: 'resumes/previews/prathamesh-nikam-ml-ai-research.png',
  },
]

export const defaultResumeId = 'ai-engineer'
