import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_CONTEXT = `You are Loopy, a friendly and knowledgeable AI travel assistant for Traveloop — a smart travel planning platform. 

You help users with:
- Planning multi-city itineraries and trip routes
- Budget tracking and travel cost estimates
- Destination recommendations and local tips
- Packing checklist suggestions
- Visa, weather, and travel advisory information
- Hotel, flight, and transport suggestions
- Cultural tips and must-see attractions

Keep responses concise, warm, and travel-focused. Use emojis occasionally to keep things lively. If asked about non-travel topics, gently redirect the conversation back to travel planning.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Build Gemini conversation history
    const geminiContents = [
      // Inject system context as the first user+model turn
      {
        role: "user",
        parts: [{ text: SYSTEM_CONTEXT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Got it! I'm Loopy, your Traveloop travel assistant. I'm ready to help you plan amazing trips! ✈️",
          },
        ],
      },
      // Append actual conversation
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from Gemini" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please try again!";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
