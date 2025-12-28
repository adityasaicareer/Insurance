
// import {HfInference} from "@huggingface/inference";

// export const llmans=async (context)=>{
//   const prompt = `
//     You are an insurance assistant.

//     Answer the question using ONLY the context below.
//     If the answer is not present, say "Not mentioned in the policy".

//     Context:
//     ${context}

//     Question:
//     What damages are covered under the motor insurance policy?

//     Answer in clear bullet points.
// `;

//   const hf = new HfInference("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");

//   const response = await hf.textGeneration({
//     model: 'mistralai/Mistral-7B-Instruct-v0.2',
//     inputs: prompt,
//     parameters: {
//       max_new_tokens: 150,
//       temperature: 0.2,
//     },
//   });
//   console.log(response.generated_text);
//   console.log("ans")
//   return response.generated_text;
// }

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: 'AIzaSyDNJ4E6aRpI99tkWgBgpBWALwzsXuWOd8Y' });

// export const llmans=async (context)=>{


//   const response = await ai.models.generateContent({
//     model: 'gemini-3-pro-preview',
//     contents: 'Explain how AI works in a few words',
//   });
//   console.log(response.text);


// }
import axios from "axios";


export const llmans = async (context) => {
  const prompt = `
    You are an insurance assistant.

    Answer the question using ONLY the context below.
    If the answer is not present, say "Not mentioned in the policy".

    Context:
    ${context}

    Question:
    What damages are covered under the motor insurance policy?

    Answer in clear bullet points.
`;

  const body = {
    model: 'microsoft/Fara-7B',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4096,
    stream: false,
    top_p: 1,
  };

  try {
    const response = await fetch(
      'https://platform.qubrid.com/api/v1/qubridai/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer k_61397018eb9c.mnkiDy0N3OlXqs-kHWqBm513hrRDhb57ANPH59SxE8UjieVADhI91Q',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON from response
    const data = await response.json();
    
    console.log('Full response data:', data);
    
    // Extract the assistant's message
    if (data?.choices?.[0]?.message?.content) {
      const answer = data.choices[0].message.content;
      return answer;
    }

    return data;
  } catch (error) {
    console.error('Error calling LLM API:', error);
    throw error;
  }
};