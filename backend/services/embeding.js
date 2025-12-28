import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey:
    'pcsk_3FpDER_DmFD7byqVnEGHyUYvsu4RcvQzjqxQczrL7RGeeorsgdTtG1Mwv2D9mBq2WjYSYD', // PLEASE use environment variable!
});

// Split long text into smaller chunks
function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
  }

  return chunks;
}

// Group chunks into batches for API calls
function batchify(array, batchSize = 96) {
  const batches = [];
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }
  return batches;
}

export const embedChunks = async (text) => {
  console.log(typeof text);
  console.log(`Original text length: ${text.length} characters`);

  // Step 1: Split text into chunks
  const textChunks = chunkText(text, 1000, 200);
  console.log(`Created ${textChunks.length} text chunks`);

  // Step 2: Create batches of chunks
  const batches = batchify(textChunks, 96);
  console.log(`Processing ${batches.length} batches`);

  const allEmbeddings = [];

  // Step 3: Process each batch
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(
      `Processing batch ${i + 1}/${batches.length} with ${batch.length} chunks`
    );

    try {
      // CRITICAL FIX: Use camelCase for parameters in Node.js SDK
      const embedResponse = await pc.inference.embed(
        'multilingual-e5-large', // model
        batch, // inputs
        {
          inputType: 'passage', // camelCase, not input_type
          truncate: 'END', // camelCase, not truncate
        }
      );

      // Collect embeddings from each batch
      allEmbeddings.push(...embedResponse.data);

      console.log(
        `Batch ${i + 1} complete. Generated ${
          embedResponse.data.length
        } embeddings`
      );
    } catch (error) {
      console.error(`Error processing batch ${i + 1}:`, error);
      throw error;
    }
  }

  console.log(`Total embeddings generated: ${allEmbeddings.length}`);
  return allEmbeddings;
};
