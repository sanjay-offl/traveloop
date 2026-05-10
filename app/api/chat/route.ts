import { NextResponse } from 'next/server';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const RETRY_DELAYS_MS = [400, 1000];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'Gemini API key is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format.' }, { status: 400 });
    }

    const systemPrompt = `You are Loopy, a friendly AI travel assistant for Traveloop. Help users plan trips, manage budgets, suggest destinations, build packing checklists, and give travel tips. Keep answers concise and friendly. Use emojis occasionally.`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: 'Got it! I am Loopy, ready to help travelers.' }]
      }
    ];

    for (const msg of messages) {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }

    let response: Response | null = null;
    let data: any = null;
    let lastError: unknown = null;

    for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
      try {
        response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ contents }),
          signal: AbortSignal.timeout(20000)
        });

        data = await safeJson(response);
        break;
      } catch (error) {
        lastError = error;

        if (attempt < RETRY_DELAYS_MS.length) {
          await wait(RETRY_DELAYS_MS[attempt]);
          continue;
        }
      }
    }

    if (!response) {
      console.error('Gemini API network error:', lastError);
      return NextResponse.json(
        { error: 'Unable to reach Gemini API right now. Please try again in a moment.' },
        { status: 503 }
      );
    }

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return NextResponse.json(
        { error: data?.error?.message || 'Failed to communicate with Gemini API.' },
        { status: response.status }
      );
    }

    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      return NextResponse.json({ error: 'Received empty response from Gemini API.' }, { status: 500 });
    }

    return NextResponse.json({ message: textResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
