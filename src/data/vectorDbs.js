export const vectorDbs = [
  { id: "pinecone", name: "Pinecone (Standard)", basePerMonth: 0, pricePerMillionVectors: 8.0 },
  { id: "weaviate-cloud", name: "Weaviate Cloud", basePerMonth: 25, pricePerMillionVectors: 6.5 },
  { id: "qdrant-cloud", name: "Qdrant Cloud", basePerMonth: 0, pricePerMillionVectors: 5.0 },
  { id: "milvus-zilliz", name: "Zilliz Cloud (Milvus)", basePerMonth: 0, pricePerMillionVectors: 6.0 },
  { id: "supabase-pgvector", name: "Supabase (pgvector, self-managed)", basePerMonth: 25, pricePerMillionVectors: 0 },
  { id: "self-hosted", name: "Self-hosted (Qdrant/Weaviate OSS on your own server)", basePerMonth: 40, pricePerMillionVectors: 0 },
];
