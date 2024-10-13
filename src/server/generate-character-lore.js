'use server';

export default async function GenerateCharacterLore({
  name,
  description,
  genre,
}) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  const systemPrompt = `You are a creative writing assistant specializing in character lore generation for ${genre} settings. Create a compelling backstory and additional details for the character based on the provided information.`;

  const userPrompt = `Generate a short character lore under 120 words for a character named ${name} in a ${genre} setting. Here's a brief description of the character: ${description}

  Please provide the following details:
  1. Backstory: A paragraph about the character's past and how they came to be who they are.
  2. Personality: A few sentences describing the character's personality traits.
  3. Abilities: List 2-3 unique abilities or skills the character possesses.
  4. Relationships: Briefly mention 1-2 important relationships in the character's life.
  5. Goals: State the character's main goal or motivation.

  Format the response as markdown.`;

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedLore = data.choices[0].message.content;

    return {
      success: true,
      content: generatedLore,
    };
  } catch (error) {
    console.error('Error generating character lore:', error);
    return {
      success: false,
      error: 'Failed to generate character lore. Please try again.',
    };
  }
}
