// Local adapter for the original frontend. No model, network, or API credentials.
export function demoResponse(query, context, settings) {
  return {
    consensus: `Offline demonstration for: ${query}\nThis is a preset interface walkthrough, not an AI-generated answer. The production project sends this request to FastAPI and Gemini.\nSelected presentation: ${settings.tone}, ${settings.length}. Context supplied: ${context.trim() ? 'yes' : 'no'}.`,
    verified_facts: [],
    unverified_claims: ['No claims have been checked against external sources in this demo.'],
    agreements: ['Sample agents agree that the question needs evidence before drawing a conclusion.'],
    disagreements: ['Sample tradeoff: explore alternatives first, or validate the initial assumptions first.'],
    reasoning: 'Illustrative reasoning: compare evidence, consider a creative alternative, and make uncertainty clear. No live inference or fact checking has taken place.',
    confidence_score: 0,
    controversy_score: 0,
    expert_responses: {
      'Creative Expert': 'Sample response: propose a small experiment and compare alternative approaches.',
      'Logical Expert': 'Sample response: define assumptions, choose a baseline, and measure the outcome.',
      'Ethical Expert': 'Sample response: identify affected people, consent requirements, and failure consequences.',
    },
  }
}
